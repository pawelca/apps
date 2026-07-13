# Diff view (Subscribers)

## Goal
See how the **subscriber buckets** changed between two points in the timeline (Redux DevTools–style “Diff”).

## Steps
1. Open **Window → Event Monitor**.
2. Go to the **Log** tab.
3. Turn **⏪ Time Travel** on.
4. Move the slider to the row you want as baseline **A**.
5. Click **Pin A**.
6. Now move the slider again to row **B**.
7. Open the **Subscribers** tab — it will show **+ Added** and **− Removed** subscriber sets compared to the pinned A row.

## What you get
- Changes are computed only from **SUB/UNSUB** rows.
- **INVOKE** rows do not change the subscriber graph (they only show “what fired”).  

## Notes / limitations
- Pin A is valid only while the pinned row stays inside your current log filters. If it disappears, the pin is cleared.
- In the diff view, the list can be large for fan-out events; use the unchanged foldout if needed.

