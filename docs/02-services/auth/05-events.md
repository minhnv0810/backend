# auth-service — Events

## Publishes

| Routing key       | When                          | Payload (key fields)                      |
| ----------------- | ----------------------------- | ----------------------------------------- |
| `user.registered` | After a user is created       | `userId`, `email`, `displayName`          |
| `user.logged_in`  | After a successful login      | `userId`, `at`, `userAgent?`, `ip?`       |

```jsonc
// user.registered (envelope fields omitted for brevity)
{ "userId": "uuid", "email": "jane@example.com", "displayName": "Jane" }

// user.logged_in
{ "userId": "uuid", "at": "2026-06-23T10:00:00Z", "userAgent": "...", "ip": "203.0.113.10" }
```

Both are published via the **outbox** (written in the same transaction as the state change) — see
[Error Handling](../../01-architecture/07-error-handling.md).

## Consumes

None in Phase 1.

## Future consumers of these events

- `notification-service` (later): `user.registered` → welcome email.
- analytics/audit (later): `user.logged_in` → security/audit trail.

> Because publishing is decoupled, adding those consumers later requires **no change** to
> auth-service.
