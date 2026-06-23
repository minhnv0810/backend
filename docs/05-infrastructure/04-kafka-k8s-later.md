# 04 — Kafka & Kubernetes (LATER PHASE)

Design notes for the Phase 2+ infrastructure evolution. Nothing here needs to be built now —
it records intent so Phase 1 decisions don't accidentally block the path.

## Kafka — when and why

RabbitMQ is excellent for low-to-medium volume command/event messaging. Kafka is added when:

- Event throughput exceeds RabbitMQ comfort zone (high-volume analytics, real-time feeds).
- An **event log** / event sourcing / replay capability is needed.
- Multiple independent consumer groups need to read the same event independently at their own pace.

**Plan:** RabbitMQ stays for domain events between services. Kafka is added as a
**separate event stream layer** for high-volume/analytics use cases — not a direct replacement.

## Migration path (enabled by @app/messaging abstraction)

Because services publish/consume through the `EventPublisher` / `EventConsumer` interfaces in
`@app/messaging`, swapping the broker for a specific topic is a configuration change:

```ts
// today (RabbitMQ)
MessagingModule.forFeature({ transport: 'rabbitmq', topics: ['order.created'] })

// later (Kafka for high-volume topics)
MessagingModule.forFeature({ transport: 'kafka', topics: ['order.created'] })
```

Domain code is untouched. Shared lib absorbs the transport difference.

## Kubernetes — when and why

Docker Compose is sufficient for Phase 1 (local + simple staging). K8s is added when:

- Multiple replicas / horizontal autoscaling are needed.
- Rolling zero-downtime deploys are required.
- Independent scaling of services is important (orders scales differently from auth).
- A service mesh (mTLS, circuit breaking at the infra level) is wanted.

## K8s architecture sketch

```
Ingress (nginx/traefik)
  └── api-gateway Deployment (2+ replicas)
       ├── auth-service Deployment
       ├── product-service Deployment (read replicas via PG read replica)
       └── orders-service Deployment
External:
  PostgreSQL → managed (RDS / Cloud SQL), one instance per service
  RabbitMQ   → managed (CloudAMQP / Amazon MQ) or RabbitMQ Operator
  Kafka      → managed (Confluent Cloud / MSK)
```

## What to prepare in Phase 1

These Phase 1 choices make the K8s migration cheap:

| Phase 1 choice                       | Why it helps K8s                             |
| ------------------------------------ | -------------------------------------------- |
| Stateless services (no in-memory state) | Horizontal scaling trivial                 |
| Health endpoints `/health/live+ready`   | K8s probes work out of the box             |
| Structured logs to stdout               | Works with any log aggregator (Loki, ELK)  |
| Config from env vars only               | K8s ConfigMap + Secret already the pattern |
| Docker multi-stage images               | Image is K8s-ready already                 |
| `@app/messaging` abstraction            | Broker swap = lib upgrade, not rewrites    |

## Helm chart structure (sketch)

```
helm/
  Chart.yaml
  values.yaml
  templates/
    api-gateway/deployment.yaml, service.yaml, hpa.yaml
    auth-service/...
    product-service/...
    orders-service/...
    rabbitmq/... (or external)
    ingress.yaml
    network-policies.yaml
```

## Network policies (K8s)

- Only `api-gateway` is reachable from outside the cluster.
- Services only accept inbound from `api-gateway` (HTTP) and from the message broker namespace.
- This enforces the same trust boundary defined in [Security](../01-architecture/09-security.md)
  at the infrastructure level.
