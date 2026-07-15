# IL patterns and limitations

Understanding ILPP constraints helps explain missing entries or edge-case behavior.

## Handle struct semantics

`AsyncOperationHandle` is a **struct**. The injector tracks:

- The **creation** call site (load)
- The **release** call site

It does **not** track handle copies passed between methods unless each path has its own load/release call sites.

## Load injection pattern

Correct pattern after Addressables load:

```
call Addressables.LoadAssetAsync
stloc handleLocal
ldloc handleLocal
call HandleTracker.RecordLoad
```

**Never** `Dup` immediately after the Addressables `call` — the struct on stack may not match the stored local used for lifecycle subscription.

## Release injection pattern

For releases with default optional arguments (e.g. `UnloadSceneAsync(handle, autoReleaseHandle: true)`):

```
ldarg handle
dup
call HandleTracker.RecordRelease
ldc.i4_1          ; default bool arg
call UnloadSceneAsync
```

Injection inserts **after** the handle is loaded and **before** trailing constant arguments.

## Generic handles

ILPP calls non-generic `HandleTracker` methods after `AsyncOperationHandle<T>.op_Implicit` when needed. Closed generic types (e.g. `SceneInstance`) use generic `RecordLoad<T>` / `RecordRelease<T>` when available.

Open generic methods in user code may skip injection if handle type cannot be resolved.

## Expression-bodied members

Arrow methods returning Addressables calls are supported (same IL as block bodies after compiler lowering).

## AssetReference release

`ReleaseAsset` / `UnLoadScene` inject via the `OperationHandle` property getter — not the void release method's implicit handle parameter.

## Known non-instrumented paths

See [Supported call sites](./supported-call-sites.md).

## Engine-internal retention

If Memory Profiler shows retained Addressables content but Live Leaks is empty, Unity may hold references internally — not a missing user `Release` at an instrumented call site.

## See also

- [Handle identity](../concepts/handle-identity.md)
- [Layers and event log](../concepts/layers-and-event-log.md)
