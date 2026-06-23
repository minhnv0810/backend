# Flow 04 — Order ↔ Payment Saga (LATER PHASE)

A **choreographed saga** (no central orchestrator): each service reacts to events and runs
compensating actions on failure. This realizes cross-service consistency without distributed
transactions.

## Participants & their local transactions

| Step | Service          | Local action                         | On failure → compensation        |
| ---- | ---------------- | ------------------------------------ | -------------------------------- |
| 1    | orders-service   | Create order `PENDING`, reserve req. | —                                |
| 2    | product-service  | Reserve stock                        | Release stock (on cancel)        |
| 3    | payment-service  | Charge via PSP                       | Refund (on later cancel)         |
| 4    | orders-service   | `CONFIRMED` on success               | `CANCELLED` on payment failure   |

## Success path

```mermaid
sequenceDiagram
    autonumber
    participant O as orders-service
    participant MQ as RabbitMQ
    participant Prod as product-service
    participant Pay as payment-service
    participant N as notification

    O->>MQ: order.created (PENDING)
    par fan-out
        MQ->>Pay: order.created
        MQ->>N: order.created -> "received" email
    end
    Pay->>Pay: authorize+capture via PSP
    Pay->>MQ: payment.succeeded
    MQ->>O: payment.succeeded
    O->>O: PENDING -> CONFIRMED
    O->>MQ: order.confirmed
    MQ->>N: order.confirmed -> "confirmed" email
```

## Failure path (payment fails) — compensation

```mermaid
sequenceDiagram
    autonumber
    participant O as orders-service
    participant MQ as RabbitMQ
    participant Prod as product-service
    participant Pay as payment-service
    participant N as notification

    Pay->>MQ: payment.failed {orderId}
    MQ->>O: payment.failed
    O->>O: PENDING -> CANCELLED
    O->>MQ: order.cancelled {items}
    par compensate
        MQ->>Prod: order.cancelled -> release reserved stock
        MQ->>N: payment-problem email
    end
```

## Cancellation after payment (refund)

```mermaid
sequenceDiagram
    autonumber
    participant C as Client
    participant O as orders-service
    participant MQ as RabbitMQ
    participant Pay as payment-service
    participant Prod as product-service

    C->>O: POST /orders/:id/cancel  (order CONFIRMED & paid)
    O->>O: CONFIRMED -> CANCELLED
    O->>MQ: order.cancelled
    par
        MQ->>Pay: order.cancelled -> refund via PSP -> payment.refunded
        MQ->>Prod: order.cancelled -> release stock
    end
```

## Saga invariants

- Every forward action has a defined compensation.
- All steps are **idempotent** (replayed events are safe).
- Timeouts: if `payment.*` never arrives within a TTL, a scheduled job cancels the order
  (`order.cancelled`) and compensations run — no order is stuck `PENDING` forever.
- The saga is **eventually consistent**: there are brief windows where order/payment/stock disagree;
  events converge them.

## Why choreography (not orchestration) for now

Choreography keeps services decoupled and needs no extra orchestrator component. If the workflow
grows complex (many branches/timeouts), revisit with an orchestrator (e.g. a `saga-orchestrator`
service or a workflow engine) — captured as a future ADR.
