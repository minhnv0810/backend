# product-service — API Spec

Base path: `/api/v1/products`.

## GET /products

List with pagination, filtering, sorting. Public.

Query: `?page=1&limit=20&category=<id>&q=<search>&sort=price:asc&minPrice=&maxPrice=`

```jsonc
// 200
{ "data": [ { "id":"uuid","name":"Widget","price":"19.99","currency":"USD",
              "categoryIds":["uuid"],"stock":7,"status":"active" } ],
  "meta": { "page":1,"limit":20,"total":134,"correlationId":"..." } }
```

## GET /products/:id

```jsonc
// 200
{ "data": { "id":"uuid","name":"Widget","description":"...","sku":"WID-001",
            "price":"19.99","currency":"USD","categoryIds":["uuid"],
            "stock":7,"status":"active" } }
```
Errors: `404 PRODUCT_NOT_FOUND`.

## POST /products/availability

Bulk check used by orders-service at checkout (cart validation).

```jsonc
// request
{ "items": [ { "productId":"uuid","quantity":2 } ] }
// 200
{ "data": { "allAvailable": true,
            "items": [ { "productId":"uuid","requested":2,"available":7,
                         "ok":true,"unitPrice":"19.99" } ] } }
```

## POST /products  🔒 admin

```jsonc
// request
{ "name":"Widget","description":"...","sku":"WID-001","price":"19.99",
  "currency":"USD","categoryIds":["uuid"],"initialStock":100 }
// 201 -> product. Emits product.created
```
Errors: `409 SKU_ALREADY_EXISTS`, `400 VALIDATION_FAILED`, `403 FORBIDDEN`.

## PATCH /products/:id  🔒 admin

Partial update (name/description/price/categories/status). Emits `product.updated`.
Errors: `404 PRODUCT_NOT_FOUND`, `403 FORBIDDEN`.

## POST /products/:id/stock  🔒 admin

Absolute set or relative delta. Emits `product.stock_changed`.

```jsonc
// request
{ "delta": -5, "reason": "manual_adjustment" }   // or { "set": 100, ... }
// 200 -> { "data": { "productId":"uuid","previousQty":12,"newQty":7 } }
```
Errors: `422 STOCK_WOULD_GO_NEGATIVE`.

## Categories (admin CRUD)

`GET /categories`, `POST /categories` 🔒, `PATCH /categories/:id` 🔒, `DELETE /categories/:id` 🔒.

## Pagination contract

All list endpoints return `meta.page/limit/total`. Default `limit=20`, max `100`.
