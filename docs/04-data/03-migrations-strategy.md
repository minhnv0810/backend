# 03 — Migration Strategy

## Tool: Prisma Migrate

Each service has its own `prisma/schema.prisma` and its own migration history in
`prisma/migrations/`. Migrations are co-located with the service that owns that DB.

## Directory layout

```
prisma/
  auth/
    schema.prisma
    migrations/
      20260623_000001_init/migration.sql
      20260624_000001_add_locked_until/migration.sql
  product/
    schema.prisma
    migrations/
      ...
  orders/
    schema.prisma
    migrations/
      ...
```

Alternatively each service owns its own `prisma/` folder inside `apps/<service>/prisma/`.
The monorepo root `prisma/` layout is preferred to keep all schemas visible in one place.

## Workflow

### Local development

```bash
# edit schema.prisma, then:
npx prisma migrate dev --schema=prisma/auth/schema.prisma --name=add_locked_until
# applies migration + regenerates Prisma client
```

### CI (automated apply on PR)

```bash
npx prisma migrate deploy --schema=prisma/auth/schema.prisma
```

`migrate deploy` applies pending migrations without interactive prompts. Safe to run in CI and on
start-up.

### Service start-up in Docker

Each service's container entrypoint runs `prisma migrate deploy` before starting the NestJS app:

```dockerfile
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
```

This makes migrations automatic on every deploy — suitable for Phase 1. For production the step
moves to a dedicated pre-deploy job (or init container) to separate migration from app start.

## Naming convention

```
YYYYMMDD_NNNNNN_<description>
20260623_000001_init
20260625_000001_add_product_categories
```

## Zero-downtime migrations (rules)

Never write a migration that breaks the currently-running version of the app. Follow the
expand-contract pattern:

1. **Expand**: add new column/table (nullable or with default) — old code still works.
2. **Migrate**: deploy new code that uses the new column.
3. **Contract**: (if needed) drop the old column in a subsequent migration after all instances updated.

Banned in a single deployment: rename a column, change a column type without a cast,
drop a column still read by running code, add a `NOT NULL` column without a default/backfill.

## Seeding

```bash
npx prisma db seed --schema=prisma/auth/schema.prisma
```

Seed scripts live alongside schemas:
- `prisma/auth/seed.ts` — inserts `customer` and `admin` roles.
- `prisma/product/seed.ts` — inserts sample categories and products (dev only).

Seeds are idempotent (upsert, not insert).

## Rollback

Prisma Migrate does not auto-rollback. To undo a migration:

1. Write a new migration that reverts the change.
2. Never hand-edit the `migrations/` folder; always use `prisma migrate dev`.

For emergencies (production data at risk): restore from backup, then replay safe migrations.

## Separate Prisma clients per service

Each service imports its own generated client:

```ts
// apps/auth-service — uses the auth Prisma client
import { PrismaClient } from '../../../generated/auth-client';
```

The `@app/database` shared library provides helpers (base repository, transaction utility,
outbox writer) but **not** a shared Prisma client or shared models.
