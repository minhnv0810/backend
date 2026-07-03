# ── Base ──────────────────────────────────────────────────────────────
FROM node:22-alpine AS base
RUN apk add --no-cache openssl
RUN corepack enable && corepack prepare pnpm@11.1.3 --activate
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ── Build ─────────────────────────────────────────────────────────────
FROM base AS build
ARG SERVICE
ENV CI=true
COPY . .
# Regenerate Prisma client inside Alpine so the linux-musl binary is produced
RUN [ -d "apps/$SERVICE/prisma" ] && pnpm exec prisma generate --schema=apps/$SERVICE/prisma/schema.prisma || true
RUN pnpm nx build $SERVICE --configuration=production
# Copy prisma schema into dist
RUN [ -d "apps/$SERVICE/prisma" ] && cp -r apps/$SERVICE/prisma dist/apps/$SERVICE/ || true
# Copy engine binary to the path the bundled client resolves at runtime:
#   process.cwd()/apps/<service>/src/generated/prisma/
RUN if [ -d "apps/$SERVICE/src/generated/prisma" ]; then \
  mkdir -p dist/apps/$SERVICE/apps/$SERVICE/src/generated/prisma && \
  find apps/$SERVICE/src/generated/prisma -name "*.node" \
    -exec cp {} dist/apps/$SERVICE/apps/$SERVICE/src/generated/prisma/ \; ; \
fi

# ── Production ────────────────────────────────────────────────────────
FROM node:22-alpine AS production
RUN apk add --no-cache openssl
ARG SERVICE
WORKDIR /app
COPY --from=build /app/dist/apps/$SERVICE ./
COPY --from=build /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3000
CMD ["sh", "-c", "[ -f ./prisma/schema.prisma ] && npx prisma migrate deploy; node main.js"]
