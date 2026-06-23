# product-service — Phase 1

**Scope**: Product catalog CRUD, categories, stock management, snapshot events for orders-service.

## Files to implement

```
src/
├── main.ts                          ✓ done (port 3002)
├── app/app.module.ts
├── products/
│   ├── products.module.ts
│   ├── products.controller.ts       GET /products, GET /products/:id, POST|PUT|DELETE (admin)
│   │                                POST /products/:id/stock, POST /products/availability
│   ├── products.service.ts
│   ├── products.repository.ts
│   └── dto/
│       ├── create-product.dto.ts
│       ├── update-product.dto.ts
│       ├── stock-adjustment.dto.ts
│       └── availability-check.dto.ts
└── health/health.controller.ts
```

## Prisma schema (product_db)

- `products` (id, name, description, price decimal(12,2), status active|inactive|archived, created_at)
- `categories` (id, name, slug, parent_id)
- `product_categories` (product_id FK, category_id FK — PK composite)
- `stock` (product_id PK FK, quantity, reserved, updated_at)
- `processed_events` (event_id PK, processed_at)
- `outbox` (id, event_type, payload, published, created_at)

## Key constraints

- Stock decrement is conditional: `UPDATE stock SET reserved = reserved + ? WHERE product_id = ? AND (quantity - reserved) >= ?` — prevents overselling
- Events via outbox (same tx as state change): `product.created`, `product.updated`, `product.stock_changed`
- Consumes `order.cancelled` event to release reserved stock
- Admin routes require `x-user-roles: admin` header (trust gateway)

## Acceptance criteria

- `GET /products` paginated, filterable by category and q
- `POST /products/availability` returns ok+prices or 422 per item
- Stock reserve is atomic (conditional UPDATE), never goes negative
- `product.created` event published via outbox on every new product
- Integration test: stock reservation under concurrent requests
