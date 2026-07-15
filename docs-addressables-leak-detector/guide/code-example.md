# Minimal code example

Addressables Leak Detector requires **no manual tracking calls** in user code. Write Addressables the way you already do; ILPP injects `HandleTracker` at load and release call sites.

## Healthy load and release

```csharp
using UnityEngine;
using UnityEngine.AddressableAssets;
using UnityEngine.ResourceManagement.AsyncOperations;

public class HealthyAddressablesUsage : MonoBehaviour
{
    AsyncOperationHandle<GameObject> _handle;

    async void Start()
    {
        _handle = Addressables.LoadAssetAsync<GameObject>("my_prefab_key");
        await _handle.Task;

        if (_handle.Status == AsyncOperationStatus.Succeeded)
        {
            // use _handle.Result ...
        }
    }

    void OnDestroy()
    {
        if (_handle.IsValid())
            Addressables.Release(_handle);
    }
}
```

**Expected Live Leaks behavior:**

- After load completes: one live handle, origin pointing to the `LoadAssetAsync` line.
- After `Release` in `OnDestroy`: entry removed.

## Intentional leak (for testing)

```csharp
void Start()
{
    // Missing Release — will appear in Live Leaks
    Addressables.LoadAssetAsync<GameObject>("my_prefab_key");
}
```

## AssetReference pattern

```csharp
public AssetReferenceGameObject prefabRef;

async void LoadViaReference()
{
    var handle = prefabRef.LoadAssetAsync();
    await handle.Task;
    // ...
    prefabRef.ReleaseAsset(); // tracked release
}
```

## Scene load pattern

```csharp
var handle = Addressables.LoadSceneAsync("my_scene", LoadSceneMode.Additive);
await handle.Task;
// ...
Addressables.UnloadSceneAsync(handle); // use handle overload, not SceneInstance overload
```

## What you do not need

- No `HandleTracker.RecordLoad` / `RecordRelease` in production code.
- No attributes on every load call (optional `[AddressablesIntentionallyPersistent]` only for known long-lived handles).
- No changes to Addressables groups or build pipeline.

See [Supported call sites](../reference/supported-call-sites.md) for the full instrumented API list.
