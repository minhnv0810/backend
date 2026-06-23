# auth-service — Phase 1

**Scope**: Registration, login, refresh, logout, JWT RS256 key pair management.

## Files to implement

```
src/
├── main.ts                          ✓ done (port 3001)
├── app/
│   └── app.module.ts                wire all modules
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts           POST /auth/register|login|refresh|logout, GET /auth/me
│   ├── auth.service.ts              business logic
│   ├── auth.repository.ts           Prisma data access
│   ├── dto/
│   │   ├── register.dto.ts
│   │   ├── login.dto.ts
│   │   └── refresh.dto.ts
│   ├── guards/
│   │   └── jwt.guard.ts             local guard (not the shared @app/auth one)
│   └── strategies/
│       └── jwt.strategy.ts          RS256 verify strategy
└── health/
    └── health.controller.ts         GET /health/live, /health/ready
```

## Prisma schema (auth_db)

Located at `apps/auth-service/prisma/schema.prisma`. Key tables:
- `users` (id, email, display_name, failed_attempts, locked_until, created_at)
- `credentials` (id PK, user_id FK, password_hash argon2id, updated_at)
- `user_roles` (user_id FK, role)
- `refresh_tokens` (id, user_id FK, token_hash, family, revoked, expires_at)
- `processed_events` (event_id PK, processed_at)
- `outbox` (id, event_type, payload, published, created_at)

## Key constraints

- Password: argon2id hash, min 8 chars, policy enforced in service
- Access token: RS256, 15 min TTL, claims: sub/email/roles/iss/aud/jti
- Refresh token: 7 days, stored hashed, family-based reuse detection
- Login failure: increment `failed_attempts`; lock after 5 attempts (423 ACCOUNT_LOCKED)
- Outbox: `user.registered` and `user.logged_in` written in same tx as state change
- Idempotency: `processed_events` dedupes by eventId

## Env vars needed

See `.env.example`. Mandatory: `DATABASE_URL`, `JWT_PRIVATE_KEY`, `JWT_PUBLIC_KEY`.

## Acceptance criteria

- `POST /auth/register` → 201, writes user+credential+role+outbox in one tx
- `POST /auth/login` → 200 with accessToken+refreshToken; 401 on wrong pass; 423 on locked
- `POST /auth/refresh` → rotates token, detects reuse → revokes family
- `POST /auth/logout` → revokes refresh token
- `GET /auth/me` → returns user info from JWT (no DB call)
- Unit tests ≥ 80% branch coverage on `auth.service.ts`
- Integration test: full register→login→refresh→logout flow with real Postgres
