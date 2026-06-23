# 01 — Database Strategy

## Chosen strategy: Database-per-service

One logical PostgreSQL database per service, all hosted on a single Postgres 16 instance for Phase 1.

```
postgres:5432
  ├── auth_db
  ├── product_db
  └── orders_db
  (payment_db, notification_db — later)
```

## Why database-per-service

| Property               | What it gives us                                                        |
| ---------------------- | ----------------------------------------------------------------------- |
| **Data ownership**     | A service's schema is its private implementation detail. Only the owner reads/writes it. |
| **Independent schema evolution** | A service can add/alter tables without a cross-team migration. |
| **Failure isolation**  | A bad migration in product_db can't corrupt orders_db.                  |
| **Tech heterogeneity** | Services could use different stores later (Mongo, Redis) — the boundary is already there. |
| **K8s migration**      | Each service+DB can be moved to its own managed PG instance without any code change. |

## What "database-per-service" does NOT mean

- **Not** one Postgres container per service (too expensive locally; single instance is fine).
- **Not** separate Postgres users per service today (added when needed — see security hardening).
- **Not** no communication — services communicate via **events and REST**; the data boundary is enforced by convention and Nx dependency rules.

## Connection ownership

Each service creates its own Prisma client pointing at its database. No service holds a connection
to another service's database. This is enforced by keeping each `prisma/schema.prisma` scoped and
never sharing Prisma clients across services.

```
auth-service    → DATABASE_URL=postgres://pg/auth_db
product-service → DATABASE_URL=postgres://pg/product_db
orders-service  → DATABASE_URL=postgres://pg/orders_db
```

## Cross-service data patterns

Since services can't join, the patterns used to share data are:

| Pattern             | Used by                                      | Mechanism               |
| ------------------- | -------------------------------------------- | ----------------------- |
| **Event-driven snapshot** | orders has product prices/names         | `product.*` events → `product_snapshots` |
| **Synchronous query**     | orders calls product for availability    | REST `POST /products/availability` |
| **Identity propagation**  | services receive user identity          | JWT claims / forwarded headers |
| **Event enrichment**      | notification gets user email in payload | Payload carries what consumers need |

## Moving to a managed database (later / K8s)

Phase 1: single Docker container.
Later: replace `docker-compose` Postgres with a managed PG service (RDS, Cloud SQL) per service —
each service only changes its `DATABASE_URL` env var. See [Environments & Config](../05-infrastructure/02-environments-config.md).

## Standard tables every service includes

These two tables are in every service's schema (provided by `@app/database` helpers):

| Table              | Purpose                                                          |
| ------------------ | ---------------------------------------------------------------- |
| `processed_events` | Idempotent event consumption: record `eventId` after handling    |
| `outbox`           | Reliable event publishing: write event + state in one transaction |

See [Error Handling](../01-architecture/07-error-handling.md) for details.
