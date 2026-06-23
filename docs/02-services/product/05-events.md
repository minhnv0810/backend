# product-service — Events

## Publishes

| Routing key             | When                                | Payload (key fields)                              |
| ----------------------- | ----------------------------------- | ------------------------------------------------- |
| `product.created`       | New product created                 | `productId`, `sku`, `name`, `price`, `currency`   |
| `product.updated`       | Product fields changed              | `productId`, changed fields                        |
| `product.stock_changed` | Stock reserved/released/adjusted    | `productId`, `previousQty`, `newQty`, `reason`     |

```jsonc
// product.stock_changed
{ "productId":"uuid","previousQty":10,"newQty":7,"reason":"order_reserved" }
// reason ∈ manual_adjustment | order_reserved | order_released | restock
```

## Consumes

| Routing key       | Producer       | Action                                                       |
| ----------------- | -------------- | ------------------------------------------------------------ |
| `order.cancelled` | orders-service | Release reserved stock back to available; emit `product.stock_changed` |

- Queue: `product.order-events`, bound to `order.cancelled`.
- Idempotent via `processed_events` (dedupe on `eventId`).

## Who consumes product events

| Event                    | Consumer (phase)              | Why                                      |
| ------------------------ | ----------------------------- | ---------------------------------------- |
| `product.created`        | orders-service (1)            | Seed product snapshot read model         |
| `product.updated`        | orders-service (1)            | Keep price/name snapshot current         |
| `product.stock_changed`  | orders-service (1), notification (later) | Stock view; low-stock alerts  |

The product snapshot in orders-service is what lets orders avoid cross-service joins (principle #1).
