# product-service — Overview

## Responsibility

Owns the **product catalog**: products, categories, and current stock levels. It is the source of
truth for product data; other services keep a local snapshot via events.

## Owns

- Products (name, description, price, SKU, status).
- Categories and product↔category membership.
- Stock levels (`quantity_available`, reservations counter).

## Does NOT own

- Orders (orders-service). product-service exposes stock and reacts to cancellations but does not
  own order state.
- Pricing rules/promotions (could become a separate service later).

## Key capabilities

| Capability               | Sync API                          | Emits event              |
| ------------------------ | --------------------------------- | ------------------------ |
| List/browse products     | `GET /products`                   | —                        |
| Get product              | `GET /products/:id`               | —                        |
| (admin) Create product   | `POST /products`                  | `product.created`        |
| (admin) Update product   | `PATCH /products/:id`             | `product.updated`        |
| (admin) Adjust stock     | `POST /products/:id/stock`        | `product.stock_changed`  |
| Check availability (bulk)| `POST /products/availability`     | —                        |
| (event) Release stock    | consumes `order.cancelled`        | `product.stock_changed`  |

## Dependencies

- **Postgres** `product_db`.
- **RabbitMQ** — publishes `product.*`; consumes `order.cancelled` to release reserved stock.

## Non-functional notes

- Read-heavy: list/detail endpoints are cacheable; consider pagination + filtering from day one.
- Stock changes must be **atomic** (row-level locking / conditional update) to avoid overselling.
- Writes are admin-only (RBAC).

Related: [API](02-api-spec.md) · [DB Schema](03-db-schema.md) · [Flows](04-flows.md) · [Events](05-events.md)
