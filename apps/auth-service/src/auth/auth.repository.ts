import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { credential: true, roles: { include: { role: true } } },
    });
  }

  findUserById(id: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
      include: { roles: { include: { role: true } } },
    });
  }

  findRoleByName(name: string) {
    return this.prisma.role.findUniqueOrThrow({ where: { name } });
  }

  findRolesByNames(names: string[]) {
    return this.prisma.role.findMany({ where: { name: { in: names } } });
  }

  createUserWithCredentialAndRole(
    email: string,
    displayName: string,
    passwordHash: string,
    roleId: string,
    outboxPayload: { routingKey: string; payload: object },
  ) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          displayName,
          credential: { create: { passwordHash } },
          roles: { create: { roleId } },
        },
        include: { roles: { include: { role: true } } },
      });
      await tx.outbox.create({
        data: { routingKey: outboxPayload.routingKey, payload: outboxPayload.payload },
      });
      return user;
    });
  }

  incrementFailedAttempts(userId: string, attempts: number, lockedUntil: Date | null) {
    return this.prisma.credential.update({
      where: { userId },
      data: { failedAttempts: attempts, lockedUntil },
    });
  }

  resetFailedAttempts(userId: string) {
    return this.prisma.credential.update({
      where: { userId },
      data: { failedAttempts: 0, lockedUntil: null },
    });
  }

  createRefreshToken(userId: string, tokenHash: string, familyId: string, expiresAt: Date) {
    return this.prisma.refreshToken.create({
      data: { userId, tokenHash, familyId, expiresAt },
    });
  }

  findRefreshToken(tokenHash: string, familyId: string) {
    return this.prisma.refreshToken.findFirst({
      where: { tokenHash, familyId },
      include: { user: { include: { roles: { include: { role: true } } } } },
    });
  }

  revokeRefreshToken(id: string) {
    return this.prisma.refreshToken.update({ where: { id }, data: { revoked: true } });
  }

  revokeRefreshTokenFamily(familyId: string) {
    return this.prisma.refreshToken.updateMany({
      where: { familyId },
      data: { revoked: true },
    });
  }

  revokeRefreshTokenByHash(tokenHash: string) {
    return this.prisma.refreshToken.updateMany({ where: { tokenHash }, data: { revoked: true } });
  }

  writeOutbox(routingKey: string, payload: object) {
    return this.prisma.outbox.create({ data: { routingKey, payload } });
  }

  replaceUserRoles(userId: string, roleIds: string[]) {
    return this.prisma.$transaction(async (tx) => {
      await tx.userRole.deleteMany({ where: { userId } });
      await tx.userRole.createMany({ data: roleIds.map((roleId) => ({ userId, roleId })) });
    });
  }
}
