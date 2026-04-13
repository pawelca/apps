# Filtering and missing INVOKE rows

**Goal:** Find events in a busy log, or diagnose why an expected **INVOKE** line never appears.

## Text filter (search)

The toolbar search matches (case-insensitive) against:

- Event name  
- Owner type name  
- Subscriber type name (for SUB/UNSUB)

::: danger Stale filter hides real rows
If you previously typed a narrow query (for example a substring of **one** event), other events **disappear** from the list even though they were recorded. **Clear the search field** when debugging “missing” events.

On a fresh Play session, the Event Monitor window may reset filters; behavior depends on version — when in doubt, clear the field manually.
:::

## Action toggles

Disable **INVOKE**, **SUB**, or **UNSUB** to hide that category entirely. Ensure **INVOKE** is enabled if you expect invocation lines.

## Recording off

If **Record** is disabled, no new rows are appended. The toolbar shows a clear **recording off** state.

## Why INVOKE might be absent (even when the event ran)

1. **No subscribers** — `event?.Invoke()` often **does not** call `Invoke` when the delegate is null; no IL path means no injected **RecordInvoke** for that fire.
2. **IL pattern** — invocation through a **helper** or **reflection** may not match the injector (see [IL patterns and limitations](../reference/il-limitations)).
3. **Assembly not instrumented** — code in skipped assemblies is not rewritten.
4. **`recordingEnabled: false`** in `ilpp_settings.json` — ILPP does not inject (see [ILPP diagnostics and settings](./ilpp-diagnostics)).

## See also

- [Troubleshooting & FAQ](../troubleshooting/faq)
- [Quick Start](../guide/quick-start)
