# 02 — E2E Test Plan

Full end-to-end tests that boot the complete stack and exercise primary journeys through the API
Gateway exactly as a real client would.

## Setup

Location: `apps/e2e/`

```
apps/e2e/
  src/
    helpers/
      app.helper.ts    # boot all services via Testcontainers
      auth.helper.ts   # register + login helper
    journeys/
      01-registration.e2e-spec.ts
      02-product-catalog.e2e-spec.ts
      03-place-order.e2e-spec.ts
      04-cancel-order.e2e-spec.ts
      05-admin-manage-products.e2e-spec.ts
  jest.e2e.config.ts
```

Environment: Testcontainers boots Postgres + RabbitMQ; all NestJS apps start in-process (or via
`docker-compose up --wait` in CI). Gateway listens on an ephemeral port; tests hold that reference.

## Journey 01 — Registration & Login

```
✅ Register a new customer  → 201, userId returned
✅ Duplicate email          → 409 EMAIL_ALREADY_EXISTS
✅ Missing fields           → 400 VALIDATION_FAILED
✅ Login with correct creds → 200, accessToken + refreshToken
✅ Login with wrong password → 401 INVALID_CREDENTIALS
✅ Access protected endpoint with valid token → 200
✅ Access protected endpoint without token   → 401
✅ Refresh token → new pair issued
✅ Reuse rotated refresh token → 401 + family revoked
```

## Journey 02 — Product Catalog

```
✅ Admin creates product        → 201
✅ Admin creates duplicate SKU  → 409
✅ Customer lists products      → paginated catalog
✅ Customer gets product by id  → detail
✅ Get non-existent product     → 404
✅ Admin adjusts stock (+)      → stock_view updated
✅ Admin adjusts stock beyond zero → 422
✅ Customer (non-admin) tries to create product → 403
✅ product.created event consumed by orders-service (snapshot upserted)
✅ product.stock_changed consumed by orders-service (snapshot updated)
```

## Journey 03 — Place Order (the golden path)

```
✅ Customer places order with available items
     → 201 {PENDING}; order.created published
✅ Orders product snapshot has current prices after product.updated
✅ Place order with out-of-stock item         → 422 INSUFFICIENT_STOCK
✅ Place order with unknown productId         → 422
✅ Place order not authenticated              → 401
✅ Double-submit with same idempotencyKey     → returns original order, not duplicate
✅ product-service down (circuit breaker open) → 503 DEPENDENCY_UNAVAILABLE
✅ order.cancelled consumed by product-service → stock released
```

## Journey 04 — Cancel Order

```
✅ Customer cancels own PENDING order   → 200 CANCELLED; order.cancelled published
✅ Customer cancels another user's order → 403
✅ Customer cancels CONFIRMED order (if allowed in Phase 1)
✅ Cancel already-cancelled order       → 409 INVALID_ORDER_STATE
✅ Cancel triggers stock release (verify product snapshot stock_view incremented)
```

## Journey 05 — Admin Operations

```
✅ Admin lists all orders (with ?userId filter)
✅ Admin manually confirms a PENDING order (Phase 1 flow) → CONFIRMED; order.confirmed published
✅ Admin creates + updates product categories
✅ Non-admin cannot access admin routes → 403
```

## Event assertions in E2E

For event-driven flows (e.g. stock snapshot update), tests wait for the eventual side effect with
a poll helper:

```ts
// wait up to 5s for the snapshot to reflect the new stock
await waitUntil(
  () => ordersService.getProductSnapshot(productId),
  snapshot => snapshot.stockView === expectedStock,
  { timeout: 5000, interval: 200 }
);
```

Alternatively subscribe to the queue directly in the test to assert the event was published.

## What E2E tests do NOT cover

- Payment saga (no payment-service in Phase 1; covered by unit/integration tests using
  `payment.succeeded` fixture events).
- Notification dispatch (no provider in test; asserted at contract level).
- Performance / load (separate concern, not in E2E suite).

## Running E2E locally

```bash
# using Testcontainers (boots real infra automatically)
nx e2e e2e

# using docker-compose (faster after first build)
docker compose up -d
nx e2e e2e --skip-infra
```

## CI gates

The E2E suite runs on every PR and must pass before merge. Flaky tests are quarantined (tagged
`@flaky`) and triaged within the sprint.
