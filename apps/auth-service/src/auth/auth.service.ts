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
import { AuthRepository } from './auth.repository';
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
    private readonly repo: AuthRepository,
    private readonly jwtService: AuthJwtService,
  ) {}

  async register(dto: RegisterDto, correlationId: string) {
    const existing = await this.repo.findUserByEmail(dto.email.toLowerCase());
    if (existing) {
      throw new ConflictException({ code: 'EMAIL_ALREADY_EXISTS', message: 'Email already in use' });
    }

    const passwordHash = await argon2.hash(dto.password, { type: argon2.argon2id });
    const customerRole = await this.repo.findRoleByName('customer');

    const user = await this.repo.createUserWithCredentialAndRole(
      dto.email.toLowerCase(),
      dto.displayName,
      passwordHash,
      customerRole.id,
      {
        routingKey: RoutingKey.UserRegistered,
        payload: {
          eventId: uuidv4(),
          version: 1,
          occurredAt: new Date().toISOString(),
          email: dto.email.toLowerCase(),
          displayName: dto.displayName,
        },
      },
    );

    return {
      userId: user.id,
      email: user.email,
      displayName: user.displayName,
      roles: user.roles.map((r) => r.role.name),
    };
  }

  async login(dto: LoginDto, userAgent: string | undefined, ip: string | undefined) {
    const user = await this.repo.findUserByEmail(dto.email.toLowerCase());

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
      await this.repo.incrementFailedAttempts(user.id, attempts, lockedUntil);
      throw new UnauthorizedException({ code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' });
    }

    await this.repo.resetFailedAttempts(user.id);

    const roles = user.roles.map((r) => r.role.name);
    const familyId = uuidv4();
    const tokens = await this.issueTokenPair(user.id, user.email, roles, familyId);

    await this.repo.writeOutbox(RoutingKey.UserLoggedIn, {
      eventId: uuidv4(),
      version: 1,
      occurredAt: new Date().toISOString(),
      userId: user.id,
      at: new Date().toISOString(),
      userAgent,
      ip,
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
    const stored = await this.repo.findRefreshToken(tokenHash, payload.familyId);

    if (!stored) {
      throw new UnauthorizedException({ code: 'INVALID_REFRESH_TOKEN', message: 'Refresh token not found' });
    }

    if (stored.revoked) {
      await this.repo.revokeRefreshTokenFamily(payload.familyId);
      throw new UnauthorizedException({ code: 'INVALID_REFRESH_TOKEN', message: 'Refresh token reuse detected' });
    }

    await this.repo.revokeRefreshToken(stored.id);

    const roles = stored.user.roles.map((r) => r.role.name);
    return this.issueTokenPair(stored.user.id, stored.user.email, roles, payload.familyId);
  }

  async logout(refreshToken: string) {
    const tokenHash = this.hashToken(refreshToken);
    await this.repo.revokeRefreshTokenByHash(tokenHash);
  }

  async getMe(userId: string) {
    const user = await this.repo.findUserById(userId);
    return {
      userId: user.id,
      email: user.email,
      displayName: user.displayName,
      roles: user.roles.map((r) => r.role.name),
    };
  }

  async updateRoles(targetUserId: string, roles: string[]) {
    const exists = await this.repo.findUserById(targetUserId).catch(() => null);
    if (!exists) throw new NotFoundException({ code: 'USER_NOT_FOUND', message: 'User not found' });

    const roleRecords = await this.repo.findRolesByNames(roles);
    await this.repo.replaceUserRoles(targetUserId, roleRecords.map((r) => r.id));

    return { userId: targetUserId, roles };
  }

  private async issueTokenPair(userId: string, email: string, roles: string[], familyId: string) {
    const accessToken = this.jwtService.signAccess({ sub: userId, email, roles });
    const refreshToken = this.jwtService.signRefresh({ sub: userId, familyId });
    const tokenHash = this.hashToken(refreshToken);

    await this.repo.createRefreshToken(
      userId,
      tokenHash,
      familyId,
      new Date(Date.now() + this.jwtService.getRefreshTtlMs()),
    );

    return { accessToken, refreshToken, expiresIn: this.jwtService.getAccessTtl() };
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
