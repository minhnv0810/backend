# api-gateway — Overview

The **only** public entry point into the system. All client traffic (browser, mobile, third-party)
passes through the gateway. Services are not reachable from outside the private network.

## Responsibilities

| Responsibility         | Detail                                                                 |
| ---------------------- | ---------------------------------------------------------------------- |
| JWT verification       | Validates RS256 access token locally (public key) on every protected route |
| Identity propagation   | Strips `Authorization` header; injects `x-user-id`, `x-user-roles`    |
| Correlation ID         | Generates or forwards `x-correlation-id` on every request             |
| Request routing        | Proxies to the correct upstream service based on path prefix           |
| Rate limiting          | Per-IP throttling, stricter on auth endpoints                          |
| CORS                   | Configured per environment; blocks disallowed origins early            |
| Security headers       | helmet — `X-Frame-Options`, `CSP`, `HSTS`, etc.                        |
| Request timeout        | Kills upstream requests that exceed 10 s; returns `504`                |
| Health endpoint        | Own `/health/live` and `/health/ready` (not proxied)                   |

## What the gateway does NOT do

- **No business logic** — it never reads from a database or emits domain events.
- **No per-request call to auth-service** — JWT is verified locally with the cached public key.
- **No aggregation / BFF** — one request in, one upstream call out. Composition is the client's job.
- **No service discovery** — upstream URLs are static config (env vars), not dynamic registry.

## JWT verification model

```
Client ──Bearer token──► Gateway
                           │
                           ▼
                    verify(token, publicKey)   ← RS256 local check
                           │
              ┌────────────┴────────────┐
            fail                      pass
              │                         │
           401 UNAUTHORIZED    set x-user-id, x-user-roles
                                forward to upstream service
```

Public key is loaded once at boot from `JWT_PUBLIC_KEY` env var (PEM string).
It is **never** fetched at request time. Key rotation requires a rolling restart.

## Request lifecycle (protected route)

```
1. Receive request
2. Attach / forward x-correlation-id
3. Apply rate limit (throttle guard)
4. Parse Authorization: Bearer <token>
5. Verify JWT (signature, exp, aud="ecommerce-api", iss="auth-service")
6. On failure → 401
7. On success → attach x-user-id, x-user-roles; strip Authorization header
8. Proxy to upstream with timeout
9. Forward upstream response (status + body unchanged)
```

## Request lifecycle (public route)

Steps 4–7 are skipped. `x-user-id` and `x-user-roles` headers are **not** set.
Upstream services must not trust identity claims on public routes.

## NestJS implementation notes

- Built with **NestJS** + `http-proxy-middleware` (or `@nestjs/axios` forwarding).
- `JwtAuthGuard` — global except routes decorated `@Public()`.
- `ThrottlerGuard` — applied globally, stricter limits via `@Throttle()` on auth routes.
- `helmet()` and `enableCors()` applied in `main.ts`.
- No Prisma, no RabbitMQ — this service has zero infra dependencies beyond config.

Continue to [Routing Table](02-routing-table.md) · [Config & Env](03-config.md).
