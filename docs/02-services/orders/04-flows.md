# orders-service — Flows

## Place order (Phase 1, no payment)

```mermaid
sequenceDiagram
    participant C as Client
    participant G as Gateway
    participant O as orders-service
    participant P as product-service
    participant DB as orders_db
    participant MQ as RabbitMQ

    C->>G: POST /orders {items, idempotencyKey}
    G->>O: forward (x-user-id)
    O->>DB: check idempotencyKey
    alt key seen
        O-->>C: 201 (original order)
    else
        O->>P: POST /products/availability {items}  (timeout+breaker)
        alt unavailable
            P-->>O: items not ok
            O-->>C: 422 INSUFFICIENT_STOCK
        else available
            P-->>O: ok + unit prices
            O->>O: snapshot prices, compute totals
            O->>DB: BEGIN; insert order+items; store idempotencyKey;<br/>insert outbox(order.created); COMMIT
            O->>MQ: order.created (relay)
            O-->>C: 201 {order PENDING}
        end
    end
    Note over O: Phase 1 may auto-confirm; later, payment.succeeded confirms.
```

## Cancel order

```mermaid
sequenceDiagram
    participant C as Client
    participant O as orders-service
    participant DB as orders_db
    participant MQ as RabbitMQ

    C->>O: POST /orders/:id/cancel {reason}
    O->>DB: load order, check ownership + state
    alt invalid state (e.g. COMPLETED)
        O-->>C: 409 INVALID_ORDER_STATE
    else
        O->>DB: BEGIN; status=CANCELLED; insert outbox(order.cancelled); COMMIT
        O->>MQ: order.cancelled (relay)
        O-->>C: 200 {CANCELLED}
        Note over MQ: product-service releases stock; payment refunds (later)
    end
```

## Maintain product snapshot (event consumer)

```mermaid
sequenceDiagram
    participant MQ as RabbitMQ
    participant O as orders-service
    participant DB as orders_db

    MQ->>O: product.created / product.updated / product.stock_changed
    O->>DB: dedupe by eventId
    alt duplicate
        O->>MQ: ack
    else
        O->>DB: upsert product_snapshots; record processed_events
        O->>MQ: ack
    end
```

## Confirm via payment (later)

```mermaid
sequenceDiagram
    participant MQ as RabbitMQ
    participant O as orders-service
    participant DB as orders_db

    MQ->>O: payment.succeeded {orderId}
    O->>DB: dedupe; if order PENDING -> CONFIRMED; outbox(order.confirmed)
    O->>MQ: order.confirmed + ack
    Note over O: payment.failed -> CANCELLED (+ release stock via order.cancelled)
```

Full cross-service version: [Place Order](../../03-flows/03-place-order.md) and
[Order ↔ Payment Saga](../../03-flows/04-order-payment-saga.md).
