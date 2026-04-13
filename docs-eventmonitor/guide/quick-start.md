# Quick Start

This guide gets you from zero to a readable **SUB / INVOKE / UNSUB** timeline in a few minutes.

## Prerequisites

- Unity project with Event Monitor installed (see [Installation](./installation)).
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
- **INVOKE** — an instrumented invocation ran (see [IL patterns and limitations](../reference/il-limitations) if a fire is missing).

Use the toggles to filter by action type. Use the search field to narrow by event name, owner type, or subscriber type.

### 5. Inspect subscribers

Open the **Subscribers** tab to see the **current** listener graph: `OwnerType :: EventName → SubscriberType :: MethodName`.

### 6. Try time travel (optional)

Select a row in the **Log**, enable **Time Travel**, and scrub the slider. Open **Subscribers** again: the graph reflects **subscriber state replayed from SUB/UNSUB only** up to that log position. The log itself does not rewind.

### 7. Export (optional)

Choose a format in the toolbar and use **Copy Log** to copy the filtered timeline to the clipboard.

## Demo scene

The fastest way to see realistic traffic is the one-click demo:

**Tools → Event Monitor → Generate Demo Scene**

Then Play, click the labeled buttons, and match **INVOKE** lines to the on-screen hints. See [Generate the demo scene](../how-to/demo-scene).

## See also

- [Installation](./installation)
- [Minimal code example](./code-example)
- [Filtering and missing INVOKE rows](../how-to/filtering-and-missing-invoke)
- [Troubleshooting & FAQ](../troubleshooting/faq)
