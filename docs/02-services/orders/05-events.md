# orders-service — Events

## Publishes

| Routing key       | When                          | Payload (key fields)                                   |
| ----------------- | ----------------------------- | ------------------------------------------------------ |
| `order.created`   | Order placed                  | `orderId`, `userId`, `items[]`, `totalAmount`, `currency` |
| `order.confirmed` | Order moved to CONFIRMED      | `orderId`, `userId`, `confirmedAt`                     |
| `order.cancelled` | Order moved to CANCELLED      | `orderId`, `userId`, `items[]`, `reason`               |

```jsonc
// order.created (see @app/contracts OrderCreatedV1)
{ "orderId":"uuid","userId":"uuid",
  "items":[{"productId":"uuid","quantity":2,"unitPrice":"19.99"}],
  "totalAmount":"39.98","currency":"USD" }

// order.cancelled  (items included so product-service can release stock)
{ "orderId":"uuid","userId":"uuid",
  "items":[{"productId":"uuid","quantity":2}],"reason":"changed_mind" }
```

All published via the **outbox** (atomic with the state change).

## Consumes

| Routing key             | Producer        | Action                                                   | Phase |
| ----------------------- | --------------- | -------------------------------------------------------- | ----- |
| `product.created`       | product-service | Upsert product snapshot                                  | 1     |
| `product.updated`       | product-service | Update product snapshot                                  | 1     |
| `product.stock_changed` | product-service | Update snapshot stock view                               | 1     |
| `payment.succeeded`     | payment-service | Order PENDING → CONFIRMED; emit `order.confirmed`        | later |
| `payment.failed`        | payment-service | Order PENDING → CANCELLED; emit `order.cancelled`        | later |
| `payment.refunded`      | payment-service | Mark refunded (already CANCELLED path)                   | later |

Queues:
- `orders.product-sync` ← `product.created`, `product.updated`, `product.stock_changed`
- `orders.payment-events` ← `payment.succeeded`, `payment.failed`, `payment.refunded` (later)

All consumers are **idempotent** (dedupe by `eventId` via `processed_events`).

## Who consumes order events

| Event             | Consumer (phase)                       | Why                                  |
| ----------------- | -------------------------------------- | ------------------------------------ |
| `order.created`   | payment (later), notification (later)  | Start payment; "order received" mail |
| `order.confirmed` | notification (later)                   | "Order confirmed" mail               |
| `order.cancelled` | product-service (1), payment/notif (later) | Release stock; refund; email     |
