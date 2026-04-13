# ILPP settings (JSON)

Path (Unity project):

```
Library/EventMonitor/ilpp_settings.json
```

Created or updated by the tooling when you toggle related options; you may also edit it manually.

## Keys

| Key | Type | Default if missing | Description |
|-----|------|--------------------|-------------|
| `recordingEnabled` | boolean | `true` | When `false`, Event Monitor’s IL Post-Processor **does not** rewrite assemblies for that compile. No automatic SUB/UNSUB/INVOKE injection from ILPP. |
| `ilppDiagnosticsEnabled` | boolean | `false` | When `true`, emits **diagnostic messages** to the Unity Console (for example per-assembly injection summary). |

## Examples

**Recording on, quiet compiles**

```json
{
  "recordingEnabled": true,
  "ilppDiagnosticsEnabled": false
}
```

**Debug ILPP**

```json
{
  "recordingEnabled": true,
  "ilppDiagnosticsEnabled": true
}
```

**Temporarily disable all ILPP recording**

```json
{
  "recordingEnabled": false
}
```

## Parsing behavior

If the file is missing, unreadable, or a key is absent, **recording** defaults to **enabled** for backward compatibility. Diagnostic defaults follow the implementation (typically **off** unless the key is present and `true`).

## See also

- [ILPP diagnostics and settings](../how-to/ilpp-diagnostics)
