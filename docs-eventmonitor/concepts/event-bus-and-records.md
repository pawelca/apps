# Event bus and records

## EventBus

`EventBus` is the central **append-only** store for everything the window shows. Instrumentation (ILPP and, optionally, reflection-based discovery) calls into it to append **immutable** records.

Characteristics:

- **Ring buffer** — fixed capacity; oldest records are evicted when full (counters are adjusted accordingly).
- **Thread safety** — internal locking around the ring and derived structures used by the UI.
- **Editor-oriented** — designed for Play Mode debugging, not shipping player builds as a telemetry bus.

::: tip
Treat `EventBus` as an implementation detail for **reading** in custom tooling if you must; prefer the **Event Monitor** window for day-to-day use.
:::

## EventRecord

Each **SUB**, **UNSUB**, or **INVOKE** becomes an `EventRecord` with:

| Field (conceptual) | Sub / Unsub | Invoke |
|--------------------|-------------|--------|
| Event name | Yes | Yes |
| Owner type name | Yes | Yes |
| Owner instance id | Yes | Yes |
| Action type | Subscribed / Unsubscribed | Invoked |
| Subscriber type / method | Yes | N/A |
| Subscriber count | N/A | Yes (from live state) |
| Parameters | N/A | Optional (payload capture) |

Records are **never mutated** after creation; the log is a timeline you can filter, export, and scrub for time travel.

## Live subscriber state

Alongside the ring, the bus maintains a **live** map keyed by `OwnerTypeName::EventName` with a set of `"SubscriberType::MethodName"` entries. This drives:

- **Subscriber count** on **INVOKE** rows (without re-reading delegate fields in injected IL).
- The **Subscribers** tab and time-travel replay.

::: warning
The live map key does **not** include instance id. Multiple instances of the same owner type share one bucket per event name for counting purposes. Instance id still appears on individual records for context.
:::

## See also

- [ILPP vs ReflectionScanner](./ilpp-vs-reflection-scanner)
- [Time travel and subscribers](./time-travel-and-subscribers)
- [EventBus API reference](../reference/event-bus-api)
