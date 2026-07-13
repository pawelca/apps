# Leak detection

**Goal:** Find event subscriptions whose handler target (`UnityEngine.Object`) was destroyed without an unsubscribe.

## How it works

When IL instrumentation records a subscribe, Event Monitor tracks handlers whose delegate target is a `UnityEngine.Object` using a **weak reference**. On scene unload and periodic scans in Play Mode, destroyed targets are reported as leaks.

## Where to see leaks

1. Open **Window → Event Monitor**.
2. Open the **Stats** tab.
3. Review the **Leaks** section. When leaks exist, the tab label shows `Stats (N leaks)`.

Each leak row lists event name, owner type, subscriber type, method, and detection context.

## Limitations

- **Unity object targets only** — static handlers and pure C# object targets are not tracked.
- **Requires recording** — leak tracking runs when **Record** is ON.
- **Not a substitute for domain reload analysis** — best for Play Mode lifecycle bugs (destroy without `-=`).

## Typical fix

Unsubscribe in `OnDisable` / `OnDestroy` before the subscriber object is destroyed:

```csharp
void OnDisable()
{
    owner.OnChanged -= HandleChanged;
}
```

## See also

- [Event bus and records](../concepts/event-bus-and-records.md)
- [IL limitations](../reference/il-limitations.md)
