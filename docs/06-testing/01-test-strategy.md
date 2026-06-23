# 01 — Test Strategy

## Testing pyramid

```
         ┌────────────────────────────┐
         │       E2E Tests            │  ← full stack, primary user journeys
         │   (cross-service, slow)    │     docker-compose or Testcontainers
         ├────────────────────────────┤
         │   Integration Tests        │  ← one service + real DB + real broker
         │  (per service, medium)     │     Testcontainers (Postgres + RabbitMQ)
         ├────────────────────────────┤
         │     Contract Tests         │  ← producer/consumer payload compatibility
         │   (across services, fast)  │     Pact or schema assertion
         ├────────────────────────────┤
         │      Unit Tests            │  ← pure domain logic, no I/O
         │   (per module, fast)       │     Jest, fully in-memory
         └────────────────────────────┘
```

## Layer summary

| Layer       | What's tested                                | Real DB? | Real Broker? | Speed   | CI Stage |
| ----------- | -------------------------------------------- | -------- | ------------ | ------- | -------- |
| Unit        | Service methods, domain rules, DTO validation | No       | No           | Fast    | Always   |
| Integration | REST handlers + Prisma + actual Postgres     | Yes (TC) | Yes (TC)     | Medium  | Always   |
| Contract    | Event payload shapes, API response shapes    | No       | No           | Fast    | Always   |
| E2E         | User journey through all services + gateway  | Yes      | Yes          | Slow    | CI + pre-merge |

TC = Testcontainers (spins up real Docker containers per test suite, isolated, auto-cleaned).

## Unit tests

- Location: `apps/<service>/src/**/*.spec.ts`
- No real database, no real broker. Use `jest.mock` / `createMock` from `@golevelup/ts-jest`.
- Cover: business rules, validation logic, state transitions (order status machine), error paths,
  edge cases.
- Target: **>80% branch coverage** on service/domain modules.

```ts
// example: orders service unit test
it('should reject CANCEL on a COMPLETED order', () => {
  const order = buildOrder({ status: 'COMPLETED' });
  expect(() => ordersService.cancel(order, 'reason'))
    .toThrow(InvalidOrderStateException);
});
```

## Integration tests

- Location: `apps/<service>/test/integration/**/*.spec.ts`
- Use `@app/testing` helpers: `startPostgres()`, `startRabbitMQ()` from Testcontainers.
- Cover: full NestJS module bootstrap, real Prisma queries, real RabbitMQ publish/consume.
- Lifecycle: `beforeAll` — start containers + migrate DB; `afterAll` — stop containers.
- One test suite per NestJS module boundary (e.g. `OrdersModule`, `AuthModule`).

```ts
beforeAll(async () => {
  pg = await startPostgresContainer('orders_db');
  rmq = await startRabbitMQContainer();
  app = await createTestingModule({ ... });
  await runMigrations(pg.connectionString);
});
```

## Contract tests

See [Contract Testing](03-contract-testing.md) for the full approach.
Short version: each event payload type in `@app/contracts` has a corresponding schema test that
runs against any fixture the producer would emit — shared between producer and consumer test suites.

## E2E tests

See [E2E Test Plan](02-e2e-test-plan.md) for the full plan.
Short version: located in `apps/e2e/`, boot all services + infra via Testcontainers (or
`docker-compose up`), drive the primary user journeys from the outside via the gateway HTTP API.

## CI pipeline

```
push / PR
  ├── lint + type-check (fast, parallel)
  ├── unit tests (parallel per service)
  ├── integration tests (parallel per service, Testcontainers)
  ├── contract tests
  └── E2E tests (sequential or parallel)
```

Nx `affected` graph ensures only changed services + their dependents are re-tested, keeping CI fast.

## Tooling

| Tool                          | Used for                                      |
| ----------------------------- | --------------------------------------------- |
| Jest                          | All test execution                            |
| Supertest                     | HTTP assertions in integration/E2E            |
| Testcontainers (Node.js)      | Real Postgres + RabbitMQ per test suite       |
| `@golevelup/ts-jest`          | Auto-mock NestJS providers in unit tests      |
| `@app/testing`                | Shared fixtures, JWT mint helper, DB helpers  |
| Pact (optional)               | Consumer-driven contract tests (see §03)      |
| Faker.js                      | Generating test data                          |
