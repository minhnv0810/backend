# auth-service — API Spec

Base path (via gateway): `/api/v1/auth`. All responses use the standard envelope
(see [Error Handling](../../01-architecture/07-error-handling.md)).

## POST /auth/register

Create a new user with the `customer` role.

```jsonc
// request
{ "email": "jane@example.com", "password": "S3cure!pass", "displayName": "Jane" }
// 201
{ "data": { "userId": "uuid", "email": "jane@example.com", "displayName": "Jane",
            "roles": ["customer"] }, "meta": { "correlationId": "..." } }
```
Errors: `409 EMAIL_ALREADY_EXISTS`, `400 VALIDATION_FAILED`.
Side effect: emits `user.registered`.

## POST /auth/login

```jsonc
// request
{ "email": "jane@example.com", "password": "S3cure!pass" }
// 200
{ "data": { "accessToken": "jwt", "refreshToken": "jwt", "expiresIn": 900 },
  "meta": { "correlationId": "..." } }
```
Errors: `401 INVALID_CREDENTIALS`, `423 ACCOUNT_LOCKED`, `429 RATE_LIMITED`.
Side effect: emits `user.logged_in`.

## POST /auth/refresh

Exchange a valid refresh token for a new pair (rotates the refresh token).

```jsonc
// request
{ "refreshToken": "jwt" }
// 200
{ "data": { "accessToken": "jwt", "refreshToken": "jwt", "expiresIn": 900 } }
```
Errors: `401 INVALID_REFRESH_TOKEN` (also triggered by reuse of a rotated token → revoke family).

## POST /auth/logout

Revoke the current refresh token.

```jsonc
// request
{ "refreshToken": "jwt" }
// 204 (no content)
```

## GET /auth/me  🔒

Requires a valid access token. Returns the authenticated user.

```jsonc
// 200
{ "data": { "userId": "uuid", "email": "...", "displayName": "...", "roles": ["customer"] } }
```
Errors: `401 UNAUTHENTICATED`.

## POST /auth/users/:id/roles  🔒 admin

Assign/revoke roles. Requires `admin`.

```jsonc
// request
{ "roles": ["customer", "admin"] }
// 200
{ "data": { "userId": "uuid", "roles": ["customer", "admin"] } }
```
Errors: `403 FORBIDDEN`, `404 USER_NOT_FOUND`.

## Internal verification endpoint (optional)

`GET /auth/.well-known/jwks.json` — public key(s) for JWT verification, so the gateway and other
services can verify tokens without a shared secret.

## OpenAPI

Each service serves Swagger UI at `/docs` (non-prod). DTOs are generated from the
`class-validator`-decorated classes that re-export shapes from `@app/contracts`.
