# Troubleshooting & FAQ

## I see no rows at all

1. **Play Mode** — Event Monitor is aimed at Play sessions (timestamps and frame info assume runtime).
2. **Record** — Ensure the toolbar **Record** toggle is on.
3. **ILPP** — Confirm `recordingEnabled` is not `false` in `Library/EventMonitor/ilpp_settings.json`. Enable [ILPP diagnostics](../how-to/ilpp-diagnostics) and recompile.
4. **Code path** — Trigger a known `+=` or `?.Invoke()` in an **instrumented** assembly.

## SUB appears but INVOKE never does

- **Null delegate** — `?.Invoke()` does not call `Invoke` when there are no subscribers; no injection site runs.
- **Filter** — Clear the log **search** field; disable overly narrow filters. See [Filtering and missing INVOKE rows](../how-to/filtering-and-missing-invoke).
- **Pattern** — Firing through helpers may skip the injector. See [IL patterns and limitations](../reference/il-limitations).

## Duplicate or “extra” SUB/UNSUB lines

**ReflectionScanner** plus ILPP can both observe subscription changes. See [ILPP vs ReflectionScanner](../concepts/ilpp-vs-reflection-scanner).

## Payload always empty

- Turn **Payload** on in the toolbar.
- Ensure `EnablePayloadCapture` is effectively true for the session.
- For non-instrumented invocations, use `TagPayload` immediately before firing.

## Performance concerns

- Keep **Payload** and **Stack Traces** off unless needed.
- Avoid **Payload Details** on large object graphs during long Play sessions.

## Where is the demo scene?

**Tools → Event Monitor → Generate Demo Scene** — see [Generate the demo scene](../how-to/demo-scene).

## Full documentation index

Start at [Overview](/) or [Quick Start](../guide/quick-start).
