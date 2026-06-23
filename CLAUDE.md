# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

**Design phase complete — coding has not started.** All content under `docs/` defines the architecture. The monorepo scaffold, service code, and infra files do not yet exist. When coding begins, follow the structure and constraints below.

## Planned commands (once scaffold exists)

```bash
# Install (pnpm workspaces)
pnpm install

# Dev — run infra only, services on host
docker compose -f docker-compose.infra.yml up -d
pnpm nx serve auth-service        # :3001
pnpm nx serve product-service     # :3002
pnpm nx serve orders-service      # :3003
pnpm nx serve api-gateway         # :3000

# Full stack in Docker
docker compose up --build

# Tests
pnpm nx test <service>                         # unit tests
pnpm nx test <service> --testPathPattern=integration  # integration (Testcontainers)
pnpm nx run-many --target=test --all           # all services
pnpm nx affected --target=test                 # only changed + dependents (preferred in CI)

# Lint / type-check
pnpm nx lint <service>
pnpm nx run-many --target=typecheck --all

# Prisma (run per-service)
pnpm nx run auth-service:prisma:migrate        # dev migration
pnpm nx run orders-service:prisma:generate     # regenerate client
```

## Architecture

Full design: `docs/README.md`. Key facts for coding:

**Monorepo layout**: Nx + pnpm workspaces. Services in `apps/`, shared code in `libs/`.

| Path | Purpose |
|---|---|
| `apps/api-gateway` | Edge: JWT verify, routing, rate limit |
| `apps/auth-service` | Identity, tokens, RBAC |
| `apps/product-service` | Catalog, categories, inventory |
| `apps/orders-service` | Order lifecycle, order items |
| `libs/contracts` | DTOs, event payloads, enums — **leaf lib, no dependencies** |
| `libs/messaging` | RabbitMQ abstraction (swap to Kafka without domain changes) |
| `libs/auth` | JWT guards, `@Roles()` decorator, identity types |
| `libs/config` | Zod-validated env loading |
| `libs/observability` | pino logger, correlation-id middleware, health endpoints |
| `libs/database` | Prisma helpers, outbox writer, transaction utils |
| `libs/testing` | Testcontainers helpers, fixture builders, JWT mint helper |

**Dependency rule**: Apps import libs. Libs never import apps. `contracts` imports nothing. Enforced by Nx `enforce-module-boundaries`.

## Key architectural constraints

**Database-per-service** — one Postgres instance, separate logical DBs (`auth_db`, `product_db`, `orders_db`). A service must never query another service's DB.

**Cross-service data via events, not joins** — orders-service maintains a `product_snapshots` read model populated by `product.*` events. No cross-DB reads.

**Outbox pattern** — domain events are written as outbox rows in the same DB transaction as the state change. A relay process publishes them to RabbitMQ. Never publish to the broker inside the main transaction.

**Idempotency** — every service has a `processed_events` table. Consumers dedupe by `eventId` (UUID). Outbox rows and `idempotency_keys` for HTTP endpoints follow the same pattern.

**JWT RS256** — auth-service holds the private key. Gateway verifies with public key locally on every request (no per-request call to auth-service). Gateway then forwards `x-user-id`, `x-user-roles`, `x-correlation-id` headers; downstream services trust these within the private network.

**RabbitMQ topology** — one topic exchange `domain.events`, all queues durable with a DLX. See `docs/05-infrastructure/03-rabbitmq-topology.md`.

## Naming conventions

| Thing | Convention | Example |
|---|---|---|
| Service app | `kebab-case-service` | `orders-service` |
| Shared lib import | `@app/<name>` | `@app/contracts` |
| Database | `<service>_db` | `orders_db` |
| DB table | `snake_case` plural | `order_items` |
| Domain event routing key | `<aggregate>.<verb-past>` | `order.created` |
| REST route | `/<plural-resource>` | `GET /orders/:id` |
| Correlation header | `x-correlation-id` | — |

## Response envelope

```jsonc
// success
{ "data": { /* resource */ }, "meta": { "correlationId": "..." } }
// error
{ "error": { "code": "ORDER_NOT_FOUND", "message": "...", "details": [] }, "meta": { "correlationId": "..." } }
```

## Testing rules

- Unit tests: `*.spec.ts` co-located in `src/`. No real DB or broker. Use `@golevelup/ts-jest` for mocks. Target >80% branch coverage on service/domain modules.
- Integration tests: `test/integration/`. Testcontainers spins up real Postgres + RabbitMQ. Never mock the database.
- Contract tests: shared `@app/contracts` types + fixture-based runtime assertions. A new routing key (e.g. `order.created.v2`) for breaking event changes.
- E2E tests: `apps/e2e/`. Full stack via Testcontainers or docker-compose; drives journeys through the gateway HTTP API.

## Service ports

| Service | Port |
|---|---|
| api-gateway | 3000 |
| auth-service | 3001 |
| product-service | 3002 |
| orders-service | 3003 |
| PostgreSQL | 5432 |
| RabbitMQ AMQP | 5672 |
| RabbitMQ mgmt UI | 15672 |
