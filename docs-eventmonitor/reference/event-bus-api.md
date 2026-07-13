# EventBus API

This page summarizes the **public** `EventBus` surface area as used by Event Monitor. Names and signatures follow the Unity package; always verify in your installed version.

Namespace: `EventMonitor.Runtime`

## Runtime settings

| Member | Purpose |
|--------|---------|
| `IsRecording` | When `false`, new records are not appended. |
| `EnablePayloadCapture` | When `true`, payload capture paths are active (toolbar + `TagPayload`). |
| `CaptureStackTraces` | When `true`, new records may include stack traces (higher overhead). |
| `CaptureInvokeTiming` | When `true`, IL-injected Begin/End timing records `DurationMs` on INVOKE rows and emits Profiler markers. |

Editor session persistence of these flags is handled by Editor-only settings code.

## Manual recording (advanced)

These are safe to call from **custom tooling** or tests. Game code usually relies on **ILPP** instead.

| Method | Use |
|--------|-----|
| `RecordSubscribe(eventName, ownerType, ownerInstanceId, subscriberType, subscriberMethod)` | Append a **SUB** row and update live state. |
| `RecordUnsubscribe(...)` | Append an **UNSUB** row and update live state. |
| `RecordInvoke(eventName, ownerType, ownerInstanceId, subscriberCount, parameters, parameterNames)` | Append an **INVOKE** row with optional parallel parameter names. |

## Payload tagging

| Method | Use |
|--------|-----|
| `TagPayload(params object[] args)` | Attach argument **values** to the **next** invocation on this thread when payload capture is enabled. Names use UI fallbacks unless set via `TagPayloadWithNames`. |
| `TagPayloadWithNames(string[] names, object[] args)` | Attach **named** payload to the next invocation (used by ILPP; available for custom dispatch). |

## Injected entry points (do not call from gameplay)

ILPP injects calls to **static** helpers such as:

- `RecordSubscribeDelegate(string eventName, string ownerType, int instanceId, Delegate handler)`
- `RecordUnsubscribeDelegate(...)`
- `RecordInvokeDelegate(string eventName, string ownerType, int instanceId)`
- `BeginInvokeTiming(string eventName)` / `EndInvokeTiming(string eventName)` — bracket instrumented `Invoke()` for duration capture.

They are **not** intended for manual use; they exist so rewritten IL can report activity with stable signatures.

> **Warning:** Relying on injected methods from hand-written code is fragile and may break across package updates.

## UI integration

| Member | Purpose |
|--------|---------|
| `OnRecordAdded` | Raised when a record is appended (Editor window repaints). |

## Stats and queries

The package exposes counters and ring-buffer stats (for example total records, invoke counts) for the **Stats** tab and toolbar. Exact property names may vary by version — inspect `EventBus` in your IDE.

## Leak detection

| Member | Purpose |
|--------|---------|
| `EventMonitorLeakDetector.DetectedLeaks` | Read-only list of detected subscription leaks. |
| `EventMonitorLeakDetector.LeakCount` | Number of unique detected leaks. |
| `EventMonitorLeakDetector.ScanNow()` | Force a leak scan (tests / manual refresh). |

## Exception breadcrumbs

| Member | Purpose |
|--------|---------|
| `EventMonitorExceptionBreadcrumbs.GetBreadcrumbs()` | Read captured Play Mode exceptions with preceding timeline records. |
| `EventMonitorExceptionBreadcrumbs.BreadcrumbCount` | Number of stored exception entries. |

## Subscriber growth alerts

| Member | Purpose |
|--------|---------|
| `EventMonitorSubscriberGrowthMonitor.RecentWarnings` | Read recent growth warnings. |
| `EventMonitorSubscriberGrowthMonitor.WarningCount` | Number of warnings in the recent list. |
| `EventMonitorSubscriberGrowthMonitor.Threshold` / `MinGrowthStreak` | Runtime thresholds (Editor UI persists via EditorPrefs). |

## See also

- [Session save/load](../how-to/session-save-load.md)
- [Leak detection](../how-to/leak-detection.md)
- [Invoke timing](../how-to/invoke-timing.md)
- [Exception breadcrumbs](../how-to/exception-breadcrumbs.md)
- [Subscriber growth alerts](../how-to/subscriber-growth-alerts.md)
- [Capture invocation payloads](../how-to/payload-capture.md)
- [IL patterns and limitations](./il-limitations.md)
