# Backend Microservices — Design Documentation

> Status: **Design phase** (no code yet). This package defines the architecture, flows, data
> schemas, and delivery plan. Coding begins only after these documents are reviewed and approved.

## Stack at a glance

| Concern            | Choice                                                        |
| ------------------ | ------------------------------------------------------------- |
| Language / runtime | TypeScript on Node.js (NestJS)                                |
| Repo layout        | **Nx monorepo** (`apps/*` services, `libs/*` shared)          |
| Data store         | **PostgreSQL**, **database-per-service** (one instance)       |
| ORM                | **Prisma** (schema + migrations per service)                  |
| Sync comms         | **REST** behind an **API Gateway**                            |
| Async comms        | **RabbitMQ** topic exchange (domain events)                   |
| Containerization   | **Docker** + docker-compose (local), **K8s later**            |
| Streaming          | **Kafka later** (high-volume event streaming / log)           |
| Testing            | Unit + integration + **E2E**, contract tests between services |

## Services

| Service                | Phase   | Responsibility                                  | Port |
| ---------------------- | ------- | ----------------------------------------------- | ---- |
| `api-gateway`          | Phase 1 | Edge routing, authn validation, rate limiting   | 3000 |
| `auth-service`         | Phase 1 | Identity, registration, login, tokens, RBAC     | 3001 |
| `product-service`      | Phase 1 | Product catalog, categories, inventory snapshot | 3002 |
| `orders-service`       | Phase 1 | Cart → order lifecycle, order items             | 3003 |
| `payment-service`      | Later   | Payments, refunds, payment saga                 | 3004 |
| `notification-service` | Later   | Email/push/SMS dispatch from events             | 3005 |

## How to read these docs

Read top-to-bottom by folder number. Each file is intentionally small and single-topic.

```
docs/
├── 00-overview/         Why we are building this, vocabulary, stack, principles
├── 01-architecture/     System shape, comms, monorepo, shared libs, events, security
├── 02-services/         One folder per service (overview, API, DB schema, flows, events)
├── 03-flows/            Cross-service end-to-end flows (sequence diagrams)
├── 04-data/             DB strategy, ER diagrams, migration approach
├── 05-infrastructure/   docker-compose, config, RabbitMQ topology, Kafka/K8s (later)
├── 06-testing/          Test strategy, E2E plan, contract testing
└── 07-delivery/         Roadmap phases + Architecture Decision Records (ADRs)
```

## Document index

### 00 — Overview
- [01 Vision & Scope](00-overview/01-vision-and-scope.md)
- [02 Glossary](00-overview/02-glossary.md)
- [03 Tech Stack & Conventions](00-overview/03-tech-stack.md)
- [04 Architecture Principles](00-overview/04-architecture-principles.md)

### 01 — Architecture
- [01 System Context (C4 L1)](01-architecture/01-system-context.md)
- [02 Container Diagram (C4 L2)](01-architecture/02-container-diagram.md)
- [03 Communication Patterns](01-architecture/03-communication-patterns.md)
- [04 Monorepo Structure](01-architecture/04-monorepo-structure.md)
- [05 Shared Libraries](01-architecture/05-shared-libraries.md)
- [06 Event Catalog](01-architecture/06-event-catalog.md)
- [07 Error Handling & Resilience](01-architecture/07-error-handling.md)
- [08 Observability](01-architecture/08-observability.md)
- [09 Security & AuthN/AuthZ](01-architecture/09-security.md)

### 02 — Services
- API Gateway: [Overview](02-services/api-gateway/01-overview.md) · [Routing Table](02-services/api-gateway/02-routing-table.md) · [Config & Env](02-services/api-gateway/03-config.md)
- Auth: [Overview](02-services/auth/01-overview.md) · [API](02-services/auth/02-api-spec.md) · [DB Schema](02-services/auth/03-db-schema.md) · [Flows](02-services/auth/04-flows.md) · [Events](02-services/auth/05-events.md)
- Product: [Overview](02-services/product/01-overview.md) · [API](02-services/product/02-api-spec.md) · [DB Schema](02-services/product/03-db-schema.md) · [Flows](02-services/product/04-flows.md) · [Events](02-services/product/05-events.md)
- Orders: [Overview](02-services/orders/01-overview.md) · [API](02-services/orders/02-api-spec.md) · [DB Schema](02-services/orders/03-db-schema.md) · [Flows](02-services/orders/04-flows.md) · [Events](02-services/orders/05-events.md)
- Payment (later): [Overview](02-services/payment/01-overview.md)
- Notification (later): [Overview](02-services/notification/01-overview.md)

### 03 — Cross-service Flows
- [01 Registration & Login](03-flows/01-user-registration-login.md)
- [02 Browse Catalog](03-flows/02-browse-products.md)
- [03 Place Order](03-flows/03-place-order.md)
- [04 Order ↔ Payment Saga (later)](03-flows/04-order-payment-saga.md)
- [05 Notification Dispatch (later)](03-flows/05-notification-dispatch.md)

### 04 — Data
- [01 Database Strategy](04-data/01-database-strategy.md)
- [02 ER Diagrams](04-data/02-er-diagrams.md)
- [03 Migration Strategy](04-data/03-migrations-strategy.md)

### 05 — Infrastructure
- [01 docker-compose (local)](05-infrastructure/01-docker-compose.md)
- [02 Environments & Config](05-infrastructure/02-environments-config.md)
- [03 RabbitMQ Topology](05-infrastructure/03-rabbitmq-topology.md)
- [04 Kafka & Kubernetes (later)](05-infrastructure/04-kafka-k8s-later.md)

### 06 — Testing
- [01 Test Strategy](06-testing/01-test-strategy.md)
- [02 E2E Test Plan](06-testing/02-e2e-test-plan.md)
- [03 Contract Testing](06-testing/03-contract-testing.md)

### 07 — Delivery
- [01 Roadmap & Phases](07-delivery/01-roadmap-phases.md)
- ADRs: [0001](07-delivery/adr/0001-record-architecture-decisions.md) · [0002 Nx](07-delivery/adr/0002-monorepo-nx.md) · [0003 DB-per-service](07-delivery/adr/0003-database-per-service.md) · [0004 Prisma](07-delivery/adr/0004-prisma-orm.md) · [0005 Gateway+REST+RabbitMQ](07-delivery/adr/0005-gateway-rest-rabbitmq.md)
