# api-gateway — Config & Env

## Environment variables

| Variable                  | Required | Example                              | Notes                                         |
| ------------------------- | -------- | ------------------------------------ | --------------------------------------------- |
| `NODE_ENV`                | Yes      | `production`                         | —                                             |
| `PORT`                    | Yes      | `3000`                               | Listening port                                |
| `JWT_PUBLIC_KEY`          | Yes      | `-----BEGIN PUBLIC KEY-----\n...`    | RS256 PEM, used to verify access tokens       |
| `JWT_AUDIENCE`            | Yes      | `ecommerce-api`                      | Must match `aud` claim in token               |
| `JWT_ISSUER`              | Yes      | `auth-service`                       | Must match `iss` claim in token               |
| `AUTH_SERVICE_URL`        | Yes      | `http://auth-service:3001`           | Upstream base URL                             |
| `PRODUCT_SERVICE_URL`     | Yes      | `http://product-service:3002`        | Upstream base URL                             |
| `ORDERS_SERVICE_URL`      | Yes      | `http://orders-service:3003`         | Upstream base URL                             |
| `UPSTREAM_TIMEOUT_MS`     | No       | `10000`                              | Default 10 000 ms; returns 504 if exceeded    |
| `CORS_ORIGINS`            | Yes      | `http://localhost:4200,https://app.example.com` | Comma-separated allowed origins     |
| `THROTTLE_GLOBAL_LIMIT`   | No       | `100`                                | Max requests per TTL window, global           |
| `THROTTLE_GLOBAL_TTL_MS`  | No       | `60000`                              | TTL window in ms for global limit             |
| `THROTTLE_AUTH_LIMIT`     | No       | `10`                                 | Max requests per TTL window, auth endpoints   |
| `THROTTLE_AUTH_TTL_MS`    | No       | `60000`                              | TTL window in ms for auth limit               |
| `LOG_LEVEL`               | No       | `info`                               | pino log level                                |

### Generating the RS256 key pair (auth-service generates; gateway consumes public key)

```bash
# Generate private key (keep in auth-service only)
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out private.pem

# Extract public key (use in gateway)
openssl rsa -pubout -in private.pem -out public.pem

# In .env — collapse newlines to \n literal
JWT_PUBLIC_KEY="$(awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' public.pem)"
```

## `.env.example`

```dotenv
NODE_ENV=development
PORT=3000

# RS256 public key (PEM, newlines as \n)
JWT_PUBLIC_KEY=
JWT_AUDIENCE=ecommerce-api
JWT_ISSUER=auth-service

# Upstream services (host.docker.internal for local-host dev, service name for compose)
AUTH_SERVICE_URL=http://localhost:3001
PRODUCT_SERVICE_URL=http://localhost:3002
ORDERS_SERVICE_URL=http://localhost:3003

# Timeouts
UPSTREAM_TIMEOUT_MS=10000

# CORS — comma-separated origins
CORS_ORIGINS=http://localhost:4200

# Rate limiting
THROTTLE_GLOBAL_LIMIT=100
THROTTLE_GLOBAL_TTL_MS=60000
THROTTLE_AUTH_LIMIT=10
THROTTLE_AUTH_TTL_MS=60000

LOG_LEVEL=debug
```

## Zod config schema

```ts
// libs/config/src/gateway.config.ts
import { z } from 'zod';

export const gatewayConfigSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number().default(3000),

  JWT_PUBLIC_KEY: z.string().min(1),
  JWT_AUDIENCE: z.string().default('ecommerce-api'),
  JWT_ISSUER: z.string().default('auth-service'),

  AUTH_SERVICE_URL: z.string().url(),
  PRODUCT_SERVICE_URL: z.string().url(),
  ORDERS_SERVICE_URL: z.string().url(),

  UPSTREAM_TIMEOUT_MS: z.coerce.number().default(10_000),
  CORS_ORIGINS: z.string().transform(s => s.split(',')),

  THROTTLE_GLOBAL_LIMIT: z.coerce.number().default(100),
  THROTTLE_GLOBAL_TTL_MS: z.coerce.number().default(60_000),
  THROTTLE_AUTH_LIMIT: z.coerce.number().default(10),
  THROTTLE_AUTH_TTL_MS: z.coerce.number().default(60_000),

  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
});

export type GatewayConfig = z.infer<typeof gatewayConfigSchema>;
```

Config is validated at process boot via `@app/config`. If any required variable is missing or
invalid the service **refuses to start** and logs a structured error listing all violations.

## Rate limiting behaviour

Two throttle buckets, keyed by **client IP**:

| Bucket   | Limit          | Applies to                                |
| -------- | -------------- | ----------------------------------------- |
| `global` | 100 req / 60 s | All routes not in another bucket          |
| `auth`   | 10 req / 60 s  | `/api/v1/auth/login`, `/api/v1/auth/register`, `/api/v1/auth/refresh` |

Response when exceeded:
```
HTTP 429 Too Many Requests
Retry-After: <seconds>
{ "error": { "code": "RATE_LIMIT_EXCEEDED", "message": "Too many requests" }, "meta": {...} }
```

## CORS policy

```ts
app.enableCors({
  origin: config.CORS_ORIGINS,   // from env — whitelist only
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-correlation-id', 'x-idempotency-key'],
  exposedHeaders: ['x-correlation-id'],
  credentials: true,
  maxAge: 86_400,                // preflight cache 24 h
});
```

In production, `CORS_ORIGINS` must be set explicitly — `*` is not accepted.

## Security headers (helmet)

Applied globally in `main.ts`. Defaults plus:

| Header                    | Value                           |
| ------------------------- | ------------------------------- |
| `X-Frame-Options`         | `DENY`                          |
| `X-Content-Type-Options`  | `nosniff`                       |
| `Strict-Transport-Security`| `max-age=31536000; includeSubDomains` (production only) |
| `Content-Security-Policy` | `default-src 'none'` (API-only, no HTML served) |
