# Troubleshooting & FAQ

## No handles appear in Live Leaks

1. Confirm **Recording** is on (not Paused).
2. Re-enter Play Mode after enabling recording.
3. Ensure your load uses an [instrumented API](../reference/supported-call-sites.md).
4. Check assembly is not in [exclude list](../how-to/assembly-exclude-list.md).
5. Force recompile (touch a script) after import.
6. Enable [ILPP diagnostics](../how-to/ilpp-diagnostics.md) and check Console.

## Wrong file:line in origin

- ILPP records the **call site** in **your** assembly, not internal Addressables code.
- Demo manual buttons show `LeakDemoController.cs`; ILPP demo buttons show `AddressablesInstrumentationSamples.cs`.

## Handle still live after Release

- Verify `Release` runs on the same logical load (same handle variable).
- `IsValid()` may still be true if another `AssetReference` holds the asset — see [Handle identity](../concepts/handle-identity.md).

## SceneSurvivor on intentional preload

Use `[AddressablesIntentionallyPersistent]` or allowlist — see [Allowlist](../how-to/allowlist-and-persistent-handles.md).

## Demo scene / Addressables errors

- Re-run **Tools → Addressables Leak Detector → Create Demo Scene**.
- Addressables Play Mode: **Use Asset Database (fastest)**.
- `demo_scene_b` must exist in Addressables groups; Scene B must stay **disabled** in Build Settings.

## InvalidProgramException after import

Usually stale IL from a prior package version. Clean steps:

1. Stop Play Mode
2. Delete `Library/ScriptAssemblies` (or full `Library` if needed)
3. Reimport package / recompile

Report with [Support](./support.md) template if persists.

## Verbose mode overhead

Stack trace capture adds cost at every load/release. Disable **Verbose** for routine work.

## Health Graph / Snapshot Diff missing

MVP ships **Live Leaks** only. Roadmap tabs planned for 1.1 / 1.2.

## Where is online documentation?

https://pawelca.github.io/apps/public/addressables-leak-detector/
