# 02 — Environments & Config

## Environments

| Env          | Purpose                          | How started                          |
| ------------ | -------------------------------- | ------------------------------------ |
| `local`      | Individual dev machine           | `nx serve` + infra via docker-compose |
| `test`       | Automated tests (CI + local)     | Testcontainers spun up per test suite |
| `staging`    | Pre-prod integration (later)     | Docker / K8s with staging secrets    |
| `production` | Live (later)                     | K8s with sealed secrets / Vault      |

## Config approach

Each service uses **`@nestjs/config` + Zod validation** via `@app/config`. The app refuses to
start if required env vars are missing or of wrong type — no silent misconfiguration.

```ts
// libs/config/src/schemas/common.ts
import { z } from 'zod';

export const CommonConfigSchema = z.object({
  NODE_ENV: z.enum(['local', 'test', 'staging', 'production']).default('local'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  RABBITMQ_URL: z.string().url(),
  CORRELATION_ID_HEADER: z.string().default('x-correlation-id'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

// apps/auth-service adds:
export const AuthConfigSchema = CommonConfigSchema.extend({
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  BCRYPT_ROUNDS: z.coerce.number().default(12),
  RATE_LIMIT_LOGIN_PER_MINUTE: z.coerce.number().default(10),
});
```

## Env file convention

| File                         | Committed? | Purpose                                      |
| ---------------------------- | ---------- | -------------------------------------------- |
| `.env.example`               | YES        | Template with all keys, dummy values         |
| `.env.local`                 | NO         | Dev overrides, gitignored                    |
| `.env.docker`                | NO         | Values passed to docker-compose containers   |
| `.env.test`                  | YES (safe) | Test-time defaults (non-secret values only)  |

**Never commit real secrets.** `.gitignore` blocks `*.env.local`, `.env.docker`.

## Per-service env vars

### All services (common)

```bash
NODE_ENV=local
PORT=3001                    # adjusted per service
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/auth_db
RABBITMQ_URL=amqp://rabbit:rabbit@localhost:5672
LOG_LEVEL=debug
```

### auth-service

```bash
JWT_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n..."
JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\n..."
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
RATE_LIMIT_LOGIN_PER_MINUTE=10
```

### api-gateway

```bash
PORT=3000
AUTH_SERVICE_URL=http://auth-service:3001
PRODUCT_SERVICE_URL=http://product-service:3002
ORDERS_SERVICE_URL=http://orders-service:3003
JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\n..."
RATE_LIMIT_PER_MINUTE=100
ALLOWED_ORIGINS=http://localhost:4200,https://myapp.com
```

### product-service

```bash
PORT=3002
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/product_db
RABBITMQ_URL=amqp://rabbit:rabbit@localhost:5672
```

### orders-service

```bash
PORT=3003
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/orders_db
RABBITMQ_URL=amqp://rabbit:rabbit@localhost:5672
PRODUCT_SERVICE_URL=http://product-service:3002
PRODUCT_AVAILABILITY_TIMEOUT_MS=3000
PRODUCT_CIRCUIT_BREAKER_THRESHOLD=5
```

## Key generation (JWT RS256)

```bash
# generate RSA key pair once; store securely (not in git)
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem

# in .env.local use the PEM files; in docker/K8s use secrets
JWT_PRIVATE_KEY=$(cat private.pem)
JWT_PUBLIC_KEY=$(cat public.pem)
```

## Secret management — later

| Phase   | Secret store                                     |
| ------- | ------------------------------------------------ |
| Local   | `.env.local` files (gitignored)                  |
| CI      | GitHub Actions Secrets / environment variables   |
| Staging/Prod | Kubernetes Secrets sealed with Sealed Secrets or HashiCorp Vault |
