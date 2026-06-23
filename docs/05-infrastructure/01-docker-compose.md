# 01 — docker-compose (Local)

Two compose files for different developer needs.

## Files

| File                           | Purpose                                               |
| ------------------------------ | ----------------------------------------------------- |
| `docker-compose.yml`           | Full stack — all services + infra. One command start. |
| `docker-compose.infra.yml`     | Infra only (Postgres, RabbitMQ). Run services on host for faster dev. |

## docker-compose.yml (full stack)

```yaml
version: "3.9"

x-service-defaults: &service-defaults
  restart: unless-stopped
  networks: [app-net]
  depends_on:
    postgres: { condition: service_healthy }
    rabbitmq: { condition: service_healthy }

services:
  # ── Infrastructure ──────────────────────────────────────────────
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_MULTIPLE_DATABASES: auth_db,product_db,orders_db
    volumes:
      - pg_data:/var/lib/postgresql/data
      - ./docker/pg-init-dbs.sh:/docker-entrypoint-initdb.d/init.sh
    ports: ["5432:5432"]
    networks: [app-net]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      retries: 5

  rabbitmq:
    image: rabbitmq:3.13-management-alpine
    environment:
      RABBITMQ_DEFAULT_USER: rabbit
      RABBITMQ_DEFAULT_PASS: rabbit
    ports:
      - "5672:5672"
      - "15672:15672"   # management UI
    volumes: [rmq_data:/var/lib/rabbitmq]
    networks: [app-net]
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "ping"]
      interval: 10s
      retries: 5

  # ── Services ────────────────────────────────────────────────────
  api-gateway:
    <<: *service-defaults
    build: { context: ., dockerfile: docker/Dockerfile, target: production, args: { SERVICE: api-gateway } }
    ports: ["3000:3000"]
    env_file: ./apps/api-gateway/.env.docker
    depends_on: [auth-service, product-service, orders-service]

  auth-service:
    <<: *service-defaults
    build: { context: ., dockerfile: docker/Dockerfile, target: production, args: { SERVICE: auth-service } }
    ports: ["3001:3001"]
    env_file: ./apps/auth-service/.env.docker

  product-service:
    <<: *service-defaults
    build: { context: ., dockerfile: docker/Dockerfile, target: production, args: { SERVICE: product-service } }
    ports: ["3002:3002"]
    env_file: ./apps/product-service/.env.docker

  orders-service:
    <<: *service-defaults
    build: { context: ., dockerfile: docker/Dockerfile, target: production, args: { SERVICE: orders-service } }
    ports: ["3003:3003"]
    env_file: ./apps/orders-service/.env.docker
    depends_on: [postgres, rabbitmq, product-service]

volumes:
  pg_data:
  rmq_data:

networks:
  app-net:
    driver: bridge
```

## docker-compose.infra.yml (infra only)

For day-to-day development — run infra in Docker, services via `nx serve`:

```yaml
version: "3.9"
services:
  postgres:
    # same as above
  rabbitmq:
    # same as above
networks:
  app-net:
    driver: bridge
```

Usage:

```bash
docker compose -f docker-compose.infra.yml up -d
# then in separate terminals:
nx serve auth-service
nx serve product-service
nx serve orders-service
nx serve api-gateway
```

## Multi-database init script

`docker/pg-init-dbs.sh` — creates each service's DB if it doesn't exist:

```bash
#!/bin/bash
set -e
for db in auth_db product_db orders_db; do
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    SELECT 'CREATE DATABASE $db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$db')\gexec
  EOSQL
done
```

## Multi-stage Dockerfile

`docker/Dockerfile` — one file for all services, parameterized by `--build-arg SERVICE`:

```dockerfile
# ── Base ──────────────────────────────────────────────────────────
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ── Build ─────────────────────────────────────────────────────────
FROM base AS build
ARG SERVICE
COPY . .
RUN pnpm nx build $SERVICE --configuration=production

# ── Production ────────────────────────────────────────────────────
FROM node:20-alpine AS production
ARG SERVICE
WORKDIR /app
COPY --from=build /app/dist/apps/$SERVICE ./
COPY --from=build /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node main.js"]
```

## Common commands

```bash
# First boot
docker compose up --build

# Tail logs for one service
docker compose logs -f orders-service

# Run migrations manually
docker compose exec orders-service npx prisma migrate deploy

# Open RabbitMQ management UI
open http://localhost:15672   # rabbit / rabbit
```
