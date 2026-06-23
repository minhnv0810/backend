# api-gateway — Routing Table

## Path → upstream map

| Method   | Gateway path                         | Upstream service   | Auth required | Roles    |
| -------- | ------------------------------------ | ------------------ | ------------- | -------- |
| POST     | `/api/v1/auth/register`              | auth-service       | No            | —        |
| POST     | `/api/v1/auth/login`                 | auth-service       | No            | —        |
| POST     | `/api/v1/auth/refresh`               | auth-service       | No            | —        |
| POST     | `/api/v1/auth/logout`                | auth-service       | Yes           | any      |
| GET      | `/api/v1/auth/me`                    | auth-service       | Yes           | any      |
| GET      | `/api/v1/products`                   | product-service    | No            | —        |
| GET      | `/api/v1/products/:id`               | product-service    | No            | —        |
| POST     | `/api/v1/products`                   | product-service    | Yes           | admin    |
| PUT      | `/api/v1/products/:id`               | product-service    | Yes           | admin    |
| DELETE   | `/api/v1/products/:id`               | product-service    | Yes           | admin    |
| GET      | `/api/v1/products/:id/categories`    | product-service    | No            | —        |
| POST     | `/api/v1/products/:id/stock`         | product-service    | Yes           | admin    |
| POST     | `/api/v1/products/availability`      | product-service    | Yes           | any      |
| GET      | `/api/v1/orders`                     | orders-service     | Yes           | any      |
| GET      | `/api/v1/orders/:id`                 | orders-service     | Yes           | any      |
| POST     | `/api/v1/orders`                     | orders-service     | Yes           | customer |
| POST     | `/api/v1/orders/:id/cancel`          | orders-service     | Yes           | any      |
| GET      | `/api/v1/health`                     | gateway (own)      | No            | —        |
| GET      | `/health/live`                       | gateway (own)      | No            | —        |
| GET      | `/health/ready`                      | gateway (own)      | No            | —        |

> "any" = any authenticated user. Role enforcement beyond gateway-level (`customer`/`admin`) is done
> inside the upstream service using `x-user-roles`; the gateway only short-circuits requests where
> a specific role is **required at the gateway**.

## Role enforcement at the gateway

The gateway rejects requests to admin routes if `roles` claim in the JWT does not include `admin`.
This is a fast-fail — the upstream service still applies its own `RolesGuard` as a second check.

```
JWT roles: ["customer"]  +  POST /api/v1/products  →  403 FORBIDDEN (at gateway)
JWT roles: ["admin"]     +  POST /api/v1/products  →  forwarded to product-service
```

## Headers the gateway injects

| Header              | Value                                        | Notes                              |
| ------------------- | -------------------------------------------- | ---------------------------------- |
| `x-user-id`         | `sub` claim from JWT                         | Only on authenticated requests     |
| `x-user-roles`      | `roles` claim joined as comma-separated string | Only on authenticated requests   |
| `x-correlation-id`  | Forwarded from client or generated (uuid v4) | Always present                     |

## Headers the gateway strips

| Header          | Reason                                           |
| --------------- | ------------------------------------------------ |
| `Authorization` | Services must not see raw tokens; identity is forwarded via x-headers |

## Headers forwarded unchanged

All other request headers pass through. Upstream services receive the full original headers minus
`Authorization`, plus the injected `x-*` headers above.

## Upstream URL resolution

Upstream base URLs are configured via env vars (see [Config](03-config.md)). The path after the
version prefix is forwarded verbatim:

```
GET /api/v1/products?page=1&limit=20
  → GET http://product-service:3002/products?page=1&limit=20
```

The gateway strips `/api/v1` and proxies the remainder. The upstream service receives the request
**as if it were called directly** on its own router.

## Error responses from the gateway itself

These are produced by the gateway before reaching any upstream service:

| Scenario                                     | Status | Code                    |
| -------------------------------------------- | ------ | ----------------------- |
| Missing / malformed `Authorization` header   | 401    | `UNAUTHORIZED`          |
| Invalid JWT signature or expired token       | 401    | `INVALID_TOKEN`         |
| JWT issued for wrong audience / issuer       | 401    | `INVALID_TOKEN`         |
| Route requires role the user does not have   | 403    | `FORBIDDEN`             |
| Rate limit exceeded                          | 429    | `RATE_LIMIT_EXCEEDED`   |
| Upstream timeout (> 10 s)                    | 504    | `UPSTREAM_TIMEOUT`      |
| Upstream connection refused / unreachable    | 503    | `DEPENDENCY_UNAVAILABLE`|

All errors follow the standard envelope:
```jsonc
{ "error": { "code": "INVALID_TOKEN", "message": "..." }, "meta": { "correlationId": "..." } }
```
