# api-gateway — Phase 1

**Scope**: JWT RS256 verification, request proxying to 3 services, rate limiting, CORS, correlation ID.

## Files to implement

```
src/
├── main.ts                          ✓ done (port 3000)
├── app/app.module.ts
├── proxy/
│   ├── proxy.module.ts
│   └── proxy.service.ts             http-proxy-middleware forwarding + timeout
├── auth/
│   ├── jwt.strategy.ts              RS256 verify with public key (no auth-service call)
│   ├── jwt.guard.ts                 global guard, skips @Public() routes
│   └── decorators/
│       ├── public.decorator.ts      @Public() marks open routes
│       └── roles.decorator.ts       @Roles('admin') for gateway-level role check
├── middleware/
│   └── correlation-id.middleware.ts generate/forward x-correlation-id
└── health/health.controller.ts
```

## Key constraints

- JWT verified locally with `JWT_PUBLIC_KEY` (PEM) — never call auth-service per request
- Strip `Authorization` header before forwarding; inject `x-user-id`, `x-user-roles`
- Rate limiting: global 100/60s, auth endpoints 10/60s (use `@nestjs/throttler`)
- CORS: `CORS_ORIGINS` env var, comma-separated whitelist
- Upstream timeout: `UPSTREAM_TIMEOUT_MS` (default 10 000 ms) → 504 on breach
- No Prisma, no RabbitMQ — zero infra deps beyond HTTP

## Route table (see docs/02-services/api-gateway/02-routing-table.md)

Public (no JWT): POST /auth/register|login|refresh, GET /products, GET /products/:id
Authenticated: everything else
Admin-only at gateway: POST|PUT|DELETE /products, POST /products/:id/stock

## Acceptance criteria

- Request with expired JWT → 401 INVALID_TOKEN
- Request to admin route with customer role → 403 FORBIDDEN
- Rate limit exceeded → 429 RATE_LIMIT_EXCEEDED
- x-correlation-id present on every response
- Upstream timeout → 504 UPSTREAM_TIMEOUT
