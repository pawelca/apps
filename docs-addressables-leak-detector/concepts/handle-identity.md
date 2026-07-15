# Handle identity

Addressables Leak Detector correlates handles using **public API only** — no reflection on private fields such as `m_Version` or `m_InternalOp`.

## Identity fields

| API | Use |
|-----|-----|
| `GetHashCode()` | Primary key for live registry |
| `Equals()` | Equality comparison |
| `IsValid()` | Whether handle still references an operation |
| `DebugName` | Human-readable asset/scene label in UI |

## Struct copies

`AsyncOperationHandle` is a **struct**. ILPP captures load at the call site and immediately stores the returned value in a local variable before subscribing to lifecycle events. Subscribing on the wrong copy would miss `Completed` / `Destroyed`.

The injector follows the rule: **never `Dup` immediately after an Addressables load `call`** — use `stloc` + `ldloc` instead.

## IsValid() caveat

`IsValid()` can return `true` after `Release()` when the same `AssetReference` is used elsewhere. Use it for identity checks, not as the sole leak verdict.

## Reload same address

Loading the same address twice creates **distinct** handles with different hash codes. Live Leaks may show multiple entries or **RedundantLoad** severity when both are live.

## Related call sites

The detail panel can show other live handles for the same asset key, helping you find duplicate loads from different scripts.

## See also

- [Layers and event log](./layers-and-event-log.md)
- [IL patterns and limitations](../reference/il-limitations.md)
