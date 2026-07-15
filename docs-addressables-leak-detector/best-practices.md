# Best practices

## Release every load you own

Pair every `Load*` / `Instantiate*` / `LoadScene*` with a matching `Release` / `ReleaseInstance` / `UnloadSceneAsync` on the same handle when the content is no longer needed.

Prefer `OnDestroy` or explicit shutdown paths over relying on scene unload.

## Scene transitions

Before `LoadSceneMode.Single`, release handles tied to the outgoing scene. Watch for red **SceneSurvivor** in Live Leaks during level transition testing.

## Startup preloads

Long-lived boot assets are valid — mark them with `[AddressablesIntentionallyPersistent]` so the team knows they are intentional.

## Use instrumented overloads

- Prefer `UnloadSceneAsync(AsyncOperationHandle<SceneInstance>)` over `SceneInstance` overload.
- Prefer `Addressables.ReleaseInstance` over `AssetReference.ReleaseInstance(GameObject)` for automatic tracking.

## CI / team workflow

- Add a Play Mode test or manual checklist: enter Play, exercise Addressables flows, confirm Live Leaks empty after teardown.
- Run [demo scene acceptance checklist](./how-to/demo-scene.md) after package upgrades.

## Verbose mode

Enable **Verbose** only when debugging origin confusion — disable for daily profiling.

## Assembly hygiene

Exclude only assemblies you truly cannot instrument. Over-excluding hides leaks in gameplay code.

## Complement, not replace, Memory Profiler

Live Leaks shows **missing Release at call sites**. Memory Profiler shows **what** is retained. Use both.

## Package upgrades

After upgrading Addressables or this package:

1. Re-run [import checklist](./guide/import-checklist.md)
2. Re-run demo acceptance checklist
3. Check [Supported versions](./reference/supported-versions.md)
