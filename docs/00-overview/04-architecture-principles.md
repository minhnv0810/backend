# 04 — Architecture Principles

These principles are the tie-breakers. When a design choice is unclear, prefer the option that
best honors the principles below (in order).

## 1. Each service owns its data

No service reads or writes another service's database. Data needed elsewhere is either:
- requested synchronously via the owning service's API, or
- replicated locally by consuming that service's events (read model).

> Consequence: `orders-service` never joins to `product` tables. It stores a **snapshot** of
> product price/name at order time, kept fresh by `product.*` events.

## 2. Sync for queries, async for facts

- **Synchronous REST** when the caller needs an answer *now* (e.g. gateway → auth to validate).
- **Asynchronous events** to announce that something *happened* (e.g. `order.created`).

Avoid synchronous call chains more than one hop deep; they couple availability.

## 3. Events are immutable facts in the past tense

An event states what already happened. Consumers decide what to do. Producers never assume who
is listening. See [Event Catalog](../01-architecture/06-event-catalog.md).

## 4. Design for failure

- Every consumer is **idempotent** (safe to receive duplicates).
- Every queue has retry + a **dead-letter queue**.
- Reliable publishing uses the **outbox pattern** for state-changing events.
- Timeouts, retries with backoff, and circuit breakers on sync calls.

See [Error Handling & Resilience](../01-architecture/07-error-handling.md).

## 5. Contracts are explicit and shared

Request/response DTOs and event payloads live in a shared `@app/contracts` library so producer
and consumer compile against the same types. Breaking changes are versioned, never silent.

## 6. Stateless services

Services hold no session state in memory. All state is in Postgres or carried in the request
(JWT). This makes horizontal scaling and K8s migration trivial later.

## 7. Secure by default

- The gateway is the only public surface; services are not exposed externally.
- JWTs are validated at the edge; services trust forwarded identity headers.
- Secrets come from the environment/secret manager, never from code. See
  [Security](../01-architecture/09-security.md).

## 8. Observable by default

Structured logs, a propagated correlation id, health endpoints, and metrics are part of every
service from day one — not bolted on later. See [Observability](../01-architecture/08-observability.md).

## 9. Infrastructure is swappable

Business logic depends on **abstractions** (`@app/rmq` messaging interface), not on RabbitMQ
directly. This is what lets us add Kafka later for high-volume streams without touching domain code.

## 10. Start simple, evolve deliberately

Phase 1 ships the smallest thing that proves the architecture (auth + product + orders). Payment,
notification, Kafka, and K8s are added only when their value is needed — each behind an ADR.
