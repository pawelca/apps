---
layout: home

hero:
  name: Addressables Leak Detector
  text: ''
  tagline: Find forgotten Addressables.Release calls — live handle list with file:line origins and zero manual instrumentation.
  actions:
    - theme: brand
      text: Quick Start
      link: /guide/quick-start
    - theme: alt
      text: Core concepts
      link: /concepts/layers-and-event-log

features:
  - title: IL Post-Processor
    details: Injects HandleTracker at Load and Release call sites after compilation — file:line by default, optional stack traces in Verbose mode.
  - title: Live Leaks tab
    details: Passive list of live handles grouped by call site and asset, with severity heuristics and leak trace detail.
  - title: Scene-survivor detection
    details: Flags handles that survive non-additive scene changes without Release — high-confidence leak signal.
  - title: Allowlist & attributes
    details: Suppress noise for startup preloads via [AddressablesIntentionallyPersistent] or Editor pattern ignore.
  - title: Public API only
    details: Handle identity via GetHashCode, Equals, IsValid, DebugName — no reflection on private Addressables fields.
  - title: Demo scene
    details: One-click demo with manual and ILPP-instrumented leak scenarios for Play Mode validation.
---

## What is Addressables Leak Detector?

Addressables Leak Detector is a **Unity Editor** tool for teams using **Addressables** who need to know **which handle was loaded where and never released** — silent ref-count leaks that do not show up clearly in the standard Memory Profiler.

::: info Version note
Tested on Unity 6 LTS (`6000.3.7f1`) with Addressables `2.2.2`. See the compatibility table in [Installation](./guide/installation).
:::

- Who loaded this asset, and from which script line?
- Did this handle survive a scene change without Release?
- Are we loading the same address twice while a prior handle is still live?

## Who is it for?

Projects using Addressables for content streaming where debugging missing `Release()` calls otherwise means guesswork, Memory Profiler diffing, or ad-hoc logging.

## What it is not

- Not a replacement for Memory Profiler (shows **call-site origin**, not full retention graph).
- Not runtime analytics — Editor Play Mode focused.
- Not an auto-alarm system — passive Live Leaks list with optional severity coloring.

## Roadmap

- **Health Graph** (1.1) — ref-count sawtooth visualization.
- **Snapshot Diff** (1.2) — baseline / compare snapshots.

Current release: **Live Leaks** tab only.

## Next steps

- Follow the [Quick Start](./guide/quick-start) to open the window and see your first live handle.
- See [Installation](./guide/installation) for Unity version and package requirements.
- Browse [How-to guides](./how-to/demo-scene) for demo scene, allowlist, ILPP diagnostics, and scene survival.
