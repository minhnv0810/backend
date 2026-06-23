# 03 — RabbitMQ Topology

How exchanges, queues, and bindings are wired. Everything is declared **durable** so config
survives a broker restart.

## Summary

```
Exchange: domain.events  (topic, durable)
│
├── routing key: user.registered      → queue: auth.user-events
├── routing key: user.logged_in       → queue: auth.user-events
│
├── routing key: product.created      ─┐
├── routing key: product.updated      ─┤→ queue: orders.product-sync
├── routing key: product.stock_changed─┘
│
├── routing key: order.created        ─┐
├── routing key: order.confirmed       │→ queue: product.order-events (order.cancelled only)
├── routing key: order.cancelled      ─┘
│
├── routing key: payment.succeeded   ─┐  (later)
├── routing key: payment.failed      ─┤→ queue: orders.payment-events
├── routing key: payment.refunded    ─┘
│
└── routing key: #                   → queue: notification.all (later)
```

## Exchange

| Name           | Type  | Durable | Purpose                         |
| -------------- | ----- | ------- | ------------------------------- |
| `domain.events`| topic | true    | Single exchange for all services |

Using a single topic exchange keeps routing simple. Services use specific routing-key bindings —
no consumer sees events it didn't ask for.

## Queues (Phase 1)

| Queue name              | Consumer           | Bindings                                              | DLX                     |
| ----------------------- | ------------------ | ----------------------------------------------------- | ----------------------- |
| `auth.user-events`      | auth-service       | `user.registered`, `user.logged_in`                   | `dlx.auth.user-events`  |
| `orders.product-sync`   | orders-service     | `product.created`, `product.updated`, `product.stock_changed` | `dlx.orders.product-sync` |
| `product.order-events`  | product-service    | `order.cancelled`                                     | `dlx.product.order-events` |

## Queues (later phases)

| Queue name                | Consumer              | Bindings                                                | DLX                           |
| ------------------------- | --------------------- | ------------------------------------------------------- | ----------------------------- |
| `orders.payment-events`   | orders-service        | `payment.succeeded`, `payment.failed`, `payment.refunded` | `dlx.orders.payment-events` |
| `payment.order-events`    | payment-service       | `order.created`, `order.cancelled`                      | `dlx.payment.order-events`  |
| `notification.all`        | notification-service  | `#` (all events)                                        | `dlx.notification.all`      |

> `notification.all` binds `#` (match all) so it receives every event. The service filters
> by routing key in code. This keeps bindings simple; swap to explicit keys if queue volume grows.

## Dead-letter topology

Each queue has a corresponding dead-letter exchange + queue:

```
dlx.<queue-name>   (direct, durable) → dlq.<queue-name>  (durable)
```

Failed messages (exhausted retries) go to the DLQ for inspection and manual replay.

## Retry strategy

NestJS `@nestjs/microservices` RMQ transport with custom headers:

1. Message fails → nack (no requeue).
2. A retry exchange re-queues with a `x-delay` header (using `rabbitmq_delayed_message_exchange`
   plugin) or a TTL-based dead-letter loop for backoff.
3. After max retries → dead-letter to DLQ.

Retry backoff: 1s → 5s → 30s → 120s → DLQ (configurable per consumer).

## Declaring topology in code

Topology is declared by each service on startup via `@app/messaging`. Services use the
`CustomTransportStrategy` or `ClientsModule` — NestJS creates queues on connect if
`assertQueue` is called with `{ durable: true }`.

```ts
// @app/messaging declares exchange + bindings at bootstrap
async onApplicationBootstrap() {
  await this.channel.assertExchange('domain.events', 'topic', { durable: true });
  await this.channel.assertQueue('orders.product-sync', { durable: true,
    deadLetterExchange: 'dlx.orders.product-sync' });
  await this.channel.bindQueue('orders.product-sync', 'domain.events', 'product.created');
  await this.channel.bindQueue('orders.product-sync', 'domain.events', 'product.updated');
  await this.channel.bindQueue('orders.product-sync', 'domain.events', 'product.stock_changed');
}
```

## Management UI

RabbitMQ management UI available locally at `http://localhost:15672` (rabbit / rabbit).
Use it to monitor queue depths, DLQ sizes, and manually replay or purge messages during development.
