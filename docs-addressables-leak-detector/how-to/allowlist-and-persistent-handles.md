# Allowlist and persistent handles

Some Addressables handles are **intentionally long-lived** (startup preload, singleton services, DontDestroyOnLoad content). Addressables Leak Detector provides two ways to suppress noise.

## Attribute — code-level intent

Apply to a method, class, or field:

```csharp
using AddressablesLeakDetector.Runtime;

[AddressablesIntentionallyPersistent]
async void PreloadCoreAssets()
{
    _bootHandle = Addressables.LoadAssetAsync<GameObject>("core_ui");
    await _bootHandle.Task;
}
```

Loads originating from marked members are flagged as intentionally persistent in the event log. Use for handles you never plan to release during a session.

## Editor pattern ignore

In the Live Leaks detail panel, click **Ignore this pattern** to add the call site to the project allowlist.

Patterns are stored in `allowlist.json` at the project root (path may vary by version — see Manage ignored patterns window).

Pattern formats:

- `MyScript.cs:42` — file and line
- `LoadBootAssets@MyScript.cs:42` — member + file + line

Enable **Show ignored** in the toolbar to review allowlisted entries still live.

## Manage ignored patterns

Settings menu (⋮) → **Manage ignored patterns** opens a dedicated Editor window to add, remove, or export patterns.

## When to allowlist vs fix

| Situation | Action |
|-----------|--------|
| Startup preload kept for entire session | Attribute or ignore pattern |
| Forgot Release before scene unload | Fix code — do not allowlist |
| Third-party plugin you cannot modify | Ignore pattern on their call site |
| Engine-internal retention | Out of scope — not fixable via Release |

## See also

- [Leak definition and severity](../concepts/leak-definition-and-severity.md)
- [Scene survival heuristic](./scene-survival-heuristic.md)
