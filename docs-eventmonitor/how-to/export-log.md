# Export the log

**Goal:** Copy the **filtered** Event Monitor timeline to the clipboard for sharing, tickets, or offline analysis.

**Prerequisites:** At least one record in the session (or a cleared log — then there is nothing to export).

## Steps

1. Open **Window → Event Monitor**.
2. Use **Log** tab filters (INVOKE / SUB / UNSUB toggles) and the **search** field to narrow rows.
3. Choose a format in the toolbar: **Plain Text**, **CSV**, **JSON**, or **Markdown**.
4. Click **Copy Log**.

The export reflects **only** rows that pass the current filters.

## Formats (overview)

| Format | Typical use |
|--------|-------------|
| Plain Text | Human-readable paste into chat or issues |
| CSV | Spreadsheets, quick charts |
| JSON | Scripts, tooling, structured archives |
| Markdown | Docs, PR descriptions |

## See also

- [Filtering and missing INVOKE rows](./filtering-and-missing-invoke)
