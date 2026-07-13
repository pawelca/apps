# Invoke timing

**Goal:** Measure how long each event invocation takes (all handlers combined) and surface slow events in the Stats tab.

## Enable timing

1. Open **Window → Event Monitor**.
2. Toggle **⏱ Timing** in the toolbar (persisted across Editor restarts).
3. Enter Play Mode and trigger instrumented events.

Timing is **runtime-gated** — no script recompile is required when toggling the setting.

## What gets measured

IL Post Processing injects `BeginInvokeTiming` / `EndInvokeTiming` around each instrumented `Invoke()` call site. Duration is stored on the INVOKE record as `DurationMs`.

When enabled, Unity Profiler shows markers named `EventMonitor.<EventName>`.

## Where to see results

- **Log → Detail panel** — duration line on INVOKE rows with timing data.
- **Stats tab** — **Slowest events (avg invoke duration)** bar chart (top 10).

## Notes

- Measures **total invoke time** for all handlers in one multicast call, not per-handler breakdown.
- Null-conditional `?.Invoke()` with no subscribers may not be instrumented (no `Invoke` opcode).
- Very short invokes may round to `0.00 ms` in the UI.

## See also

- [ILPP vs Reflection Scanner](../concepts/ilpp-vs-reflection-scanner.md)
- [IL limitations](../reference/il-limitations.md)
