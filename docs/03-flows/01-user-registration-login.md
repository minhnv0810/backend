# Flow 01 — Registration & Login

End-to-end identity flow across gateway and auth-service. Service-local detail lives in
[auth flows](../02-services/auth/04-flows.md); this is the cross-service view.

## Happy path: register then login

```mermaid
sequenceDiagram
    autonumber
    participant C as Client
    participant G as API Gateway
    participant A as auth-service
    participant DB as auth_db
    participant MQ as RabbitMQ
    participant N as notification (later)

    C->>G: POST /api/v1/auth/register
    G->>G: rate limit, attach x-correlation-id
    G->>A: forward
    A->>DB: create user + credential + role (tx) + outbox(user.registered)
    A-->>C: 201 {userId, email, roles}
    A->>MQ: user.registered
    MQ-->>N: welcome email (later)

    C->>G: POST /api/v1/auth/login
    G->>A: forward
    A->>DB: verify password, store hashed refresh token
    A-->>C: 200 {accessToken(15m), refreshToken(7d)}

    C->>G: GET /api/v1/products (Bearer access)
    G->>G: verify JWT locally (public key) -> x-user-id, x-user-roles
    G->>+product: forward
    product-->>-G: 200 catalog
    G-->>C: 200 catalog
```

## Token lifecycle

```mermaid
sequenceDiagram
    participant C as Client
    participant G as Gateway
    participant A as auth-service

    Note over C: access token expires (15m)
    C->>G: request with expired token
    G-->>C: 401 UNAUTHENTICATED
    C->>A: POST /auth/refresh {refreshToken}
    A-->>C: 200 new {access, refresh} (rotated)
    C->>G: retry original request
```

## Failure cases

| Case                       | Where        | Result                                  |
| -------------------------- | ------------ | --------------------------------------- |
| Duplicate email            | auth-service | `409 EMAIL_ALREADY_EXISTS`              |
| Wrong password             | auth-service | `401 INVALID_CREDENTIALS` (+ attempt++) |
| Too many attempts          | auth-service | `423 ACCOUNT_LOCKED`                    |
| Expired access token       | gateway      | `401 UNAUTHENTICATED` → client refreshes|
| Reused/revoked refresh     | auth-service | `401` + revoke token family             |
| Login flood                | gateway      | `429 RATE_LIMITED`                      |
