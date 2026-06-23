# 05 — Shared Libraries

Shared code lives in `libs/` and is imported via `@app/*` path aliases. Keep libs small and
focused; an app should depend only on what it needs.

## `@app/contracts` — the source of truth

The single place where cross-boundary shapes are defined. Both producer and consumer compile
against these types, so a breaking change is a compile error, not a runtime surprise.

Contains:
- **DTOs**: request/response shapes for each service's API.
- **Event payloads**: one TypeScript type per event in the [Event Catalog](06-event-catalog.md).
- **Enums**: shared enums (`OrderStatus`, `PaymentStatus`, `Role`).
- **Constants**: routing keys, queue names, exchange name.

```ts
// libs/contracts/src/events/order-events.ts
export const ORDER_CREATED = 'order.created';

export interface OrderCreatedV1 {
  eventId: string;       // uuid — used for idempotency
  version: 1;
  occurredAt: string;    // ISO-8601
  orderId: string;
  userId: string;
  items: { productId: string; quantity: number; unitPrice: string }[];
  totalAmount: string;   // decimal as string to avoid float errors
  currency: string;      // 'USD'
}
```

> Rule: `@app/contracts` depends on **nothing** else. It is a pure leaf.

## `@app/messaging` — broker abstraction

Wraps RabbitMQ (via `@nestjs/microservices`) behind a small interface so domain code never imports
broker APIs directly. This is the seam for the future **Kafka** migration.

```ts
export interface EventPublisher {
  publish<T>(routingKey: string, payload: T): Promise<void>;
}
export interface EventConsumer {
  // registered via @EventPattern decorators in each service
}
```

Provides: connection management, publisher with outbox support, manual-ack consumer base, retry +
DLQ wiring, and a correlation-id propagation interceptor.

## `@app/auth` — identity primitives

- `JwtAuthGuard`, `RolesGuard`, `@Roles()` decorator, `@CurrentUser()` param decorator.
- Identity types (`AuthenticatedUser`).
- Helpers to read forwarded `x-user-id` / `x-user-roles` headers in downstream services.
- Token signing/verification utilities (used by auth-service to sign, others to verify).

## `@app/config` — validated configuration

- Loads env via `@nestjs/config`.
- Validates with **Zod** at boot; the app refuses to start on invalid/missing config.
- Exposes a typed `AppConfig` object. See [Environments & Config](../05-infrastructure/02-environments-config.md).

## `@app/observability` — logs, tracing, health

- Pre-configured `nestjs-pino` logger (structured JSON).
- Correlation-id middleware/interceptor (`x-correlation-id`).
- `/health/live` and `/health/ready` Terminus indicators (DB, broker).
- Metrics hook (Prometheus-ready) — see [Observability](08-observability.md).

## `@app/database` — Prisma helpers

- Base repository utilities, transaction helper, soft-delete helper.
- Outbox table helper (write event + state in one transaction).
- Note: **each service has its own Prisma schema and client**; this lib only shares patterns/helpers,
  not models.

## `@app/testing` — test toolkit

- Testcontainers helpers to spin up Postgres + RabbitMQ for integration/E2E.
- Fixture builders for users, products, orders.
- Auth helper to mint valid test JWTs.

See how these are versioned and used in [Testing](../06-testing/01-test-strategy.md).
