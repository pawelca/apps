# Demo scene

The demo scene is the fastest way to validate Live Leaks, scene transitions, and ILPP-instrumented call sites.

## Create the demo

Menu: **Tools → Addressables Leak Detector → Create Demo Scene**

This:

- Creates or refreshes `DemoLeakScene` and `DemoLeakScene_B`
- Registers Addressables entries `demo_asset` and `demo_scene_b`
- Enables `DemoLeakScene` in Build Settings (Play entry)
- Keeps `DemoLeakScene_B` **addressable only** (disabled in Build Settings — Unity rule for addressable scenes)
- Sets Addressables Play Mode to **Use Asset Database (fastest)**

## Play workflow

1. Open `DemoLeakScene`
2. Enter Play Mode
3. Use **Window → Addressables Leak Detector** alongside the Game view
4. Click demo buttons and observe Live Leaks

## Basic scenarios (manual tracking in demo assembly)

| Button | Expected Live Leaks result |
|--------|----------------------------|
| **Create Leak** | Live handle, origin `LeakDemoController.cs` |
| **Load + Release** | No live handle after release |
| **Instantiate Leak** | Live instantiate handle |
| **Instantiate + ReleaseInstance** | No live handle after release |
| **Leak + Scene B (Single)** | Handle stays live, turns **red** (`SceneSurvivor`) after non-additive transition |
| **Leak + Scene B (Additive)** | Handle stays live, stays grey/yellow (not red) |
| **Release + Scene B** | No live handle after transition |

## ILPP instrumented scenarios

These buttons call `AddressablesInstrumentationSamples` — origin file must be `AddressablesInstrumentationSamples.cs`.

| Button | Expected result |
|--------|-----------------|
| **AssetRef Leak** | Live handle via `AssetReference.LoadAssetAsync` |
| **AssetRef + ReleaseAsset** | No live handle after `ReleaseAsset` |
| **Addressable Scene Leak** | Live handle, `LoadScene` operation kind |
| **Scene Load + Unload** | No live handle after `UnloadSceneAsync` |

## Scene B navigation

- **Leak + Scene B** loads Scene B via `Addressables.LoadSceneAsync("demo_scene_b")`.
- **Back to Main Scene** releases surviving demo handles, then returns to `DemoLeakScene`.

## Acceptance checklist

- Non-additive without release → red `SceneSurvivor` with correct leak trace.
- Additive without release → not red.
- Release before non-additive transition → no live entry.
- Repeated non-additive leaks group by call site (`×N`).
- ILPP AssetRef leak → origin `AddressablesInstrumentationSamples.cs`.
- ILPP healthy unload → no live entry after release.
- Exiting Play Mode clears registry state.

## Demo overlay

If **Demo content not configured** appears, re-run **Create Demo Scene** and confirm Addressables groups contain `demo_asset`.
