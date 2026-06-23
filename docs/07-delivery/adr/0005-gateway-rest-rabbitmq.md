# ADR 0005 — API Gateway + REST (sync) + RabbitMQ (async)

## Status

Accepted

## Context

We need to decide: (a) how clients reach services, and (b) how services communicate with each
other. There are several viable patterns for a NestJS microservice system.

**Options for client access:**
1. Clients hit services directly (no gateway).
2. A dedicated API Gateway fronts all services.

**Options for inter-service communication:**
1. Pure REST between services.
2. All communication over RabbitMQ (NestJS message patterns for both RPC and events).
3. REST for synchronous calls + RabbitMQ for events.

## Decision

**API Gateway for all client traffic + REST for synchronous service-to-service calls +
RabbitMQ topic exchange for asynchronous domain events.**

## Reasons

### API Gateway

- Single public entry point: TLS termination, JWT validation, rate limiting, and routing in one
  place. Services remain unexposed.
- JWT verification happens once at the edge; downstream services trust forwarded identity headers.
  No duplicated token-verify logic in every service.
- Rate limiting, CORS, and `helmet` headers configured in one place.
- Easy to replace with a managed gateway (Kong, AWS API GW) later without touching services.

### REST for synchronous calls

- Familiar, debuggable, works with standard HTTP tooling (curl, Postman, Supertest).
- `POST /products/availability` is a natural fit: caller needs an immediate answer before
  proceeding. REST with a timeout + circuit breaker is the right tool.
- Avoids the complexity of RabbitMQ RPC (correlation IDs in the broker, timeout handling, reply
  queues) for simple request/response patterns.

### RabbitMQ for domain events

- Decouples producers from consumers. auth-service doesn't know who cares about `user.registered`.
- Enables fan-out: `order.created` can trigger payment AND notification simultaneously with zero
  coupling between them.
- Durable queues + manual-ack ensure at-least-once delivery; idempotent handlers handle duplicates.
- Topic exchange with routing keys gives flexible, discoverable event routing.
- `@nestjs/microservices` has a first-class RabbitMQ transport, so integration is idiomatic.

### Why not all-RabbitMQ (option B)?

RabbitMQ RPC patterns add complexity (reply queues, correlation IDs, timeout handling) that
standard HTTP already solves cleanly. Mixing RPC + events in the broker conflates two different
communication needs. REST is also easier to debug and monitor for synchronous calls.

## Consequences

**Easier:**
- Clear mental model: REST = "give me an answer now", events = "something happened".
- Adding a new consumer of an existing event requires zero producer change.
- Circuit breaker + timeout on REST calls prevents cascade failures.
- RabbitMQ management UI gives immediate visibility into event queues.

**Harder:**
- Two communication mechanisms to understand and operate (but they have well-defined roles).
- Sync REST chains longer than one hop become a reliability concern (we limit to one hop max).
- RabbitMQ is an additional infrastructure dependency.

## Future evolution

When high-volume event streaming is needed, Kafka is added **alongside** RabbitMQ (not replacing
it) for those specific high-throughput topics. The `@app/messaging` abstraction makes this a
configuration change. See [ADR 0005 follow-up] and [Kafka & K8s](../../05-infrastructure/04-kafka-k8s-later.md).
