# ADR 0003 — Database-per-service (Single Postgres Instance)

## Status

Accepted

## Context

We need to decide how to handle persistence across multiple services. Options range from a single
shared database to fully independent database servers per service.

**Options considered:**

1. **Shared database** — all services read/write the same tables.
2. **Schema-per-service** — one Postgres, separate schemas per service.
3. **Database-per-service, single Postgres instance** — separate logical databases, one server.
4. **Database-per-service, separate servers** — maximum isolation, highest infra cost.

## Decision

**Database-per-service using separate logical databases (`auth_db`, `product_db`, `orders_db`)
on a single Postgres 16 instance.**

## Reasons

- **Data ownership**: each service's schema is a private implementation detail. No other service
  can see or query it. This is the microservice contract.
- **Independent schema evolution**: product-service can add a column without a cross-team
  migration meeting. No shared schema means no coordination cost.
- **No cross-service joins**: forced by the boundary — teams can't take shortcuts. Data needed
  elsewhere travels via events or API.
- **Single instance is operationally simple**: for Phase 1, one Postgres is one container.
  Moving to separate instances (one per service) in K8s requires only a `DATABASE_URL` change
  per service — no code change. The pattern is already correct.
- **Schema-per-service rejected**: separate schemas on one database still allow cross-schema JOINs
  with a superuser connection, making the boundary soft and easy to violate accidentally.

## Consequences

**Easier:**
- Each service evolves its schema independently.
- Adding a new service means adding one new database, not a shared schema migration.
- K8s migration = change `DATABASE_URL` to a managed instance, nothing else.
- Testing: each service's integration tests can target a clean DB in Testcontainers without
  affecting other services.

**Harder:**
- Cross-service queries are impossible — requires events or sync API calls.
- No referential integrity across services (e.g. `orders.user_id` has no FK to `auth_db.users`).
  Application-level consistency via events instead.
- `product_id` in `order_items` is a logical reference, not enforced by DB. Snapshot pattern
  compensates.

## Note on eventual separate instances

When K8s arrives, each service gets its own managed Postgres instance (RDS / Cloud SQL). The
`DATABASE_URL` env var is the only thing that changes. Prisma migrations apply per service.
