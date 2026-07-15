# Leak definition and severity

Addressables Leak Detector uses a **passive** model by default: it lists live handles without auto-alarming. Severity heuristics help you prioritize investigation.

## What counts as a "leak" here

A **live handle** is an Addressables operation that was loaded (recorded by Layer 1) and not yet released (no matching release record removed it from the live registry).

This is not a definitive memory leak verdict — it is **evidence that a Release call may be missing** at the call site shown in the leak trace.

## Severity levels

| Severity | Meaning | UI color |
|----------|---------|----------|
| **Normal** | Live handle; no heuristic triggered | Grey |
| **Aging** | Lives longer than 1.5× median for same call site (>1 s) | Yellow |
| **RedundantLoad** | Same asset loaded again while a prior handle is still live | Orange |
| **SceneSurvivor** | Handle survived a **non-additive** scene change without Release | Red |

### SceneSurvivor (high confidence)

The only heuristic treated as high-confidence for "forgot to release before scene transition." See [Scene survival heuristic](../how-to/scene-survival-heuristic.md).

### Aging and RedundantLoad (informational)

Useful for spotting slow leaks or duplicate loads; not automatic false-positive alarms. Long-lived startup preloads may appear yellow — use allowlisting if intentional.

## Intentionally persistent handles

Mark known long-lived loads with:

```csharp
[AddressablesIntentionallyPersistent]
void PreloadAtStartup() { ... }
```

Or ignore call-site patterns in the Editor (see [Allowlist and persistent handles](../how-to/allowlist-and-persistent-handles.md)).

## Out of scope

- Engine-internal Addressables retention (Unity keeps assets alive internally — not a missing user `Release`).
- Handles loaded in assemblies excluded from ILPP.
- Runtime builds (Editor-focused tool; ILPP applies to Editor script compilation).

## Roadmap tabs (not in MVP)

Future releases may add **Health Graph** (ref-count trends) and **Snapshot Diff** (baseline compare). Current release: **Live Leaks** tab only.
