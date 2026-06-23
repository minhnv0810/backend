# orders-service — API Spec

Base path: `/api/v1/orders`. All routes require authentication. A user may only access their own
orders (ownership check on `x-user-id`); `admin` may access any.

## POST /orders  🔒

Place an order. The server validates availability and price with product-service, snapshots prices,
and creates the order.

```jsonc
// request
{ "items": [ { "productId":"uuid","quantity":2 } ],
  "idempotencyKey":"client-uuid" }          // optional, dedupes double-submit
// 201
{ "data": { "orderId":"uuid","status":"PENDING",
            "items":[{"productId":"uuid","name":"Widget","quantity":2,
                      "unitPrice":"19.99","lineTotal":"39.98"}],
            "totalAmount":"39.98","currency":"USD","createdAt":"..." } }
```
Errors:
- `422 INSUFFICIENT_STOCK` — one or more items unavailable (details list per item).
- `422 PRICE_CHANGED` — snapshot price differs from client expectation (if client sent expected price).
- `400 EMPTY_ORDER` / `VALIDATION_FAILED`.
- `503 DEPENDENCY_UNAVAILABLE` — product-service unreachable (circuit open).

Side effect: emits `order.created`.

## GET /orders/:id  🔒

```jsonc
// 200 -> order with items and status
```
Errors: `404 ORDER_NOT_FOUND`, `403 FORBIDDEN` (not owner / not admin).

## GET /orders  🔒

List the caller's orders (admin: all, with `?userId=` filter). Paginated.

Query: `?page=1&limit=20&status=PENDING&sort=createdAt:desc`

## POST /orders/:id/cancel  🔒

Cancel an order if its current state allows it.

```jsonc
// request
{ "reason": "changed_mind" }
// 200 -> { "data": { "orderId":"uuid","status":"CANCELLED" } }
```
Errors: `409 INVALID_ORDER_STATE` (e.g. already completed), `404 ORDER_NOT_FOUND`, `403 FORBIDDEN`.
Side effect: emits `order.cancelled` (product-service releases stock; payment refunds later).

## (admin) POST /orders/:id/confirm  🔒 admin

Phase-1 manual confirm path (replaced by `payment.succeeded` once payment exists).
Emits `order.confirmed`. Errors: `409 INVALID_ORDER_STATE`.

## Idempotency

`POST /orders` honors an optional `idempotencyKey`. Repeated requests with the same key + user
return the original order instead of creating a duplicate (stored in an `idempotency_keys` table).
