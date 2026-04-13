# ILPP diagnostics and settings

**Goal:** Confirm that the IL Post-Processor runs, control whether recording rewrites apply, and surface compile-time warnings.

**Prerequisites:** Unity writes to `Library/` for your project; you can edit JSON or use the Event Monitor toolbar where available.

## Settings file

During compilation, ILPP reads:

`Library/EventMonitor/ilpp_settings.json`

If the file is missing or a key is absent, **recording** defaults to **enabled** (backward compatible).

| Key | Default | Meaning |
|-----|---------|---------|
| `recordingEnabled` | `true` | When `false`, the post-processor skips rewriting for that compile — no automatic SUB/UNSUB/INVOKE injection from ILPP. |
| `ilppDiagnosticsEnabled` | `false` | When `true`, emits **Unity Console** messages (warnings) summarizing ILPP activity, for example per-assembly SUB/UNSUB/INVOKE injection counts. |

Example:

```json
{
  "recordingEnabled": true,
  "ilppDiagnosticsEnabled": true
}
```

::: info EditorPrefs vs JSON
Toolbar toggles may sync settings into this JSON for ILPP (implementation-specific). If behavior disagrees with the file, check both the window and `Library/EventMonitor/ilpp_settings.json`.
:::

## Project root resolution

ILPP discovers the project root from **reference paths** (for example paths containing `\Library\` or `/Library/`). If the file is never read, verify your Unity project layout and that compilation runs in a normal Editor context.

## When to enable diagnostics

- After adding Event Monitor to a new project and seeing **no INVOKE** rows.
- When migrating Unity or Cecil versions.
- When debugging custom asmdef layout.

Disable diagnostics again for quieter compiles once you are satisfied.

## See also

- [ILPP settings (JSON) reference](../reference/ilpp-settings)
- [Troubleshooting & FAQ](../troubleshooting/faq)
