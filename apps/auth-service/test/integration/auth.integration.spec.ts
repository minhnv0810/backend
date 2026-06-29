import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { execSync } from 'child_process';
import { resolve } from 'path';
import supertest from 'supertest';
import { StartedTestContainer } from 'testcontainers';
import {
  startPostgresContainer,
  getPostgresDatabaseUrl,
  startRabbitMQContainer,
  getRabbitMQUrl,
  generateTestKeyPair,
  buildUserFixture,
} from '@app/testing';
import { AppModule } from '../../src/app/app.module';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { PrismaClient } from '../../src/generated/prisma';

describe('Auth — Integration', () => {
  let app: INestApplication;
  let pgContainer: StartedTestContainer;
  let rmqContainer: StartedTestContainer;

  const user = buildUserFixture({ password: 'Password123!' });

  // tokens shared across tests in the login/refresh/logout flow
  let accessToken: string;
  let refreshToken: string;

  // ─── setup ────────────────────────────────────────────────────────────────

  beforeAll(async () => {
    [pgContainer, rmqContainer] = await Promise.all([
      startPostgresContainer('auth_test'),
      startRabbitMQContainer(),
    ]);

    const dbUrl = getPostgresDatabaseUrl(pgContainer, 'auth_test');
    const rmqUrl = getRabbitMQUrl(rmqContainer);
    const keys = generateTestKeyPair();

    // env vars must be set before AppModule is created
    process.env['DATABASE_URL'] = dbUrl;
    process.env['RABBITMQ_URL'] = rmqUrl;
    process.env['JWT_PRIVATE_KEY'] = keys.privateKey;
    process.env['JWT_PUBLIC_KEY'] = keys.publicKey;
    process.env['NODE_ENV'] = 'test';
    process.env['LOG_LEVEL'] = 'error'; // silence pino during tests

    const schemaPath = resolve(__dirname, '../../prisma/schema.prisma');
    const prismaBin = resolve(__dirname, '../../../../node_modules/.bin/prisma');
    execSync(`${prismaBin} migrate deploy --schema=${schemaPath}`, {
      env: { ...process.env, DATABASE_URL: dbUrl },
      stdio: 'pipe',
    });

    const prisma = new PrismaClient({ datasources: { db: { url: dbUrl } } });
    await prisma.role.createMany({
      data: [{ name: 'customer' }, { name: 'admin' }],
      skipDuplicates: true,
    });
    await prisma.$disconnect();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();
  }, 90_000);

  afterAll(async () => {
    await app.close();
    await Promise.all([pgContainer.stop(), rmqContainer.stop()]);
  });

  // ─── register ─────────────────────────────────────────────────────────────

  describe('POST /auth/register', () => {
    it('201 — creates user and returns profile', async () => {
      const res = await supertest(app.getHttpServer())
        .post('/auth/register')
        .send({ email: user.email, password: user.password, displayName: user.displayName });

      expect(res.status).toBe(201);
      expect(res.body.data.email).toBe(user.email.toLowerCase());
      expect(res.body.data.roles).toContain('customer');
      expect(res.body.data.userId).toBeDefined();
    });

    it('409 — rejects duplicate email', async () => {
      const res = await supertest(app.getHttpServer())
        .post('/auth/register')
        .send({ email: user.email, password: user.password, displayName: user.displayName });

      expect(res.status).toBe(409);
      expect(res.body.code).toBe('EMAIL_ALREADY_EXISTS');
    });

    it('400 — rejects missing required fields', async () => {
      const res = await supertest(app.getHttpServer())
        .post('/auth/register')
        .send({ email: user.email });

      expect(res.status).toBe(400);
    });
  });

  // ─── login ────────────────────────────────────────────────────────────────

  describe('POST /auth/login', () => {
    it('401 — rejects wrong password', async () => {
      const res = await supertest(app.getHttpServer())
        .post('/auth/login')
        .send({ email: user.email, password: 'WrongPass999!' });

      expect(res.status).toBe(401);
      expect(res.body.code).toBe('INVALID_CREDENTIALS');
    });

    it('401 — rejects unknown email', async () => {
      const res = await supertest(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'nobody@example.com', password: 'Whatever1!' });

      expect(res.status).toBe(401);
    });

    it('200 — returns accessToken + refreshToken on valid credentials', async () => {
      const res = await supertest(app.getHttpServer())
        .post('/auth/login')
        .send({ email: user.email, password: user.password });

      expect(res.status).toBe(200);
      expect(res.body.data.accessToken).toBeDefined();
      expect(res.body.data.refreshToken).toBeDefined();
      expect(res.body.data.expiresIn).toBe(900);

      accessToken = res.body.data.accessToken;
      refreshToken = res.body.data.refreshToken;
    });
  });

  // ─── me ───────────────────────────────────────────────────────────────────

  describe('GET /auth/me', () => {
    it('200 — returns user info from access token', async () => {
      const res = await supertest(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.email).toBe(user.email.toLowerCase());
      expect(res.body.data.roles).toContain('customer');
    });

    it('401 — rejects missing token', async () => {
      const res = await supertest(app.getHttpServer()).get('/auth/me');
      expect(res.status).toBe(401);
    });

    it('401 — rejects malformed token', async () => {
      const res = await supertest(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', 'Bearer not-a-real-token');
      expect(res.status).toBe(401);
    });
  });

  // ─── refresh ──────────────────────────────────────────────────────────────

  describe('POST /auth/refresh', () => {
    it('200 — rotates token pair', async () => {
      const res = await supertest(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken });

      expect(res.status).toBe(200);
      expect(res.body.data.accessToken).toBeDefined();
      expect(res.body.data.refreshToken).toBeDefined();
      // new tokens must differ from old
      expect(res.body.data.accessToken).not.toBe(accessToken);
      expect(res.body.data.refreshToken).not.toBe(refreshToken);

      const oldRefreshToken = refreshToken;
      accessToken = res.body.data.accessToken;
      refreshToken = res.body.data.refreshToken;

      // ── reuse detection: old refresh token is now revoked ──────────────
      const reuseRes = await supertest(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken: oldRefreshToken });

      expect(reuseRes.status).toBe(401);
      expect(reuseRes.body.code).toBe('INVALID_REFRESH_TOKEN');
    });

    it('401 — new tokens are also revoked after reuse detection', async () => {
      // family was revoked when old token was reused above
      const res = await supertest(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken });

      expect(res.status).toBe(401);
    });
  });

  // ─── logout + account lock ────────────────────────────────────────────────

  describe('Logout + lock', () => {
    let freshAccess: string;
    let freshRefresh: string;

    beforeAll(async () => {
      const res = await supertest(app.getHttpServer())
        .post('/auth/login')
        .send({ email: user.email, password: user.password });
      freshAccess = res.body.data.accessToken;
      freshRefresh = res.body.data.refreshToken;
    });

    it('204 — logout revokes refresh token', async () => {
      const res = await supertest(app.getHttpServer())
        .post('/auth/logout')
        .set('Authorization', `Bearer ${freshAccess}`)
        .send({ refreshToken: freshRefresh });

      expect(res.status).toBe(204);
    });

    it('401 — revoked refresh token cannot be used', async () => {
      const res = await supertest(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken: freshRefresh });

      expect(res.status).toBe(401);
    });
  });

  describe('Account lock', () => {
    const lockUser = buildUserFixture({ password: 'LockMe123!' });

    beforeAll(async () => {
      await supertest(app.getHttpServer())
        .post('/auth/register')
        .send({ email: lockUser.email, password: lockUser.password, displayName: lockUser.displayName });
    });

    it('423 — locks account after 5 failed attempts', async () => {
      // 5 failures — 5th sets lockedUntil but still returns 401
      for (let i = 0; i < 5; i++) {
        await supertest(app.getHttpServer())
          .post('/auth/login')
          .send({ email: lockUser.email, password: 'Wrong1!' });
      }
      // 6th attempt hits the lockedUntil check → 423
      const res = await supertest(app.getHttpServer())
        .post('/auth/login')
        .send({ email: lockUser.email, password: 'Wrong1!' });

      expect(res.status).toBe(423);
      expect(res.body.code).toBe('ACCOUNT_LOCKED');
    });

    it('423 — locked account rejects correct password too', async () => {
      const res = await supertest(app.getHttpServer())
        .post('/auth/login')
        .send({ email: lockUser.email, password: lockUser.password });

      expect(res.status).toBe(423);
    });
  });
});
