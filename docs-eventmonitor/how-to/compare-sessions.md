# Compare sessions (A vs B)

## Goal
Compare two previously saved `.emsession.json` sessions and see per-event deltas (INVOKE/SUB) plus timing regression signals.

## Steps
1. Open **Window → Event Monitor**.
2. Click **🆚 Compare…** in the toolbar.
3. Select session **A** and then session **B**.
4. Review the **Stats** view:
   - events only in A (red),
   - events only in B (green),
   - timing regression highlight (orange).

## Notes
- Compare mode is read-only.
- Comparison is computed from INVOKE/SUB rows captured in the sessions; subscriber state deltas are aggregated per event name.
- Use **Back to live** to return to the live EventBus timeline.

