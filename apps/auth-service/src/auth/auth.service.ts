import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { createHash } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { AuthJwtService } from '../jwt/jwt.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { RoutingKey } from '@app/contracts';

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: AuthJwtService,
  ) {}

  async register(dto: RegisterDto, correlationId: string) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (existing) {
      throw new ConflictException({ code: 'EMAIL_ALREADY_EXISTS', message: 'Email already in use' });
    }

    const passwordHash = await argon2.hash(dto.password, { type: argon2.argon2id });
    const customerRole = await this.prisma.role.findUniqueOrThrow({ where: { name: 'customer' } });

    const user = await this.prisma.$transaction(async (tx) => {
      const u = await tx.user.create({
        data: {
          email: dto.email.toLowerCase(),
          displayName: dto.displayName,
          credential: { create: { passwordHash } },
          roles: { create: { roleId: customerRole.id } },
        },
        include: { roles: { include: { role: true } } },
      });
      await tx.outbox.create({
        data: {
          routingKey: RoutingKey.UserRegistered,
          payload: {
            eventId: uuidv4(),
            version: 1,
            occurredAt: new Date().toISOString(),
            userId: u.id,
            email: u.email,
            displayName: u.displayName,
          },
        },
      });
      return u;
    });

    return {
      userId: user.id,
      email: user.email,
      displayName: user.displayName,
      roles: user.roles.map((r) => r.role.name),
    };
  }

  async login(dto: LoginDto, userAgent: string | undefined, ip: string | undefined) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
      include: { credential: true, roles: { include: { role: true } } },
    });

    if (!user || !user.credential) {
      throw new UnauthorizedException({ code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' });
    }

    if (user.status === 'locked') {
      throw new HttpException({ code: 'ACCOUNT_LOCKED', message: 'Account is locked' }, 423);
    }

    const cred = user.credential;
    if (cred.lockedUntil && cred.lockedUntil > new Date()) {
      throw new HttpException({ code: 'ACCOUNT_LOCKED', message: 'Account temporarily locked' }, 423);
    }

    const valid = await argon2.verify(cred.passwordHash, dto.password);
    if (!valid) {
      const attempts = cred.failedAttempts + 1;
      const lockedUntil = attempts >= MAX_FAILED_ATTEMPTS ? new Date(Date.now() + LOCK_DURATION_MS) : null;
      await this.prisma.credential.update({
        where: { userId: user.id },
        data: { failedAttempts: attempts, lockedUntil },
      });
      throw new UnauthorizedException({ code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' });
    }

    await this.prisma.credential.update({
      where: { userId: user.id },
      data: { failedAttempts: 0, lockedUntil: null },
    });

    const roles = user.roles.map((r) => r.role.name);
    const familyId = uuidv4();
    const tokens = await this.issueTokenPair(user.id, user.email, roles, familyId);

    await this.prisma.$transaction(async (tx) => {
      await tx.outbox.create({
        data: {
          routingKey: RoutingKey.UserLoggedIn,
          payload: {
            eventId: uuidv4(),
            version: 1,
            occurredAt: new Date().toISOString(),
            userId: user.id,
            at: new Date().toISOString(),
            userAgent,
            ip,
          },
        },
      });
    });

    return tokens;
  }

  async refresh(dto: RefreshDto) {
    let payload: { sub: string; familyId: string };
    try {
      payload = this.jwtService.verify<{ sub: string; familyId: string }>(dto.refreshToken);
    } catch {
      throw new UnauthorizedException({ code: 'INVALID_REFRESH_TOKEN', message: 'Invalid or expired refresh token' });
    }

    const tokenHash = this.hashToken(dto.refreshToken);
    const stored = await this.prisma.refreshToken.findFirst({
      where: { tokenHash, familyId: payload.familyId },
      include: { user: { include: { roles: { include: { role: true } } } } },
    });

    if (!stored) {
      throw new UnauthorizedException({ code: 'INVALID_REFRESH_TOKEN', message: 'Refresh token not found' });
    }

    if (stored.revoked) {
      await this.prisma.refreshToken.updateMany({
        where: { familyId: payload.familyId },
        data: { revoked: true },
      });
      throw new UnauthorizedException({ code: 'INVALID_REFRESH_TOKEN', message: 'Refresh token reuse detected' });
    }

    await this.prisma.refreshToken.update({ where: { id: stored.id }, data: { revoked: true } });

    const roles = stored.user.roles.map((r) => r.role.name);
    return this.issueTokenPair(stored.user.id, stored.user.email, roles, payload.familyId);
  }

  async logout(refreshToken: string) {
    const tokenHash = this.hashToken(refreshToken);
    await this.prisma.refreshToken.updateMany({ where: { tokenHash }, data: { revoked: true } });
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      include: { roles: { include: { role: true } } },
    });
    return {
      userId: user.id,
      email: user.email,
      displayName: user.displayName,
      roles: user.roles.map((r) => r.role.name),
    };
  }

  async updateRoles(targetUserId: string, roles: string[]) {
    const user = await this.prisma.user.findUnique({ where: { id: targetUserId } });
    if (!user) throw new NotFoundException({ code: 'USER_NOT_FOUND', message: 'User not found' });

    const roleRecords = await this.prisma.role.findMany({ where: { name: { in: roles } } });

    await this.prisma.$transaction(async (tx) => {
      await tx.userRole.deleteMany({ where: { userId: targetUserId } });
      await tx.userRole.createMany({
        data: roleRecords.map((r) => ({ userId: targetUserId, roleId: r.id })),
      });
    });

    return { userId: targetUserId, roles };
  }

  private async issueTokenPair(userId: string, email: string, roles: string[], familyId: string) {
    const accessToken = this.jwtService.signAccess({ sub: userId, email, roles });
    const refreshToken = this.jwtService.signRefresh({ sub: userId, familyId });
    const tokenHash = this.hashToken(refreshToken);

    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        familyId,
        expiresAt: new Date(Date.now() + this.jwtService.getRefreshTtlMs()),
      },
    });

    return { accessToken, refreshToken, expiresIn: this.jwtService.getAccessTtl() };
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
