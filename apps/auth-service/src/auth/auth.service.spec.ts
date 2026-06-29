import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import * as argon2 from 'argon2';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { AuthJwtService } from '../jwt/jwt.service';

jest.mock('argon2');

const mockArgon2 = argon2 as jest.Mocked<typeof argon2>;

const mockUser = (overrides = {}) => ({
  id: 'u1',
  email: 'a@b.com',
  displayName: 'Alice',
  status: 'active',
  credential: { passwordHash: 'hash', failedAttempts: 0, lockedUntil: null },
  roles: [{ role: { name: 'customer' } }],
  ...overrides,
});

describe('AuthService', () => {
  let service: AuthService;
  let repo: DeepMocked<AuthRepository>;
  let jwtService: DeepMocked<AuthJwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthRepository, useValue: createMock<AuthRepository>() },
        { provide: AuthJwtService, useValue: createMock<AuthJwtService>() },
      ],
    }).compile();

    service = module.get(AuthService);
    repo = module.get(AuthRepository);
    jwtService = module.get(AuthJwtService);
  });

  describe('register', () => {
    it('throws ConflictException if email already exists', async () => {
      repo.findUserByEmail.mockResolvedValue(mockUser() as never);
      await expect(
        service.register({ email: 'a@b.com', password: 'Abc1!abcd', displayName: 'Alice' }, 'cid'),
      ).rejects.toBeInstanceOf(ConflictException);
    });

    it('creates user and returns profile', async () => {
      repo.findUserByEmail.mockResolvedValue(null);
      repo.findRoleByName.mockResolvedValue({ id: 'role-id', name: 'customer' } as never);
      mockArgon2.hash.mockResolvedValue('hash' as never);
      repo.createUserWithCredentialAndRole.mockResolvedValue(mockUser() as never);

      const result = await service.register(
        { email: 'A@B.com', password: 'Abc1!abcd', displayName: 'Alice' },
        'cid',
      );
      expect(result.email).toBe('a@b.com');
      expect(result.roles).toContain('customer');
    });

    it('lowercases email before checking uniqueness', async () => {
      repo.findUserByEmail.mockResolvedValue(null);
      repo.findRoleByName.mockResolvedValue({ id: 'role-id', name: 'customer' } as never);
      mockArgon2.hash.mockResolvedValue('hash' as never);
      repo.createUserWithCredentialAndRole.mockResolvedValue(mockUser() as never);

      await service.register({ email: 'UPPER@CASE.COM', password: 'Abc1!abcd', displayName: 'U' }, '');
      expect(repo.findUserByEmail).toHaveBeenCalledWith('upper@case.com');
    });
  });

  describe('login', () => {
    it('throws UnauthorizedException if user not found', async () => {
      repo.findUserByEmail.mockResolvedValue(null);
      await expect(
        service.login({ email: 'x@y.com', password: 'pw' }, undefined, undefined),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('throws UnauthorizedException if credential missing', async () => {
      repo.findUserByEmail.mockResolvedValue({ ...mockUser(), credential: null } as never);
      await expect(
        service.login({ email: 'x@y.com', password: 'pw' }, undefined, undefined),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('throws 423 if account locked by status', async () => {
      repo.findUserByEmail.mockResolvedValue(mockUser({ status: 'locked' }) as never);
      await expect(
        service.login({ email: 'x@y.com', password: 'pw' }, undefined, undefined),
      ).rejects.toMatchObject({ status: 423 });
    });

    it('throws 423 if lockedUntil is in the future', async () => {
      const future = new Date(Date.now() + 60_000);
      repo.findUserByEmail.mockResolvedValue(
        mockUser({ credential: { passwordHash: 'hash', failedAttempts: 5, lockedUntil: future } }) as never,
      );
      await expect(
        service.login({ email: 'x@y.com', password: 'pw' }, undefined, undefined),
      ).rejects.toMatchObject({ status: 423 });
    });

    it('increments failed attempts on wrong password', async () => {
      repo.findUserByEmail.mockResolvedValue(mockUser() as never);
      mockArgon2.verify.mockResolvedValue(false as never);
      repo.incrementFailedAttempts.mockResolvedValue({} as never);

      await expect(
        service.login({ email: 'x@y.com', password: 'wrong' }, undefined, undefined),
      ).rejects.toBeInstanceOf(UnauthorizedException);
      expect(repo.incrementFailedAttempts).toHaveBeenCalledWith('u1', 1, null);
    });

    it('locks account after 5 failed attempts', async () => {
      repo.findUserByEmail.mockResolvedValue(
        mockUser({ credential: { passwordHash: 'hash', failedAttempts: 4, lockedUntil: null } }) as never,
      );
      mockArgon2.verify.mockResolvedValue(false as never);
      repo.incrementFailedAttempts.mockResolvedValue({} as never);

      await expect(
        service.login({ email: 'x@y.com', password: 'wrong' }, undefined, undefined),
      ).rejects.toBeInstanceOf(UnauthorizedException);
      expect(repo.incrementFailedAttempts).toHaveBeenCalledWith(
        'u1', 5, expect.any(Date),
      );
    });

    it('returns token pair on valid credentials', async () => {
      repo.findUserByEmail.mockResolvedValue(mockUser() as never);
      mockArgon2.verify.mockResolvedValue(true as never);
      repo.resetFailedAttempts.mockResolvedValue({} as never);
      repo.createRefreshToken.mockResolvedValue({} as never);
      repo.writeOutbox.mockResolvedValue({} as never);
      jwtService.signAccess.mockReturnValue('access');
      jwtService.signRefresh.mockReturnValue('refresh');
      jwtService.getAccessTtl.mockReturnValue(900);
      jwtService.getRefreshTtlMs.mockReturnValue(604800000);

      const result = await service.login({ email: 'x@y.com', password: 'correct' }, 'ua', '1.2.3.4');
      expect(result.accessToken).toBe('access');
      expect(result.refreshToken).toBe('refresh');
      expect(result.expiresIn).toBe(900);
    });
  });

  describe('refresh', () => {
    it('throws if token signature invalid', async () => {
      jwtService.verify.mockImplementation(() => { throw new Error('invalid'); });
      await expect(service.refresh({ refreshToken: 'bad' })).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('throws if refresh token not found in DB', async () => {
      jwtService.verify.mockReturnValue({ sub: 'u1', familyId: 'fam1' } as never);
      repo.findRefreshToken.mockResolvedValue(null);
      await expect(service.refresh({ refreshToken: 'unknown' })).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('revokes family and throws on token reuse', async () => {
      jwtService.verify.mockReturnValue({ sub: 'u1', familyId: 'fam1' } as never);
      repo.findRefreshToken.mockResolvedValue({
        id: 't1', revoked: true, familyId: 'fam1',
        user: { id: 'u1', email: 'x@y.com', roles: [] },
      } as never);
      repo.revokeRefreshTokenFamily.mockResolvedValue({} as never);

      await expect(service.refresh({ refreshToken: 'reused' })).rejects.toBeInstanceOf(UnauthorizedException);
      expect(repo.revokeRefreshTokenFamily).toHaveBeenCalledWith('fam1');
    });

    it('rotates token on valid refresh', async () => {
      jwtService.verify.mockReturnValue({ sub: 'u1', familyId: 'fam1' } as never);
      repo.findRefreshToken.mockResolvedValue({
        id: 't1', revoked: false, familyId: 'fam1',
        user: { id: 'u1', email: 'x@y.com', roles: [{ role: { name: 'customer' } }] },
      } as never);
      repo.revokeRefreshToken.mockResolvedValue({} as never);
      repo.createRefreshToken.mockResolvedValue({} as never);
      jwtService.signAccess.mockReturnValue('new-access');
      jwtService.signRefresh.mockReturnValue('new-refresh');
      jwtService.getAccessTtl.mockReturnValue(900);
      jwtService.getRefreshTtlMs.mockReturnValue(604800000);

      const result = await service.refresh({ refreshToken: 'valid' });
      expect(result.accessToken).toBe('new-access');
      expect(repo.revokeRefreshToken).toHaveBeenCalledWith('t1');
    });
  });

  describe('logout', () => {
    it('revokes the refresh token by hash', async () => {
      repo.revokeRefreshTokenByHash.mockResolvedValue({} as never);
      await service.logout('some-token');
      expect(repo.revokeRefreshTokenByHash).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMe', () => {
    it('returns user profile from DB', async () => {
      repo.findUserById.mockResolvedValue(mockUser() as never);
      const result = await service.getMe('u1');
      expect(result.userId).toBe('u1');
      expect(result.roles).toContain('customer');
    });
  });

  describe('updateRoles', () => {
    it('throws NotFoundException if user not found', async () => {
      repo.findUserById.mockRejectedValue(new Error('not found'));
      await expect(service.updateRoles('bad-id', ['admin'])).rejects.toBeInstanceOf(NotFoundException);
    });

    it('replaces roles for existing user', async () => {
      repo.findUserById.mockResolvedValue(mockUser() as never);
      repo.findRolesByNames.mockResolvedValue([{ id: 'r1', name: 'admin' }] as never);
      repo.replaceUserRoles.mockResolvedValue(undefined);

      const result = await service.updateRoles('u1', ['admin']);
      expect(result.roles).toEqual(['admin']);
      expect(repo.replaceUserRoles).toHaveBeenCalledWith('u1', ['r1']);
    });
  });
});
