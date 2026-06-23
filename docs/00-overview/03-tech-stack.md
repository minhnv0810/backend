# 03 — Tech Stack & Conventions

## Stack

| Layer            | Technology                       | Version target | Notes                                      |
| ---------------- | -------------------------------- | -------------- | ------------------------------------------ |
| Runtime          | Node.js                          | 20 LTS         | Pin in `.nvmrc` and Docker base image      |
| Framework        | NestJS                           | 10.x           | Modular, DI, first-class microservices     |
| Language         | TypeScript                       | 5.x            | `strict: true`                             |
| Monorepo         | Nx                               | latest         | `apps/*`, `libs/*`, task caching           |
| Package manager  | pnpm                             | latest         | Workspaces, fast, disk-efficient           |
| ORM              | Prisma                           | 5.x            | One schema + migration set per service     |
| Database         | PostgreSQL                       | 16             | One instance, **database-per-service**     |
| Message broker   | RabbitMQ                         | 3.13           | Topic exchange `domain.events`             |
| Transport (Nest) | `@nestjs/microservices` (RMQ)    | 10.x           | For event consumers/producers              |
| Validation       | `class-validator` / `class-transformer` | latest  | On all DTOs                                |
| API docs         | `@nestjs/swagger` (OpenAPI)      | latest         | Per-service Swagger UI                     |
| Auth             | `@nestjs/jwt` + Passport         | latest         | RS256 access/refresh tokens                |
| Config           | `@nestjs/config` + Zod/Joi       | latest         | Validated env at boot                      |
| Logging          | `nestjs-pino`                    | latest         | Structured JSON logs + correlation id      |
| Testing          | Jest + Supertest + Testcontainers | latest        | Unit, integration, E2E                     |
| Containers       | Docker + docker-compose          | latest         | Local orchestration                        |
| Streaming (later)| Kafka (`kafkajs`)                | —              | High-volume event log                      |
| Orchestration (later) | Kubernetes + Helm           | —              | Production deploy                          |

## Naming conventions

| Thing                | Convention                  | Example                          |
| -------------------- | --------------------------- | -------------------------------- |
| Service app          | `kebab-case` + `-service`   | `orders-service`                 |
| Shared lib           | `@app/<name>`               | `@app/contracts`, `@app/rmq`     |
| Database             | `<service>_db`              | `orders_db`                      |
| Table                | `snake_case`, plural        | `order_items`                    |
| Column               | `snake_case`                | `created_at`                     |
| Domain event         | `<aggregate>.<verb-past>`   | `order.created`, `user.registered` |
| REST route           | `/<plural-resource>`        | `GET /orders/:id`                |
| Env var              | `SCREAMING_SNAKE_CASE`      | `RABBITMQ_URL`                   |
| Correlation header   | `x-correlation-id`          | —                                |

## Standard ports

| Component             | Port  |
| --------------------- | ----- |
| api-gateway           | 3000  |
| auth-service          | 3001  |
| product-service       | 3002  |
| orders-service        | 3003  |
| payment-service (later)| 3004 |
| notification-service (later) | 3005 |
| PostgreSQL            | 5432  |
| RabbitMQ (AMQP)       | 5672  |
| RabbitMQ (mgmt UI)    | 15672 |

## Response & error envelope

All REST responses (via gateway) follow a consistent envelope — see
[Error Handling](../01-architecture/07-error-handling.md).

```jsonc
// success
{ "data": { /* resource */ }, "meta": { "correlationId": "..." } }

// error
{ "error": { "code": "ORDER_NOT_FOUND", "message": "Order ... not found", "details": [] },
  "meta": { "correlationId": "..." } }
```

## Versioning

- REST APIs are versioned by URI prefix: `/api/v1/...` at the gateway.
- Events are versioned by adding a `version` field in the payload; breaking changes get a new
  routing key (`order.created.v2`). See [Event Catalog](../01-architecture/06-event-catalog.md).
