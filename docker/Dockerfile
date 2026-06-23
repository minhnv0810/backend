# ── Base ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ── Build ─────────────────────────────────────────────────────────────
FROM base AS build
ARG SERVICE
COPY . .
RUN pnpm nx build $SERVICE --configuration=production

# ── Production ────────────────────────────────────────────────────────
FROM node:20-alpine AS production
ARG SERVICE
WORKDIR /app
COPY --from=build /app/dist/apps/$SERVICE ./
COPY --from=build /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node main.js"]
