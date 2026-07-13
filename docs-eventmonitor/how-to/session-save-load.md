# Save and load sessions

**Goal:** Share a reproducible event timeline between QA and developers using a `.emsession.json` file.

**Prerequisites:** A live session with at least one recorded row (or a file saved earlier).

## Save (live session)

1. Open **Window → Event Monitor**.
2. Capture events in Play Mode (or via IL-instrumented code).
3. Click **Save…** in the toolbar.
4. Choose a path and filename (`.json` extension is added automatically if omitted).

The file stores all records, metadata (Unity version, UTC timestamp), payload text, stack traces, and invoke durations when captured.

## Load (read-only review)

1. Click **Load…** in the toolbar.
2. Select a `.emsession.json` file.

The window switches to **viewing saved session** mode:

- Log, filters, search, detail panel, and time-travel work on the loaded file.
- Recording toggles are disabled.
- Click **Back to live** (banner or Clear) to return to the live `EventBus`.

## Format versioning

Session files include `formatVersion`. Event Monitor 1.1.0 writes version `1`. Future versions may add fields while keeping import compatibility.

## See also

- [Export the log](./export-log.md) — clipboard copy for quick sharing
- [Time travel and subscribers](../concepts/time-travel-and-subscribers.md)
