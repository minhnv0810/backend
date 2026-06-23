# auth-service — Overview

## Responsibility

The system of record for **identity**. Owns users, credentials, roles, and the issuance/lifecycle
of JWT access & refresh tokens. It is the only service that can mint tokens.

## Owns

- Users and their profile basics (email, display name, status).
- Password credentials (hashed).
- Roles and the user↔role assignment.
- Refresh tokens (hashed, with rotation + revocation).

## Does NOT own

- Orders, products, payments — those are other services.
- Rich user profile / preferences (could become a separate `profile-service` later).

## Key capabilities

| Capability            | Sync API                         | Emits event        |
| --------------------- | -------------------------------- | ------------------ |
| Register              | `POST /auth/register`            | `user.registered`  |
| Login                 | `POST /auth/login`               | `user.logged_in`   |
| Refresh tokens        | `POST /auth/refresh`             | —                  |
| Logout                | `POST /auth/logout`              | —                  |
| Get current user      | `GET /auth/me`                   | —                  |
| (admin) Manage roles  | `POST /auth/users/:id/roles`     | —                  |

## Dependencies

- **Postgres** `auth_db`.
- **RabbitMQ** — publishes identity events (no consumption in Phase 1).
- **JWT signing key** (private) from config/secret store.

## Non-functional notes

- Login is rate-limited and protected against brute force (lockout/backoff).
- Stateless except for refresh-token storage; horizontally scalable.
- Token verification elsewhere uses the **public** key — auth-service is not on the hot path for
  every request.

Related: [API](02-api-spec.md) · [DB Schema](03-db-schema.md) · [Flows](04-flows.md) · [Events](05-events.md) · [Security](../../01-architecture/09-security.md)
