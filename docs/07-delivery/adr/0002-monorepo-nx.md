# ADR 0002 — Nx Monorepo with pnpm Workspaces

## Status

Accepted

## Context

We are building multiple NestJS services that share types, utilities, and test helpers. We need to
decide how to organize the codebase across repositories.

**Options considered:**

1. **Polyrepo** — one git repo per service plus a shared `contracts` package published to npm.
2. **Turborepo + pnpm workspaces** — monorepo with Turbo for task pipelines.
3. **Nx monorepo + pnpm workspaces** — monorepo with Nx generators, affected graph, cache.

## Decision

**Nx monorepo with pnpm workspaces.**

## Reasons

- **Shared contracts without npm publish friction**: `@app/contracts` is importable immediately
  with path aliases; no publish/version step to propagate a type change.
- **Affected builds/tests**: Nx's dependency graph means `nx affected --target=test` only re-runs
  services impacted by a change. CI stays fast as the codebase grows.
- **First-class NestJS generators**: Nx has official NestJS plugins (`@nx/nest`) for generating
  apps and libs consistently.
- **Enforce boundaries**: Nx's `enforce-module-boundaries` lint rule makes cross-app imports a
  lint error, not just a convention.
- **Atomic cross-service refactors**: renaming a field in `@app/contracts` is one PR; in polyrepo
  it's N PRs with a publish + version bump in between.

## Consequences

**Easier:**
- Sharing code (DTOs, event types, test helpers) across services with zero ceremony.
- Consistent tooling — one tsconfig, one lint config, one CI definition.
- Atomic refactors across service boundaries.

**Harder:**
- Everyone works in one large repo (can feel heavy for a small team; non-issue at our scale).
- Service-level deploy independence requires CI to detect which service actually changed (Nx
  `affected` handles this).
- If a service needs to be extracted later, it can be: move `apps/<service>` + relevant `libs/`
  to a new repo and publish them as npm packages.
