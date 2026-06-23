# 02 — ER Diagrams

One diagram per service database. Cross-service references are shown as dotted logical references
(not foreign keys — they live in different databases).

## auth_db

```mermaid
erDiagram
    users ||--|| credentials : has
    users ||--o{ user_roles : assigned
    roles ||--o{ user_roles : defines
    users ||--o{ refresh_tokens : owns

    users {
        uuid id PK
        citext email UK
        varchar display_name
        varchar status
        timestamptz created_at
        timestamptz updated_at
    }
    credentials {
        uuid user_id PK
        varchar password_hash
        int failed_attempts
        timestamptz locked_until
        timestamptz updated_at
    }
    roles {
        uuid id PK
        varchar name UK
    }
    user_roles {
        uuid user_id PK
        uuid role_id PK
        timestamptz assigned_at
    }
    refresh_tokens {
        uuid id PK
        uuid user_id FK
        varchar token_hash
        uuid family_id
        boolean revoked
        timestamptz expires_at
        varchar user_agent
        timestamptz created_at
    }
```

## product_db

```mermaid
erDiagram
    products ||--|| stock : has
    products ||--o{ product_categories : in
    categories ||--o{ product_categories : groups
    categories ||--o{ categories : parent

    products {
        uuid id PK
        varchar sku UK
        varchar name
        text description
        decimal price
        varchar currency
        varchar status
        timestamptz created_at
        timestamptz updated_at
    }
    stock {
        uuid product_id PK
        int quantity_available
        int quantity_reserved
        timestamptz updated_at
    }
    categories {
        uuid id PK
        varchar name
        varchar slug UK
        uuid parent_id FK
    }
    product_categories {
        uuid product_id PK
        uuid category_id PK
    }
```

## orders_db

```mermaid
erDiagram
    orders ||--o{ order_items : contains
    product_snapshots ||--o{ order_items : referenced_by

    orders {
        uuid id PK
        uuid user_id
        varchar status
        decimal total_amount
        varchar currency
        varchar cancel_reason
        timestamptz created_at
        timestamptz updated_at
    }
    order_items {
        uuid id PK
        uuid order_id FK
        uuid product_id
        varchar product_name
        int quantity
        decimal unit_price
        decimal line_total
    }
    product_snapshots {
        uuid product_id PK
        varchar name
        decimal price
        varchar currency
        int stock_view
        varchar status
        timestamptz updated_at
    }
    idempotency_keys {
        varchar key PK
        uuid user_id
        uuid order_id
        timestamptz created_at
    }
```

## Cross-service logical references

Dotted arrows = logical references only — no database-level FK. Integrity is maintained at the
application layer via event consistency, not DB constraints.

```mermaid
flowchart LR
    subgraph auth_db
        AU[(users\nid PK)]
    end
    subgraph product_db
        PP[(products\nid PK)]
    end
    subgraph orders_db
        OO[(orders\nuser_id)]
        OI[(order_items\nproduct_id)]
        PS[(product_snapshots\nproduct_id PK)]
    end

    AU -.->|user_id logical ref| OO
    PP -.->|product_id logical ref| OI
    PP -.->|events keep in sync| PS
```
