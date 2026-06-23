# 01 — Roadmap & Phases

## Phase overview

| Phase | Theme                  | Services shipped                          | Key deliverables                              |
| ----- | ---------------------- | ----------------------------------------- | --------------------------------------------- |
| 0     | **Foundation**         | (no services yet)                         | Nx monorepo, shared libs, docker-compose, CI  |
| 1     | **Core commerce**      | gateway, auth, product, orders            | Registration → browse → place order, E2E green |
| 2     | **Payments**           | payment-service                           | Order ↔ payment saga, refunds                 |
| 3     | **Notifications**      | notification-service                      | Transactional emails, notification log        |
| 4     | **Scale prep**         | —                                         | Kafka event streaming, K8s manifests, mTLS    |

## Phase 0 — Foundation

**Goal**: Every developer can clone and run the monorepo in under 5 minutes.

| Task                                                          | Output                                                   |
| ------------------------------------------------------------- | -------------------------------------------------------- |
| Init Nx workspace with pnpm workspaces                        | `nx.json`, `pnpm-workspace.yaml`                         |
| Set up shared libs: contracts, messaging, auth, config, observability, database, testing | `libs/*` stubs                   |
| Docker Compose with Postgres + RabbitMQ                       | `docker-compose.infra.yml`                               |
| Multi-stage Dockerfile + pg-init-dbs script                   | `docker/Dockerfile`, `docker/pg-init-dbs.sh`             |
| Lint + type-check CI (GitHub Actions)                         | `.github/workflows/ci.yml`                               |
| Generate JWT key pair + `.env.example` per service            | All `.env.example` files                                 |

Done when: `docker compose up` starts infra; `nx run-many --target=serve` starts all services.

## Phase 1 — Core commerce

**Goal**: A user can register, login, browse products, and place an order. E2E suite is green in CI.

| Task                                           | Acceptance                                                  |
| ---------------------------------------------- | ----------------------------------------------------------- |
| auth-service: register, login, refresh, logout | E2E journey 01 passes                                       |
| product-service: CRUD catalog, categories, stock | E2E journeys 02 + 05 pass                                  |
| orders-service: place + cancel + snapshot sync | E2E journeys 03 + 04 pass                                   |
| api-gateway: routing, JWT validation, rate limit| All journeys pass through the gateway                      |
| RabbitMQ event backbone wired                  | product snapshots in orders-service, stock released on cancel|
| Outbox pattern implemented in all services     | No lost events under integration tests                      |
| Contract tests for all Phase 1 events          | Contract specs green                                        |
| Unit + integration test coverage ≥ 80%         | CI enforces threshold                                       |
| Swagger UI per service                         | `GET /docs` on each service                                 |

Done when: the E2E golden path (register → login → browse → place order → cancel → stock released)
runs green in CI from a clean checkout.

## Phase 2 — Payments

**Goal**: Orders are charged and confirmed (or cancelled) via a real PSP. Saga + refunds work.

| Task                                              | Acceptance                                              |
| ------------------------------------------------- | ------------------------------------------------------- |
| payment-service: charge, confirm, fail, refund    | Unit + integration tests pass                           |
| Order ↔ payment saga wired (event-driven)         | E2E saga journey: order.created → payment.* → CONFIRMED |
| Compensation on failure (order.cancelled → release)| E2E failure path: payment.failed → stock released       |
| PSP webhook handler (idempotent)                  | Integration test with mock webhook                      |
| Saga timeout (stuck PENDING → auto-cancel)        | Integration test for expiry job                         |
| PCI-aware: card data never stored                 | Code review + security review                           |

## Phase 3 — Notifications

**Goal**: Customers receive transactional emails for all order lifecycle events.

| Task                                              | Acceptance                                              |
| ------------------------------------------------- | ------------------------------------------------------- |
| notification-service: template engine + dispatch  | Integration tests with mock provider                    |
| All event → email mappings from catalog           | Each mapping has a test                                 |
| Idempotent delivery + DLQ alerting                | Integration test for duplicate + failure                |
| User email enrichment in event payloads           | No sync hop needed at dispatch time                     |

## Phase 4 — Scale prep

**Goal**: System is ready for production load and K8s deployment.

| Task                                              | Acceptance                                              |
| ------------------------------------------------- | ------------------------------------------------------- |
| Kafka integration via `@app/messaging` swap       | High-volume events route through Kafka                  |
| K8s manifests + Helm chart                        | `helm install` starts full stack                        |
| Network policies (only gateway public)            | `kubectl` policy tests pass                             |
| mTLS between services                             | Service mesh (Istio/Linkerd) configured                 |
| Horizontal autoscaling (HPA per service)          | Load test triggers scale-out                            |
| Managed DB + broker (external)                    | Services connect to RDS + MSK / CloudAMQP               |
| Observability: OpenTelemetry traces               | Trace visible in Jaeger/Grafana Tempo                   |

## Phase gates

No phase starts until the previous phase's acceptance criteria are met and the E2E suite is green.
Each major architectural change in Phase 2+ gets an ADR before implementation starts.
