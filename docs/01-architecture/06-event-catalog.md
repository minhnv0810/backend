# 06 — Event Catalog

The authoritative list of domain events. Each event is an immutable, past-tense fact published to
the `domain.events` topic exchange. Payload types live in [`@app/contracts`](05-shared-libraries.md).

## Conventions

- **Routing key** = event name = `<aggregate>.<verb-past>`, lowercase, dot-separated.
- Every payload includes the **envelope fields**: `eventId` (uuid, for idempotency), `version`,
  `occurredAt` (ISO-8601), plus a correlation id in the message headers.
- Money is a **decimal string** with an explicit `currency`. Never a float.
- Breaking change → new routing key suffix (`order.created.v2`); additive change → bump `version`.

## Envelope (all events)

```jsonc
{
  "eventId": "uuid",
  "version": 1,
  "occurredAt": "2026-06-23T10:00:00.000Z",
  // ...event-specific fields
}
// headers: x-correlation-id, content-type=application/json
```

## Phase 1 events

| Routing key          | Producer        | Consumers (Phase 1)     | Consumers (later)        | Purpose                                   |
| -------------------- | --------------- | ----------------------- | ------------------------ | ----------------------------------------- |
| `user.registered`    | auth-service    | —                       | notification             | Welcome email, downstream provisioning    |
| `user.logged_in`     | auth-service    | —                       | (analytics)              | Audit / security signal                   |
| `product.created`    | product-service | orders-service          | —                        | Seed orders' product snapshot read model  |
| `product.updated`    | product-service | orders-service          | —                        | Refresh price/name snapshot               |
| `product.stock_changed` | product-service | orders-service       | notification             | Keep stock view current; low-stock alerts |
| `order.created`      | orders-service  | —                       | payment, notification    | Trigger payment; "order received" email   |
| `order.confirmed`    | orders-service  | —                       | notification             | "Order confirmed" email                   |
| `order.cancelled`    | orders-service  | product-service         | payment, notification    | Release reserved stock; refund; email     |

## Later-phase events

| Routing key            | Producer             | Consumers              | Purpose                              |
| ---------------------- | -------------------- | ---------------------- | ------------------------------------ |
| `payment.succeeded`    | payment-service      | orders-service         | Confirm the order                    |
| `payment.failed`       | payment-service      | orders-service         | Cancel/await retry                   |
| `payment.refunded`     | payment-service      | orders, notification   | Mark order refunded, notify customer |
| `notification.sent`    | notification-service | (analytics)            | Delivery audit                       |

## Example payloads

```jsonc
// user.registered
{ "eventId":"...", "version":1, "occurredAt":"...",
  "userId":"...", "email":"jane@example.com", "displayName":"Jane" }

// product.stock_changed
{ "eventId":"...", "version":1, "occurredAt":"...",
  "productId":"...", "previousQty":10, "newQty":7, "reason":"order_reserved" }

// order.created  (see @app/contracts OrderCreatedV1)
{ "eventId":"...", "version":1, "occurredAt":"...",
  "orderId":"...", "userId":"...",
  "items":[{"productId":"...","quantity":2,"unitPrice":"19.99"}],
  "totalAmount":"39.98", "currency":"USD" }
```

## Binding map (queues → routing keys)

See [RabbitMQ Topology](../05-infrastructure/03-rabbitmq-topology.md) for the concrete queue/binding
definitions. Summary:

| Queue                         | Bound routing keys                          |
| ----------------------------- | ------------------------------------------- |
| `orders.product-sync`         | `product.created`, `product.updated`, `product.stock_changed` |
| `orders.payment-events` (later)| `payment.succeeded`, `payment.failed`, `payment.refunded`     |
| `product.order-events`        | `order.cancelled`                           |
| `notification.all` (later)    | `user.registered`, `order.*`, `payment.*`, `product.stock_changed` |
