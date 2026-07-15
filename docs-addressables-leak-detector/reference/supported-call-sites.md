# Supported call sites

Layer 1 instruments these Addressables patterns automatically. No manual `HandleTracker` calls required.

## Static Addressables API

| API | Load | Release |
|-----|------|---------|
| `Addressables.LoadAssetAsync<T>(…)` | yes | — |
| `Addressables.InstantiateAsync(…)` | yes (all overloads) | — |
| `Addressables.LoadAssetsAsync<T>(…)` | yes (all overloads) | — |
| `Addressables.LoadSceneAsync(…)` | yes | — |
| `Addressables.Release(AsyncOperationHandle)` | — | yes |
| `Addressables.Release<T>(AsyncOperationHandle<T>)` | — | yes |
| `Addressables.ReleaseInstance(…)` | — | yes |
| `Addressables.UnloadSceneAsync(AsyncOperationHandle<SceneInstance>)` | — | yes |

## AssetReference API

| API | Load | Release |
|-----|------|---------|
| `AssetReference.LoadAssetAsync<T>()` | yes | — |
| `AssetReference.InstantiateAsync(…)` | yes | — |
| `AssetReference.LoadSceneAsync(…)` | yes | — |
| `AssetReference.ReleaseAsset()` | — | yes (via `OperationHandle`) |
| `AssetReference.UnLoadScene()` | — | yes (via `OperationHandle`) |

## Not instrumented

| API | Workaround |
|-----|------------|
| `AssetReference.ReleaseInstance(GameObject)` | Use static `Addressables.ReleaseInstance` |
| `Addressables.UnloadSceneAsync(SceneInstance)` | Use `AsyncOperationHandle<SceneInstance>` overload |

## Injection timing

- **Load** — injected **after** the load call stores the handle (`stloc` + `ldloc`; never `Dup` immediately after `call`).
- **Release** — injected **before** the release call, duplicating the handle on stack after optional default arguments are pushed.

## Excluded assemblies

Assemblies in the exclude list (see [Assembly exclude list](../how-to/assembly-exclude-list.md)) are not rewritten.

Package-internal assemblies (`AddressablesLeakDetector.*`) are not instrumented — only **your** gameplay code.

## See also

- [IL patterns and limitations](./il-limitations.md)
- [Minimal code example](../guide/code-example.md)
