# Quick Start

This guide gets you from zero to a visible **Live Leaks** entry in a few minutes.

## Prerequisites

- Unity project with Addressables Leak Detector installed (see [Installation](./installation.md)).
- `com.unity.addressables` and `com.unity.nuget.mono-cecil` in `Packages/manifest.json`.
- You are comfortable entering **Play Mode** in the Editor.

## Steps

### 1. Open the window

Use the menu: **Window → Addressables Leak Detector**.

### 2. Enable recording

In the toolbar, ensure **Recording** is on. When recording is paused, new load/release events are not appended to the log.

### 3. Enter Play Mode

Press **Play** and load Addressables content in your game. The tool only captures activity while the Editor is in Play Mode (and while recording is enabled).

### 4. Read Live Leaks

Open the **Live Leaks** tab. Each row represents a **live** Addressables handle grouped by call site and asset key. Select a row to see the leak trace (load origin file:line, operation kind, severity).

### 5. Release and verify

Call `Addressables.Release` (or the matching release API) for the handle. The entry should disappear from Live Leaks after the release is recorded.

## Global checklist

1. Package imported under `Assets/AddressablesLeakDetector`.
2. **Mono.Cecil** and **Addressables** in `manifest.json`.
3. **Window → Addressables Leak Detector** opened; **Recording** on.
4. User scripts **recompiled** after import (ILPP runs at compile time).
5. Your game code uses instrumented Addressables APIs (see [Supported call sites](../reference/supported-call-sites.md)).

No `using AddressablesLeakDetector.Runtime` or manual `HandleTracker` calls are required in normal user code.

## Demo scene (fastest path)

1. **Tools → Addressables Leak Detector → Create Demo Scene**
2. Open `DemoLeakScene` and enter Play Mode.
3. Click **Create Leak** — expect a live handle with origin `LeakDemoController.cs`.
4. Click **Load + Release** — expect no live handle after release.

See [Demo scene](../how-to/demo-scene.md) for the full button matrix.

## See also

- [Installation](./installation.md)
- [Minimal code example](./code-example.md)
- [Reading Live Leaks](../how-to/reading-live-leaks.md)
- [Troubleshooting & FAQ](../troubleshooting/faq.md)
