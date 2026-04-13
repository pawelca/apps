# Capture invocation payloads

**Goal:** See **argument values** on **INVOKE** rows in the Event Monitor log.

**Prerequisites:** Event Monitor installed; Play Mode; ILPP instrumentation active for the invocation site (or manual tagging — below).

## Enable payload capture

1. Open **Window → Event Monitor**.
2. Toggle **Payload** (toolbar) **on**.

When enabled, the IL-instrumented path can record invocation parameters into the ring buffer. Zero-argument events still appear; the UI distinguishes **no args** from untagged payloads.

::: warning Performance and safety
Payload capture increases **allocations** (including boxing for value types) and **log size**. Keep it off during normal profiling unless you need arguments. **Payload Details** (reflection) is heavier still — use only for focused debugging.
:::

## Optional: `TagPayload` before firing

For patterns **not** covered by automatic injection, or when you need explicit control, call `EventBus.TagPayload(...)` **immediately before** invoking the event:

```csharp
EventBus.TagPayload(damage, remainingHp, source);
OnDamaged?.Invoke(damage, remainingHp, source);
```

Tagging is respected when payload capture is enabled and recording is on.

## Payload details (reflection)

Enable **Payload Details** to inspect public fields/properties on payload objects (with safe limits: item count, depth, cycle detection). Use sparingly.

## See also

- [IL patterns and limitations](../reference/il-limitations)
- [EventBus API](../reference/event-bus-api)
