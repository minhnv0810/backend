import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { execSync } from 'child_process';
import { resolve } from 'path';
import supertest from 'supertest';
import { StartedTestContainer } from 'testcontainers';
import { v4 as uuidv4 } from 'uuid';
import {
  startPostgresContainer,
  getPostgresDatabaseUrl,
  startRabbitMQContainer,
  getRabbitMQUrl,
  buildProductFixture,
} from '@app/testing';
import { MESSAGING_OPTIONS } from '@app/messaging';
import { AppModule } from '../../src/app/app.module';
import { ProductClientService } from '../../src/product-client/product-client.service';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { PrismaClient } from '../../src/generated/prisma';

describe('Orders — Integration', () => {
  let app: INestApplication;
  let pgContainer: StartedTestContainer;
  let rmqContainer: StartedTestContainer;
  let prisma: PrismaClient;

  const userId = uuidv4();
  const otherUserId = uuidv4();
  const product = buildProductFixture({ price: '49.99', stock: 100 });

  // ─── setup ────────────────────────────────────────────────────────────────

  beforeAll(async () => {
    [pgContainer, rmqContainer] = await Promise.all([
      startPostgresContainer('orders_test'),
      startRabbitMQContainer(),
    ]);

    const dbUrl = getPostgresDatabaseUrl(pgContainer, 'orders_test');
    const rmqUrl = getRabbitMQUrl(rmqContainer);

    process.env['DATABASE_URL'] = dbUrl;
    process.env['RABBITMQ_URL'] = rmqUrl;
    process.env['PRODUCT_SERVICE_URL'] = 'http://localhost:9999'; // unused — mocked
    process.env['NODE_ENV'] = 'test';
    process.env['LOG_LEVEL'] = 'error';

    const schemaPath = resolve(__dirname, '../../prisma/schema.prisma');
    const prismaBin = resolve(__dirname, '../../../../node_modules/.bin/prisma');
    execSync(`${prismaBin} migrate deploy --schema=${schemaPath}`, {
      env: { ...process.env, DATABASE_URL: dbUrl },
      stdio: 'pipe',
    });

    prisma = new PrismaClient({ datasources: { db: { url: dbUrl } } });

    // Seed product snapshot so orders-service can price items
    await prisma.productSnapshot.create({
      data: {
        productId: product.id,
        name: product.name,
        price: product.price,
        currency: product.currency,
        stockView: product.stock,
      },
    });

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ProductClientService)
      .useValue({ checkAvailability: jest.fn().mockResolvedValue(undefined) })
      .overrideProvider(MESSAGING_OPTIONS)
      .useValue({ url: rmqUrl, declareTopology: false })
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();
  }, 240_000);

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
    await Promise.all([pgContainer.stop(), rmqContainer.stop()]);
  });

  // ─── helpers ──────────────────────────────────────────────────────────────

  function authedRequest(userId: string, roles = 'customer') {
    const server = app.getHttpServer();
    const headers = { 'x-user-id': userId, 'x-user-roles': roles };
    return {
      get: (url: string) => supertest(server).get(url).set(headers),
      post: (url: string) => supertest(server).post(url).set(headers),
    };
  }

  function makeOrderPayload(overrides: { idempotencyKey?: string; items?: object[] } = {}) {
    return {
      items: [{ productId: product.id, quantity: 2 }],
      idempotencyKey: uuidv4(),
      ...overrides,
    };
  }

  // ─── POST /orders ─────────────────────────────────────────────────────────

  describe('POST /orders', () => {
    it('201 — creates and auto-confirms an order', async () => {
      const payload = makeOrderPayload();

      const res = await authedRequest(userId).post('/orders').send(payload);

      expect(res.status).toBe(201);
      expect(res.body.data.status).toBe('CONFIRMED');
      expect(res.body.data.userId).toBe(userId);
      expect(res.body.data.items).toHaveLength(1);
      expect(res.body.data.items[0].productId).toBe(product.id);
      expect(res.body.data.items[0].quantity).toBe(2);
      expect(Number(res.body.data.totalAmount)).toBeCloseTo(99.98, 1);
      expect(res.body.meta.correlationId).toBeDefined();
    });

    it('201 — duplicate idempotencyKey returns original order (no duplicate)', async () => {
      const payload = makeOrderPayload();

      const first = await authedRequest(userId).post('/orders').send(payload);
      expect(first.status).toBe(201);

      const second = await authedRequest(userId).post('/orders').send(payload);
      expect(second.status).toBe(201);

      expect(second.body.data.id).toBe(first.body.data.id);

      const count = await prisma.idempotencyKey.count({ where: { key: payload.idempotencyKey } });
      expect(count).toBe(1);
    });

    it('422 — missing product snapshot', async () => {
      const res = await authedRequest(userId)
        .post('/orders')
        .send(makeOrderPayload({ items: [{ productId: uuidv4(), quantity: 1 }] }));

      expect(res.status).toBe(422);
      expect(res.body.error.code).toBe('PRODUCT_SNAPSHOT_MISSING');
    });

    it('401 — missing x-user-id header', async () => {
      const res = await supertest(app.getHttpServer())
        .post('/orders')
        .send(makeOrderPayload());

      expect(res.status).toBe(401);
    });

    it('400 — invalid payload (missing items)', async () => {
      const res = await authedRequest(userId)
        .post('/orders')
        .send({ idempotencyKey: uuidv4() });

      expect(res.status).toBe(400);
    });
  });

  // ─── GET /orders ──────────────────────────────────────────────────────────

  describe('GET /orders', () => {
    beforeAll(async () => {
      // Create an order for userId
      await authedRequest(userId).post('/orders').send(makeOrderPayload());
    });

    it('200 — returns orders for authenticated user', async () => {
      const res = await authedRequest(userId).get('/orders');

      expect(res.status).toBe(200);
      expect(res.body.data.items.length).toBeGreaterThan(0);
      expect(res.body.data.items.every((o: { userId: string }) => o.userId === userId)).toBe(true);
      expect(res.body.data.total).toBeGreaterThan(0);
    });

    it('200 — other user sees empty list', async () => {
      const res = await authedRequest(otherUserId).get('/orders');

      expect(res.status).toBe(200);
      expect(res.body.data.items).toHaveLength(0);
    });
  });

  // ─── GET /orders/:id ──────────────────────────────────────────────────────

  describe('GET /orders/:id', () => {
    let orderId: string;

    beforeAll(async () => {
      const res = await authedRequest(userId).post('/orders').send(makeOrderPayload());
      orderId = res.body.data.id;
    });

    it('200 — returns order for owner', async () => {
      const res = await authedRequest(userId).get(`/orders/${orderId}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(orderId);
    });

    it('404 — other user cannot access the order', async () => {
      const res = await authedRequest(otherUserId).get(`/orders/${orderId}`);

      expect(res.status).toBe(404);
    });

    it('404 — non-existent order', async () => {
      const res = await authedRequest(userId).get(`/orders/${uuidv4()}`);

      expect(res.status).toBe(404);
    });
  });

  // ─── POST /orders/:id/cancel ──────────────────────────────────────────────

  describe('POST /orders/:id/cancel', () => {
    it('422 — cannot cancel a CONFIRMED order', async () => {
      const createRes = await authedRequest(userId).post('/orders').send(makeOrderPayload());
      const orderId = createRes.body.data.id;

      const res = await authedRequest(userId)
        .post(`/orders/${orderId}/cancel`)
        .send({ reason: 'changed my mind' });

      expect(res.status).toBe(422);
      expect(res.body.error.code).toBe('INVALID_ORDER_STATE');
    });

    it('200 — can cancel a PENDING_PAYMENT order', async () => {
      // Seed a PENDING_PAYMENT order directly in DB (bypassing auto-confirm)
      const pendingOrder = await prisma.order.create({
        data: {
          userId,
          status: 'PENDING_PAYMENT',
          totalAmount: 49.99,
          currency: 'USD',
          items: {
            create: [
              {
                productId: product.id,
                productName: product.name,
                unitPrice: product.price,
                quantity: 1,
              },
            ],
          },
        },
      });

      const res = await authedRequest(userId)
        .post(`/orders/${pendingOrder.id}/cancel`)
        .send({ reason: 'changed my mind' });

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('CANCELLED');

      // outbox should have order.cancelled event
      const outboxRow = await prisma.outbox.findFirst({
        where: { routingKey: 'order.cancelled', sent: false },
        orderBy: { createdAt: 'desc' },
      });
      expect(outboxRow).not.toBeNull();
      expect((outboxRow!.payload as { orderId: string }).orderId).toBe(pendingOrder.id);
    });

    it('404 — cannot cancel another user\'s order', async () => {
      const createRes = await authedRequest(userId).post('/orders').send(makeOrderPayload());
      const orderId = createRes.body.data.id;

      const res = await authedRequest(otherUserId)
        .post(`/orders/${orderId}/cancel`)
        .send({});

      expect(res.status).toBe(404);
    });

    it('404 — non-existent order', async () => {
      const res = await authedRequest(userId)
        .post(`/orders/${uuidv4()}/cancel`)
        .send({});

      expect(res.status).toBe(404);
    });
  });

  // ─── Product snapshot sync (consumer) ─────────────────────────────────────

  describe('Product snapshot upsert (repository)', () => {
    it('creates a new snapshot from product.created payload', async () => {
      const newProduct = buildProductFixture();

      await prisma.productSnapshot.upsert({
        where: { productId: newProduct.id },
        update: { name: newProduct.name, price: newProduct.price, currency: newProduct.currency },
        create: {
          productId: newProduct.id,
          name: newProduct.name,
          price: newProduct.price,
          currency: newProduct.currency,
          stockView: newProduct.stock,
        },
      });

      const snap = await prisma.productSnapshot.findUnique({
        where: { productId: newProduct.id },
      });

      expect(snap).not.toBeNull();
      expect(snap!.name).toBe(newProduct.name);
      expect(Number(snap!.price)).toBeCloseTo(Number(newProduct.price), 2);
    });
  });
});
