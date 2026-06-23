import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import * as argon2 from 'argon2';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthJwtService } from '../jwt/jwt.service';

jest.mock('argon2');

const mockArgon2 = argon2 as jest.Mocked<typeof argon2>;

describe('AuthService', () => {
  let service: AuthService;
  let prisma: DeepMocked<PrismaService>;
  let jwtService: DeepMocked<AuthJwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: createMock<PrismaService>() },
        { provide: AuthJwtService, useValue: createMock<AuthJwtService>() },
      ],
    }).compile();

    service = module.get(AuthService);
    prisma = module.get(PrismaService);
    jwtService = module.get(AuthJwtService);
  });

  describe('register', () => {
    it('throws ConflictException if email already exists', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 'u1' } as never);
      await expect(
        service.register({ email: 'a@b.com', password: 'Abc1!abcd', displayName: 'A' }, 'cid'),
      ).rejects.toBeInstanceOf(ConflictException);
    });

    it('creates user and returns profile', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.role.findUniqueOrThrow.mockResolvedValue({ id: 'role-id', name: 'customer' } as never);
      mockArgon2.hash.mockResolvedValue('hash' as never);

      const mockUser = {
        id: 'u1',
        email: 'a@b.com',
        displayName: 'A',
        roles: [{ role: { name: 'customer' } }],
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prisma.$transaction.mockImplementation((fn: any) => fn(prisma));
      prisma.user.create.mockResolvedValue(mockUser as never);
      prisma.outbox.create.mockResolvedValue({} as never);

      const result = await service.register(
        { email: 'a@b.com', password: 'Abc1!abcd', displayName: 'A' },
        'cid',
      );
      expect(result.email).toBe('a@b.com');
      expect(result.roles).toContain('customer');
    });
  });

  describe('login', () => {
    it('throws UnauthorizedException if user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      await expect(
        service.login({ email: 'x@y.com', password: 'pw' }, undefined, undefined),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('throws UnauthorizedException if password invalid', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'x@y.com',
        status: 'active',
        credential: { passwordHash: 'hash', failedAttempts: 0, lockedUntil: null },
        roles: [],
      } as never);
      mockArgon2.verify.mockResolvedValue(false as never);
      prisma.credential.update.mockResolvedValue({} as never);

      await expect(
        service.login({ email: 'x@y.com', password: 'wrong' }, undefined, undefined),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('returns token pair on valid credentials', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'x@y.com',
        status: 'active',
        credential: { passwordHash: 'hash', failedAttempts: 0, lockedUntil: null },
        roles: [{ role: { name: 'customer' } }],
      } as never);
      mockArgon2.verify.mockResolvedValue(true as never);
      prisma.credential.update.mockResolvedValue({} as never);
      prisma.refreshToken.create.mockResolvedValue({} as never);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prisma.$transaction.mockImplementation((fn: any) => fn(prisma));
      prisma.outbox.create.mockResolvedValue({} as never);
      jwtService.signAccess.mockReturnValue('access');
      jwtService.signRefresh.mockReturnValue('refresh');
      jwtService.getAccessTtl.mockReturnValue(900);
      jwtService.getRefreshTtlMs.mockReturnValue(604800000);

      const result = await service.login({ email: 'x@y.com', password: 'correct' }, undefined, undefined);
      expect(result.accessToken).toBe('access');
      expect(result.refreshToken).toBe('refresh');
    });
  });

  describe('refresh', () => {
    it('throws if token signature invalid', async () => {
      jwtService.verify.mockImplementation(() => { throw new Error('invalid'); });
      await expect(service.refresh({ refreshToken: 'bad' })).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('revokes family and throws on token reuse', async () => {
      jwtService.verify.mockReturnValue({ sub: 'u1', familyId: 'fam1' } as never);
      prisma.refreshToken.findFirst.mockResolvedValue({ id: 't1', revoked: true, familyId: 'fam1', user: { id: 'u1', email: 'x@y.com', roles: [] } } as never);
      prisma.refreshToken.updateMany.mockResolvedValue({ count: 1 });

      await expect(service.refresh({ refreshToken: 'reused' })).rejects.toBeInstanceOf(UnauthorizedException);
      expect(prisma.refreshToken.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { familyId: 'fam1' } }),
      );
    });
  });
});
