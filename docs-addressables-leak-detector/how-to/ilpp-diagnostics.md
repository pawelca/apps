# ILPP diagnostics

Enable ILPP diagnostics to see injection statistics in the Unity Console after script recompilation.

## Enable

1. Open **Window → Addressables Leak Detector**
2. Settings menu (⋮) → **ILPP diagnostics**
3. Wait for script recompile

Diagnostics write to `Library/AddressablesLeakDetector/ilpp_settings.json` (`ilppDiagnosticsEnabled: true`).

## What you see

After recompile, the Console may report per-assembly injection counts, for example:

- Assemblies processed
- Load call sites injected
- Release call sites injected
- Skipped assemblies (exclude list or gate disabled)

Use this to confirm your gameplay assemblies are instrumented.

## When to use

- First import — verify ILPP runs on your scripts.
- No Live Leaks entries — confirm loads happen in non-excluded assemblies.
- After changing assembly exclude list — confirm expected assemblies skipped.

## Related settings

All ILPP-facing toggles live in the same JSON file. See [ILPP settings (JSON)](../reference/ilpp-settings.md).

## Disable for daily work

Turn diagnostics off to reduce Console noise. Injection still runs according to **Recording** and exclude list settings.
