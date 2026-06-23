# 04 — Monorepo Structure (Nx)

Single repository managed by **Nx** with `pnpm` workspaces. Services live in `apps/`, shared code
in `libs/`. Nx gives us dependency graphs, affected-only builds/tests, and task caching.

## Layout

```
backend/
├── apps/
│   ├── api-gateway/
│   ├── auth-service/
│   ├── product-service/
│   ├── orders-service/
│   ├── payment-service/          # later
│   └── notification-service/     # later
│
├── libs/
│   ├── contracts/                # @app/contracts — DTOs + event payload types (source of truth)
│   ├── messaging/                # @app/messaging — RabbitMQ publish/consume abstraction
│   ├── auth/                     # @app/auth — JWT guards, decorators, identity types
│   ├── config/                   # @app/config — env loading + validation (Zod)
│   ├── observability/            # @app/observability — pino logger, correlation id, health
│   ├── database/                 # @app/database — Prisma helpers, base repository, tx utils
│   └── testing/                  # @app/testing — test fixtures, Testcontainers helpers
│
├── prisma/                       # per-service prisma schemas (or co-located per app)
│   ├── auth/schema.prisma
│   ├── product/schema.prisma
│   └── orders/schema.prisma
│
├── docs/                         # ← these design documents
├── docker/                       # Dockerfiles + compose overrides
│   ├── Dockerfile                # multi-stage, shared by all services (target arg)
│   └── ...
├── docker-compose.yml            # local full-stack
├── docker-compose.infra.yml      # just postgres + rabbitmq (for running services on host)
├── nx.json
├── pnpm-workspace.yaml
├── tsconfig.base.json            # path aliases for @app/*
└── package.json
```

## Per-service app structure (NestJS)

```
apps/orders-service/
├── src/
│   ├── main.ts                   # bootstrap (HTTP + RMQ microservice)
│   ├── app.module.ts
│   ├── orders/
│   │   ├── orders.controller.ts  # REST
│   │   ├── orders.service.ts     # domain logic
│   │   ├── orders.repository.ts  # Prisma data access
│   │   ├── dto/                  # request/response DTOs (import shared from @app/contracts)
│   │   └── events/
│   │       ├── orders.publisher.ts   # emits order.* events
│   │       └── orders.consumer.ts    # handles product.*, payment.* events
│   └── health/health.controller.ts
├── test/                          # integration + e2e for this service
├── prisma/schema.prisma           # (or under /prisma/orders)
├── project.json                   # Nx targets
└── Dockerfile                     # or shared docker/Dockerfile with target
```

## Dependency rules (enforced by Nx tags)

| From \ May depend on | apps | contracts | messaging | auth | config | observability | database | testing |
| -------------------- | ---- | --------- | --------- | ---- | ------ | ------------- | -------- | ------- |
| **apps/***           | —    | ✅        | ✅        | ✅   | ✅     | ✅            | ✅       | dev     |
| **libs/contracts**   | ❌   | —         | ❌        | ❌   | ❌     | ❌            | ❌       | ❌      |
| **libs/messaging**   | ❌   | ✅        | —         | ❌   | ✅     | ✅            | ❌       | ❌      |

- `contracts` is a **leaf** library — it depends on nothing, everything depends on it.
- Apps never import from other apps. Cross-app data only via REST or events.
- Nx `enforce-module-boundaries` lint rule makes violations fail CI.

See the libraries in detail: [Shared Libraries](05-shared-libraries.md).
