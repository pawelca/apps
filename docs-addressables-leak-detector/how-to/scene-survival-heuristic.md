# Scene survival heuristic

**SceneSurvivor** is the highest-confidence automated heuristic in Addressables Leak Detector.

## Rule

If a live Addressables handle **survives a non-additive scene load** without an intervening Release, severity escalates to **SceneSurvivor** (red).

## Why it matters

Non-additive scene changes destroy most scene objects but **do not** automatically release Addressables handles your code still holds. This is a common source of silent memory growth across level transitions.

## Additive vs non-additive

| Scene load mode | SceneSurvivor triggered? |
|-----------------|--------------------------|
| `LoadSceneMode.Single` | Yes — prior scene unloaded |
| `LoadSceneMode.Additive` | No — demo scene may stay loaded |

The demo **Leak + Scene B (Additive)** button illustrates a live handle that stays grey/yellow, not red.

## Expected demo behavior

1. **Leak + Scene B (Single)** — load asset, transition to Scene B without Release → red after return or on observation during transition.
2. **Release + Scene B** — Release before transition → no live entry.

## False positives

Legitimate DontDestroyOnLoad services that hold handles across scenes may trigger SceneSurvivor. Use `[AddressablesIntentionallyPersistent]` or allowlist if intentional.

## See also

- [Demo scene](./demo-scene.md)
- [Leak definition and severity](../concepts/leak-definition-and-severity.md)
