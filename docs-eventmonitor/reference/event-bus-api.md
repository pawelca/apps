# EventBus API

This page summarizes the **public** `EventBus` surface area as used by Event Monitor. Names and signatures follow the Unity package; always verify in your installed version.

## Runtime settings

| Member | Purpose |
|--------|---------|
| `IsRecording` | When `false`, new records are not appended. |
| `EnablePayloadCapture` | When `true`, payload capture paths are active (toolbar + `TagPayload`). |
| `CaptureStackTraces` | When `true`, new records may include stack traces (higher overhead). |

Editor session persistence of these flags is handled by Editor-only settings code.

## Manual recording (advanced)

These are safe to call from **custom tooling** or tests. Game code usually relies on **ILPP** instead.

| Method | Use |
|--------|-----|
| `RecordSubscribe(eventName, ownerType, ownerInstanceId, subscriberType, subscriberMethod)` | Append a **SUB** row and update live state. |
| `RecordUnsubscribe(...)` | Append an **UNSUB** row and update live state. |
| `RecordInvoke(eventName, ownerType, ownerInstanceId, subscriberCount, parameters)` | Append an **INVOKE** row. |

## Payload tagging

| Method | Use |
|--------|-----|
| `TagPayload(params object[] args)` | Attach arguments to the **next** invocation on this thread when payload capture is enabled. Call immediately before firing the event. |

## Injected entry points (do not call from gameplay)

ILPP injects calls to **static** helpers such as:

- `RecordSubscribeDelegate(string eventName, string ownerType, int instanceId, Delegate handler)`
- `RecordUnsubscribeDelegate(...)`
- `RecordInvokeDelegate(string eventName, string ownerType, int instanceId)`

They are **not** intended for manual use; they exist so rewritten IL can report activity with stable signatures.

::: warning
Relying on injected methods from hand-written code is fragile and may break across package updates.
:::

## UI integration

| Member | Purpose |
|--------|---------|
| `OnRecordAdded` | Raised when a record is appended (Editor window repaints). |

## Stats and queries

The package exposes counters and ring-buffer stats (for example total records, invoke counts) for the **Stats** tab and toolbar. Exact property names may vary by version — inspect `EventBus` in your IDE.

## See also

- [Capture invocation payloads](../how-to/payload-capture)
- [IL patterns and limitations](./il-limitations)
