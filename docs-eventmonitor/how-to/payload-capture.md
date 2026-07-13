# Capture invocation payloads

**Goal:** See **argument values** on **INVOKE** rows in the Event Monitor log.

**Prerequisites:** Event Monitor installed; Play Mode; ILPP instrumentation active for the invocation site (or manual tagging — below).

## Enable payload capture

1. Open **Window → Event Monitor**.
2. Toggle **Payload** (toolbar) **on**.

When enabled, the IL-instrumented path records invocation **values** and **parameter names** into the ring buffer. Names come from call-site locals (when PDB/debug symbols are available), then from delegate `Invoke` metadata, then fall back to `value` / `arg0`, `arg1`, …

The Log tab shows payloads as JSON, e.g. `{ "id": "Goblin" }` instead of a bare string.

> **Note:** `Action<T>` / `Func<T>` delegate metadata often names the parameter `obj`. For clearer names (`damage`, `enemyId`), use a **custom delegate** with named parameters, or ensure debug symbols are available so call-site local names are captured.

> **Warning — Performance and safety:** Payload capture increases **allocations** (including boxing for value types) and **log size**. Keep it off during normal profiling unless you need arguments. **Payload Details** (reflection) is heavier still — use only for focused debugging.

## Optional: `TagPayload` before firing

For patterns **not** covered by automatic injection, or when you need explicit control, call `EventBus.TagPayload(...)` **immediately before** invoking the event:

```csharp
using EventMonitor.Runtime;

EventBus.TagPayload(damage, remainingHp, source);
OnDamaged?.Invoke(damage, remainingHp, source);
```

For explicit names in custom dispatch flows:

```csharp
EventBus.TagPayloadWithNames(
    new[] { "damage", "remainingHp", "source" },
    new object[] { damage, remainingHp, source });
OnDamaged?.Invoke(damage, remainingHp, source);
```

Tagging is respected when payload capture is enabled and recording is on.

## Payload details (reflection)

Enable **Payload Details** to inspect public fields/properties on payload objects (with safe limits: item count, depth, cycle detection). Use sparingly.

## See also

- [IL patterns and limitations](../reference/il-limitations.md)
- [EventBus API](../reference/event-bus-api.md)
