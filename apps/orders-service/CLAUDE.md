# orders-service — Phase 1

**Scope**: Order lifecycle (PENDING → CONFIRMED → COMPLETED | CANCELLED), product snapshot read model, idempotency.

## Files to implement

```
src/
├── main.ts                          ✓ done (port 3003)
├── app/app.module.ts
├── orders/
│   ├── orders.module.ts
│   ├── orders.controller.ts         GET /orders, GET /orders/:id, POST /orders, POST /orders/:id/cancel
│   ├── orders.service.ts
│   ├── orders.repository.ts
│   ├── dto/
│   │   ├── create-order.dto.ts      { items: [{productId, quantity}], idempotencyKey }
│   │   └── cancel-order.dto.ts
│   └── events/
│       ├── orders.publisher.ts      publishes order.created, order.confirmed, order.cancelled
│       └── orders.consumer.ts       consumes product.* (snapshot sync), order.cancelled (stock release)
└── health/health.controller.ts
```

## Prisma schema (orders_db)

- `orders` (id, user_id, status PENDING|CONFIRMED|COMPLETED|CANCELLED, total_amount, created_at)
- `order_items` (id, order_id FK, product_id, product_name, unit_price, quantity)
- `product_snapshots` (product_id PK, name, price, stock_view, updated_at) ← read model
- `idempotency_keys` (key PK, order_id, created_at)
- `processed_events` (event_id PK, processed_at)
- `outbox` (id, event_type, payload, published, created_at)

## Key constraints

- Sync availability check: `POST /products/availability` on product-service (3s timeout + circuit breaker)
- Stock reserve: `POST /products/:id/stock` on product-service (conditional)
- Idempotency: check `idempotency_keys` before processing; return original order if duplicate
- State machine: only PENDING orders can be CANCELLED; throw `InvalidOrderStateException` otherwise
- Phase 1 confirmation: auto-confirm (PENDING → CONFIRMED in same request, emit `order.confirmed`)
- Outbox: `order.created` written in same tx as order insert
- Snapshot sync: `product.created` / `product.updated` → upsert `product_snapshots`; dedupe by eventId

## Acceptance criteria

- Double submit with same `idempotencyKey` returns original order (no duplicate)
- Cancel on CONFIRMED/COMPLETED throws 422 INVALID_ORDER_STATE
- `product_snapshots` updated when product events arrive
- Stock released (via `order.cancelled` event) when order is cancelled
- Integration test: full place→cancel flow with Testcontainers
