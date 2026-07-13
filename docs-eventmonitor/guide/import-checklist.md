# Import checklist (Asset Store / legacy asset export)

Use this checklist when you install Event Monitor via **Unity Asset Store** or **`.unitypackage` import** instead of UPM.

For UPM installation (dependencies automatic), see [Installation](./installation.md).

## 1) Add required package dependency

In the target project, open `Packages/manifest.json` and ensure:

```json
{
  "dependencies": {
    "com.unity.nuget.mono-cecil": "1.11.6"
  }
}
```

Without this dependency, `Unity.EventMonitor.CodeGen` fails to compile with `Mono.Cecil` missing-type errors.

## 2) Recompile and verify ILPP assembly

After editing `manifest.json`:

1. Let Unity resolve packages
2. Trigger script recompile (or restart Unity)
3. Confirm there are no `CS0234` / `CS0246` errors for `Mono.Cecil.*`

## 3) Enable diagnostics (optional but recommended)

If import still behaves unexpectedly:

- enable ILPP diagnostics in Event Monitor
- check Unity Console for per-assembly injection summary

See [ILPP diagnostics and settings](../how-to/ilpp-diagnostics.md).

## 4) Smoke-test behavior

1. Open `Window -> Event Monitor`
2. Turn on `Record`
3. Enter Play Mode
4. Trigger a known `event +=` and `?.Invoke(...)` path
5. Confirm `SUB` and `INVOKE` records appear
