# Quick Start

This guide gets you from zero to a readable **SUB / INVOKE / UNSUB** timeline in a few minutes.

## Prerequisites

- Unity project with Event Monitor installed (see [Installation](./installation.md)).
- You are comfortable entering **Play Mode** in the Editor.

## Steps

### 1. Open the Event Monitor window

Use the menu: **Window → Event Monitor**.

### 2. Enable recording

In the toolbar, ensure **Record** is on (green indicator). When recording is off, new records are not appended.

### 3. Enter Play Mode

Press **Play** and exercise your game or UI. Event Monitor only captures activity while the Editor is in Play Mode (and while recording is enabled).

### 4. Read the Log tab

Open the **Log** tab. You should see rows such as:

- **SUB** — something subscribed to an event.
- **UNSUB** — something unsubscribed.
- **INVOKE** — an instrumented invocation ran (see [IL patterns and limitations](../reference/il-limitations.md) if a fire is missing).

Use the toggles to filter by action type. Use the search field to narrow by event name, owner type, or subscriber type.

### 5. Inspect subscribers

Open the **Subscribers** tab to see the **current** listener graph: `OwnerType :: EventName -> SubscriberType :: MethodName`.

## Expected first log (golden path)

For a standard MonoBehaviour listener lifecycle, the first healthy sequence usually looks like:

1. `OnEnable` subscribes -> one or more **SUB** rows
2. Trigger method calls `?.Invoke(...)` -> **INVOKE** row
3. `OnDisable` unsubscribes -> **UNSUB** row

If your log does not follow this baseline, check [Filtering and missing INVOKE rows](../how-to/filtering-and-missing-invoke.md) first.

### 6. Try time travel (optional)

Select a row in the **Log**, enable **Time Travel**, and scrub the slider. Open **Subscribers** again: the graph reflects **subscriber state replayed from SUB/UNSUB only** up to that log position. The log itself does not rewind.

### 7. Export (optional)

Choose a format in the toolbar and use **Copy Log** to copy the filtered timeline to the clipboard.

### 8. Advanced features (1.1+)

After the basics work, explore:

| Feature | Where | Guide |
|---------|-------|-------|
| Save / load timeline | Toolbar **Save…** / **Load…** | [Session save/load](../how-to/session-save-load.md) |
| Subscriber diff | **Subscribers** tab, pin row A | [Diff view](../how-to/diff-view.md) |
| Re-fire event | **Log** detail **⚡ Re-fire** | [Manual dispatch](../how-to/manual-dispatch.md) |
| Leaks | **Stats** → Leaks | [Leak detection](../how-to/leak-detection.md) |
| Invoke duration | Toolbar **⏱ Timing** | [Invoke timing](../how-to/invoke-timing.md) |
| Assembly scope | Toolbar **⚙ Assemblies** | [Assembly filters](../how-to/assembly-filters.md) |
| Compare `.emsession.json` | **Stats** compare | [Compare sessions](../how-to/compare-sessions.md) |
| Exception context | **Exceptions** tab | [Exception breadcrumbs](../how-to/exception-breadcrumbs.md) |
| Runaway subscribers | **Growth Alerts** tab | [Subscriber growth alerts](../how-to/subscriber-growth-alerts.md) |

The [demo scene](../how-to/demo-scene.md) includes buttons for leaks, growth, timing, exceptions, and diff view.

## Demo scene

The fastest way to see realistic traffic is the one-click demo:

**Tools → Event Monitor → Generate Demo Scene**

Then Play, click the labeled buttons, and match **INVOKE** lines to the on-screen hints. See [Generate the demo scene](../how-to/demo-scene.md).

## See also

- [Installation](./installation.md)
- [Minimal code example](./code-example.md)
- [Filtering and missing INVOKE rows](../how-to/filtering-and-missing-invoke.md)
- [Troubleshooting & FAQ](../troubleshooting/faq.md)
