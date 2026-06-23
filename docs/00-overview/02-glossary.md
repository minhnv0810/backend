# 02 — Glossary

Shared vocabulary used across all design documents. When a term is capitalized in other docs, it
refers to a definition here.

| Term                  | Meaning                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| **Service**           | An independently deployable NestJS application owning one business capability and its own DB.    |
| **API Gateway**       | The single public entry point. Validates JWTs, routes to services, applies rate limiting.        |
| **Aggregate**         | A cluster of domain objects treated as one unit (e.g. `Order` + its `OrderItem`s).               |
| **Domain Event**      | An immutable fact that something happened, in past tense (e.g. `order.created`).                 |
| **Command**           | A request to do something (synchronous REST call, or an RPC message). May be rejected.           |
| **Producer**          | A service that publishes events to RabbitMQ.                                                      |
| **Consumer**          | A service that subscribes to and handles events from RabbitMQ.                                    |
| **Exchange**          | RabbitMQ routing component. We use one **topic exchange** (`domain.events`).                      |
| **Routing key**       | The event name used to route a message (e.g. `order.created`).                                   |
| **Queue**             | A consumer's mailbox bound to the exchange with one or more routing-key patterns.                |
| **DLQ**               | Dead-letter queue — where messages go after repeated processing failures.                        |
| **Saga**              | A sequence of local transactions across services coordinated by events + compensating actions.   |
| **Outbox pattern**    | Persisting an event in the same DB transaction as the state change, then publishing it reliably. |
| **Idempotency**       | Property where handling the same message/request more than once has the same effect as once.     |
| **JWT**               | JSON Web Token — signed access/refresh credential issued by `auth-service`.                       |
| **Access token**      | Short-lived JWT (15 min) used to authorize API calls.                                            |
| **Refresh token**     | Longer-lived token (7 days) used to obtain new access tokens.                                     |
| **RBAC**              | Role-Based Access Control — permissions derived from a user's roles.                              |
| **DTO**               | Data Transfer Object — the validated shape of data crossing a boundary.                          |
| **Contract**          | The agreed request/response or event payload shape between two parties.                           |
| **Correlation ID**    | An ID propagated across services/logs to trace a single request end-to-end.                       |
| **ADR**               | Architecture Decision Record — a short doc capturing one significant decision.                    |
| **Nx**                | Monorepo build system that manages `apps/` and `libs/` with caching and dependency graphs.       |
