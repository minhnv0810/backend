# ADR 0004 — Prisma as the ORM

## Status

Accepted

## Context

We need an ORM / data-access layer for NestJS + Postgres. The main contenders in the NestJS
ecosystem are TypeORM, MikroORM, and Prisma.

**Options considered:**

1. **TypeORM** — default in NestJS docs, decorator-based entities, long history.
2. **MikroORM** — unit-of-work + identity map, strong TypeScript, smaller community.
3. **Prisma** — schema-first, generated client, excellent migration tooling, type-safe queries.

## Decision

**Prisma.**

## Reasons

- **Schema-first, single source of truth**: `schema.prisma` defines the data model; the client
  is generated from it. The schema is the migration baseline — no divergence between model
  and DB possible.
- **Type-safe queries with autocompletion**: the generated client gives full TS types for every
  query, including relation traversals. TypeORM's decorator model has more footguns (N+1,
  lazy-loading surprises).
- **Migration tooling**: `prisma migrate dev` + `prisma migrate deploy` is the clearest migration
  workflow of the three. Diff-based, SQL is visible, migration history is versioned.
- **One schema per service**: Prisma is intentionally scoped. A service's `schema.prisma` is
  exactly the tables that service owns — explicit and contained.
- **Community momentum**: Prisma is the most-used ORM in the NestJS/TypeScript ecosystem as of
  2026, with active development and strong docs.

## Consequences

**Easier:**
- Migrations are always from schema diff — never write raw migration SQL unless needed.
- Queries are fully typed; IDE autocomplete for every field.
- Reviewing schema changes is reviewing `schema.prisma` — no scattered decorator changes.

**Harder:**
- Raw SQL is possible but less idiomatic (`$queryRaw`); complex queries may need it.
- Prisma doesn't support every Postgres feature natively (some index types, custom domains) —
  use `unsupported()` or raw SQL migrations for those.
- Each service has its own generated client (`@prisma/client` is generated per schema); import
  paths must be configured correctly in the Nx workspace.

## TypeORM comparison note

TypeORM was rejected primarily due to its runtime footguns: lazy-loading by default, decorator
metadata instability, and `synchronize: true` being a production footgun. Prisma's explicit
query model and migration workflow are a better fit for a team that values predictability.
