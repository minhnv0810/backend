# ── Base ──────────────────────────────────────────────────────────────
FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@11.1.3 --activate
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ── Build ─────────────────────────────────────────────────────────────
FROM base AS build
ARG SERVICE
ENV CI=true
COPY . .
RUN pnpm nx build $SERVICE --configuration=production
# Copy prisma schema into dist so production stage can pick it up (no-op for services without prisma)
RUN [ -d "apps/$SERVICE/prisma" ] && cp -r apps/$SERVICE/prisma dist/apps/$SERVICE/ || true

# ── Production ────────────────────────────────────────────────────────
FROM node:22-alpine AS production
ARG SERVICE
WORKDIR /app
COPY --from=build /app/dist/apps/$SERVICE ./
COPY --from=build /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3000
CMD ["sh", "-c", "[ -f ./prisma/schema.prisma ] && npx prisma migrate deploy; node main.js"]
