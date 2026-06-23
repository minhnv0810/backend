# 01 — Vision & Scope

## Vision

Build a **modular, event-driven e-commerce backend** as a set of independently deployable
microservices. The system must let a customer register, browse a product catalog, and place
orders, with payments and notifications added in a later phase. Each service owns its data and
communicates through well-defined contracts (REST for request/response, RabbitMQ events for
state propagation).

## Goals

1. **Clear service boundaries** — each service is a single business capability with its own DB.
2. **Loose coupling** — services react to events; no shared tables, no cross-service joins.
3. **Replaceable infrastructure** — start with docker-compose + RabbitMQ; add Kafka and
   Kubernetes later without rewriting business logic.
4. **Testable by design** — every service is independently testable; cross-service behavior is
   covered by E2E and contract tests.
5. **Good developer experience** — one monorepo, shared contracts/DTOs, one command to run
   everything locally.

## In scope (Phase 1)

- `api-gateway` — single entry point for clients.
- `auth-service` — registration, login, JWT issuance/refresh, RBAC roles.
- `product-service` — product catalog, categories, basic stock levels.
- `orders-service` — cart, order creation, order lifecycle states.
- Async event backbone (RabbitMQ) wired between the above.
- Local containerized environment (docker-compose).
- Automated tests including a cross-service E2E suite.

## Deferred (Later phases)

- `payment-service` — payment authorization/capture, refunds, **Saga** with orders.
- `notification-service` — email/push/SMS triggered by domain events.
- **Kafka** — high-throughput event streaming / event log / analytics.
- **Kubernetes** — production orchestration, autoscaling, service mesh.

## Out of scope (for now)

- Frontend / mobile clients (only the backend + gateway).
- Search service / recommendation engine.
- Multi-tenancy, internationalization, multi-currency.
- Production CD pipeline (covered conceptually in delivery docs, not built in Phase 1).

## Success criteria

- A new engineer can clone the repo and run the whole system with **one command**.
- A user can complete the **register → login → browse → place order** journey end-to-end.
- Adding `payment` / `notification` later requires **no schema changes** to existing services —
  only consuming existing events and emitting new ones.
- The E2E suite proves the primary journey green in CI.
