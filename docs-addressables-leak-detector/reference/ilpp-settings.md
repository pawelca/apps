# ILPP settings (JSON)

During compilation, ILPP reads settings from:

```
Library/AddressablesLeakDetector/ilpp_settings.json
```

EditorPrefs are **not** available in the ILPP pipeline — the Editor writes this file when you change toolbar or settings-menu options.

## Typical fields

| Field | Purpose | Default |
|-------|---------|---------|
| `recordingEnabled` | Gate all injection | `true` |
| `captureStackTraces` | Verbose stack at load/release | `false` |
| `ilppDiagnosticsEnabled` | Console injection stats | `false` |
| `excludedAssemblies` | Semicolon-separated asm names to skip | package defaults |

Exact schema may evolve between versions; treat missing keys as documented defaults.

## When the file is written

- Opening the Leak Detector window (initial sync)
- Toggling **Recording** or **Verbose**
- Changing assembly exclude list or ILPP diagnostics

Each change triggers **script recompile** so the next ILPP pass reads updated JSON.

## Manual inspection

You can open the JSON in a text editor while Unity is closed or after changing settings. Do not hand-edit while Unity is recompiling.

## Paused recording

When `recordingEnabled` is `false`, ILPP skips injection — existing compiled assemblies retain prior instrumentation until next full recompile of those assemblies.

## See also

- [ILPP diagnostics](../how-to/ilpp-diagnostics.md)
- [Assembly exclude list](../how-to/assembly-exclude-list.md)
