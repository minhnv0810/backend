# ADR 0001 — Record Architecture Decisions

## Status

Accepted

## Context

Significant architectural choices are made during this project. Without a record, the rationale
behind those choices is lost. Future team members encounter "why is it done this way?" moments and
either change things without understanding the trade-offs, or spend time reverse-engineering the
decision.

## Decision

We will document every significant architecture decision as a short ADR in
`docs/07-delivery/adr/`. Each ADR is numbered sequentially, named for the decision, and never
deleted — superseded ADRs are marked `Superseded by ADR NNNN` and kept for history.

## Format

```
# ADR NNNN — Title

## Status
Proposed | Accepted | Rejected | Superseded by ADR NNNN

## Context
Why is this decision being made? What forces are at play?

## Decision
What was decided?

## Consequences
What becomes easier? What becomes harder? What are we trading off?
```

## Consequences

- More upfront work per decision.
- Future engineers (and future us) can understand decisions without interrogating git blame.
- ADRs become the required pre-implementation step for any phase 2+ architectural change.
