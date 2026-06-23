# 03 — Contract Testing

Ensures that when a producer changes an event payload (or API response), consumers don't break
silently at runtime. Catches shape mismatches at compile time and test time.

## Two levels of contracts

### 1. Compile-time contracts (shared types)

The primary safety net. `@app/contracts` defines:
- Event payload interfaces (`OrderCreatedV1`, `ProductStockChangedV1`, etc.)
- REST response DTO types

Both producer and consumer import from `@app/contracts`. A breaking change (rename a field,
change a type) is a **compile error** caught in CI before merge.

```ts
// producer (orders-service)
import { ORDER_CREATED, OrderCreatedV1 } from '@app/contracts';
publisher.publish<OrderCreatedV1>(ORDER_CREATED, { ...payload });

// consumer (notification-service, later)
import { ORDER_CREATED, OrderCreatedV1 } from '@app/contracts';
@EventPattern(ORDER_CREATED)
async handle(data: OrderCreatedV1) { ... }
```

If `OrderCreatedV1` gains a required field, both sides fail to compile until updated.

### 2. Runtime contract tests (schema assertions)

For catching additive-but-breaking changes (wrong enum value, wrong number format) and for
documenting what consumers actually need from a payload.

**Approach (lightweight, no Pact server):**

Each consumer test suite includes a contract spec that asserts the shape of a fixture event
produced by the producer:

```ts
// apps/orders-service/test/contracts/product-events.contract.spec.ts
import { ProductStockChangedV1 } from '@app/contracts';
import { productStockChangedFixture } from '@app/testing/fixtures';

describe('Contract: product.stock_changed consumed by orders-service', () => {
  it('has all required fields', () => {
    const evt = productStockChangedFixture();
    expect(evt).toMatchObject<ProductStockChangedV1>({
      eventId: expect.any(String),
      version: 1,
      occurredAt: expect.stringMatching(/^\d{4}-/),
      productId: expect.any(String),
      previousQty: expect.any(Number),
      newQty: expect.any(Number),
      reason: expect.any(String),
    });
  });
});
```

Fixtures live in `@app/testing/fixtures/` and are the **single source of test data truth** — if
the producer changes the fixture, every consumer contract that uses it either still passes
(backward-compatible) or fails immediately (breaking change detected).

## Event versioning contract

If a breaking change is unavoidable:

1. Add a new routing key (`product.stock_changed.v2`) and new type (`ProductStockChangedV2`).
2. Publish on both keys during a transition window.
3. Consumers migrate to v2; old key deprecated in a later release.
4. Record in [Event Catalog](../01-architecture/06-event-catalog.md).

This pattern means consumers are never silently broken by a producer upgrade.

## API response contracts (optional, per-service)

For REST endpoints, `@nestjs/swagger` generates an OpenAPI spec at build time. A contract test
asserts the spec hasn't changed in a breaking way:

```bash
# generate spec
nx run auth-service:swagger-export > openapi/auth.json

# in CI: compare with committed baseline
git diff --exit-code openapi/auth.json
```

Diff forces a conscious review of any API contract change before merge.

## When to use Pact (optional upgrade)

If the team grows and consumer-driven contract testing across repos becomes valuable, introduce
[Pact](https://pact.io/). The lightweight approach above covers Phase 1 well; Pact becomes useful
when:
- Multiple independent teams/repos consume the same events.
- A central Pact Broker is available to share consumer expectations.

This is an ADR-worthy upgrade, not a default from day one.
