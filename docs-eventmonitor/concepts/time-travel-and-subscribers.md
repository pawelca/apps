# Time travel and subscribers

## What time travel does

In the **Log** tab, after you **select a row**, you can enable **Time Travel** and move the slider. Event Monitor **replays SUB and UNSUB records only** from the start of the session up to the chosen index and rebuilds the **subscriber graph** shown on the **Subscribers** tab.

So at any scrub position you can ask: *“Who was subscribed to each event at this point in the timeline?”*

## What time travel does not do

- The **log list** does not rewind — you are not viewing history-only UI; you are choosing a **cut point** for subscriber state.
- **INVOKE** rows do not change the replayed graph (invocations do not add or remove listeners in this model).

## Workflow

1. Open **Log**, find an interesting **INVOKE** or **SUB** row.
2. Select it, enable **Time Travel**, scrub if needed.
3. Open **Subscribers** — the graph matches replayed state at the scrub index.

## Live vs replayed

With time travel **off**, **Subscribers** shows **live** state (current handlers). With time travel **on**, it shows **replayed** state at the slider position.

## See also

- [Event bus and records](./event-bus-and-records)
- [Quick Start](../guide/quick-start)
