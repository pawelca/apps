# Manual dispatch (Re-fire)

## Goal
Dispatch an event from inside the Event Monitor window and record a fresh **INVOKE** row — without reproducing the whole in-game scenario.

## Requirements
- Works in **Play Mode**.
- Use the **live** log (not a loaded JSON session).

## How to re-fire
1. Open **Window → Event Monitor**.
2. Open the **Log** tab.
3. Select an **INVOKE** row in the timeline.
4. Click **⚡ Re-fire** in the detail panel.
5. The window records a new **INVOKE** row (EventBus timeline grows), and subscribers are invoked through reflection.

## What's recorded (and what isn't)
- Event name + owner identity come from the selected INVOKE record.
- When the selected row has a captured payload, **Re-fire** passes those argument values to subscribers and to the new INVOKE row.
- When the row has no payload (or an empty argument list), arguments fall back to **default values per parameter type** (`0` for `int`, `null` for reference types).
- If `📦 Payload` is enabled, the invoke arguments are stored on the new INVOKE row; otherwise the row is logged without payload.

## Error cases
- If the owner instance isn't found in the current scene, the action shows a dialog error.
- If the delegate signature can't be resolved, the action shows a dialog error.
- If payload argument count does not match the event signature, or a value cannot be coerced to the parameter type, the action shows a dialog error.
