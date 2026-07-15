# Import checklist

Use this checklist after importing Addressables Leak Detector from the Asset Store or a `.unitypackage`.

## Package import

- [ ] All files under `Assets/AddressablesLeakDetector` imported without errors.
- [ ] No duplicate asmdef conflicts with existing project assemblies.
- [ ] Console shows no compile errors in `AddressablesLeakDetector.Runtime`, `AddressablesLeakDetector.Editor`, or `Unity.AddressablesLeakDetector.CodeGen`.

## Dependencies (`Packages/manifest.json`)

- [ ] `com.unity.addressables` present (1.20+; 2.2.2 validated in test project).
- [ ] `com.unity.nuget.mono-cecil` present (e.g. `1.11.6`).

Example:

```json
{
  "dependencies": {
    "com.unity.addressables": "2.2.2",
    "com.unity.nuget.mono-cecil": "1.11.6"
  }
}
```

## ILPP verification

- [ ] Script compilation completes after import.
- [ ] `Library/AddressablesLeakDetector/ilpp_settings.json` created after opening the Leak Detector window.
- [ ] Optional: enable **ILPP diagnostics** (settings menu ⋮) and confirm injection counts in Console after recompile.

## Smoke test

- [ ] **Window → Addressables Leak Detector** opens without errors.
- [ ] **Recording** is on.
- [ ] Enter Play Mode; load any Addressable from your project.
- [ ] **Live Leaks** shows at least one entry with correct file:line (or run the [demo scene](../how-to/demo-scene.md)).

## Demo scene (optional)

- [ ] **Tools → Addressables Leak Detector → Create Demo Scene** succeeds.
- [ ] Addressables Play Mode script set to **Use Asset Database (fastest)** (menu sets this automatically).
- [ ] Play `DemoLeakScene`; **Create Leak** → live handle visible.

## Common blockers

| Symptom | Check |
|---------|-------|
| CodeGen assembly compile error | Mono.Cecil in manifest |
| No handles in Live Leaks | Recording off, or assembly in exclude list |
| ILPP not injecting | Recompile user scripts; check ILPP diagnostics |
| Demo scene missing keys | Re-run **Create Demo Scene** |

See [Troubleshooting & FAQ](../troubleshooting/faq.md) if any step fails.
