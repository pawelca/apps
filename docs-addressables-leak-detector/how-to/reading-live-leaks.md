# Reading Live Leaks

The **Live Leaks** tab is the primary MVP interface for inspecting handles that are still live at the current moment in Play Mode.

## Layout

- **List pane** (left) — grouped entries sorted by severity, age, or occurrence count.
- **Detail pane** (right) — leak trace, severity badge, actions, optional stack trace.
- Split width is resizable and persisted in EditorPrefs.

## Toolbar controls

| Control | Purpose |
|---------|---------|
| **Recording / Paused** | Toggle event capture (triggers ILPP recompile) |
| **Verbose** | Capture stack traces at load/release (more overhead) |
| **Clear** | Reset event log and live registry |
| **Show ignored** | Include allowlisted patterns in the list |
| **Search** | Filter groups by asset key or call site |
| **Live counter** | Group count + worst severity indicator |

## List columns (conceptual)

Each group shows:

- Asset or scene key (`DebugName` / resolved address)
- Call site (`FileName:line` or member name)
- Operation kind (LoadAsset, Instantiate, LoadScene, …)
- Handle count when multiple live handles share the same site (`×N`)
- Severity color dot

## Detail panel

- **Leak trace** — chronological load origin and lifecycle hints.
- **Severity badge** — Normal, Aging, RedundantLoad, SceneSurvivor.
- **Ignore this pattern** — add call site to allowlist.
- **Copy trace** — clipboard export for bug reports.
- **Related call sites** — other live handles for the same asset.
- **Stack trace** (Verbose) — foldout with captured stack at injection time.

## Sort modes

- **Severity** — SceneSurvivor first (default for triage).
- **Age** — oldest live handles first.
- **Occurrence** — highest duplicate count first.

## Settings menu (⋮)

- ILPP diagnostics
- Edit assembly exclude list
- Manage ignored patterns (dedicated window)

## Tips

- Grey/yellow entries may be intentional preloads — use allowlist rather than forcing release.
- Red **SceneSurvivor** after scene change is the strongest signal of a missing Release before transition.
- After fixing code, re-enter Play Mode for a clean session or use **Clear**.

## See also

- [Leak definition and severity](../concepts/leak-definition-and-severity.md)
- [Allowlist and persistent handles](./allowlist-and-persistent-handles.md)
