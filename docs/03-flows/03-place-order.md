# Flow 03 — Place Order

The headline Phase-1 journey. Combines a synchronous availability check with asynchronous event
emission. Shown first **without** payment (Phase 1), then how payment plugs in.

## Phase 1 — place order (no payment service)

```mermaid
sequenceDiagram
    autonumber
    participant C as Client
    participant G as Gateway
    participant O as orders-service
    participant P as product-service
    participant ODB as orders_db
    participant MQ as RabbitMQ

    C->>G: POST /api/v1/orders {items, idempotencyKey}
    G->>G: verify JWT -> x-user-id
    G->>O: forward
    O->>ODB: idempotencyKey seen? (if yes, return original)
    O->>P: POST /products/availability {items}   (timeout 3s + circuit breaker)
    alt insufficient stock / inactive
        P-->>O: items not ok
        O-->>C: 422 INSUFFICIENT_STOCK (per-item details)
    else available
        P-->>O: ok + authoritative unit prices
        O->>P: reserve stock {items}                (conditional decrement)
        P->>MQ: product.stock_changed (reserved)
        O->>ODB: BEGIN tx - insert order + items + idempotencyKey + outbox row - COMMIT
        O->>MQ: order.created
        O-->>C: 201 {order PENDING}
    end

    Note over O: Phase 1 confirmation strategy (pick one, see below)
```

### Phase-1 confirmation strategy

Because there is no payment yet, choose one (recorded as a decision; default = **auto-confirm**):

| Strategy        | Behavior                                              | Pro / Con                          |
| --------------- | ----------------------------------------------------- | ---------------------------------- |
| **Auto-confirm**| Order created directly as `CONFIRMED` (+`order.confirmed`) | Simplest demo; least realistic |
| Manual confirm  | Stays `PENDING`; admin calls `/confirm`               | Mirrors real flow; needs admin     |
| Mock payment    | A stub emits `payment.succeeded` after a delay        | Closest to final; extra moving part|

> The stock-reserve step is included so the model is already saga-ready. If you prefer maximum
> Phase-1 simplicity, stock can instead be decremented outright and released on cancel.

## With payment (later) — preview

```mermaid
sequenceDiagram
    autonumber
    participant O as orders-service
    participant MQ as RabbitMQ
    participant Pay as payment-service
    participant Prod as product-service
    participant N as notification

    O->>MQ: order.created (PENDING)
    MQ->>Pay: order.created
    Pay->>Pay: charge via PSP
    alt success
        Pay->>MQ: payment.succeeded
        MQ->>O: payment.succeeded - order CONFIRMED
        O->>MQ: order.confirmed
        MQ->>N: confirmation email
    else failure
        Pay->>MQ: payment.failed
        MQ->>O: payment.failed - order CANCELLED
        O->>MQ: order.cancelled
        MQ->>Prod: release reserved stock
        MQ->>N: payment-problem email
    end
```

Full saga with compensation: [Order ↔ Payment Saga](04-order-payment-saga.md).

## Failure & edge cases

| Case                              | Handling                                                       |
| --------------------------------- | -------------------------------------------------------------- |
| product-service down              | Circuit breaker opens → `503 DEPENDENCY_UNAVAILABLE`, no order |
| Stock taken between check+reserve | Reserve is conditional → `422 INSUFFICIENT_STOCK`              |
| Double submit                     | `idempotencyKey` returns the original order                    |
| order.created lost                | Outbox guarantees eventual publish                             |
| Duplicate order.created delivered | Consumers dedupe by `eventId`                                  |
