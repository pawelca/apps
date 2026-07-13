# Generate the demo scene

**Goal:** Create a ready-made Unity scene that fires sample events so you can verify **SUB** and **INVOKE** rows without writing code — and exercise **1.1+** diagnostics (leaks, growth alerts, timing, exceptions, diff view).

**Prerequisites:** Event Monitor Editor extension installed (menu item present).

## Pre-included scene (Asset Store / package)

The package ships a ready-made demo scene at:

`Assets/EventMonitor/Demo/EventMonitor_Demo.unity`

Open it in the Editor, enable **Record** in **Window → Event Monitor**, enter Play Mode, and click the labeled buttons. No menu generation required.

## Regenerate via menu

Use **Tools → Event Monitor → Generate Demo Scene** or **Create Demo Scene** to rebuild the scene (overwrites the file above).

## Steps

1. In the Unity menu, choose **Tools → Event Monitor → Generate Demo Scene**.
2. Confirm the dialog if prompted. The scene is saved to `Assets/EventMonitor/Demo/EventMonitor_Demo.unity` (also included in the package — you can open it directly without regenerating).
3. Open **Window → Event Monitor** and enable **Record**.
4. Enter **Play Mode**.
5. Click UI buttons (labels show event names), or run **Run sample sequence** / **Random event burst** / **Run showcase (1.1+)**.

You should see **SUB** lines when listeners attach and **INVOKE** lines when buttons trigger events. A small **HUD** mirrors the last actions for quick visual confirmation.

### Multiple SUB rows per event (expected)

Several components subscribe to the same event on purpose (for example **PromoDemoGameHud** updates the HUD while **PromoDemoUiListener** / **PromoDemoSoundListener** / **PromoDemoAnalyticsListener** add extra handlers). You will see **one SUB row per distinct handler**, not a duplicate of the same subscription. Static handlers are labeled with their **declaring type** (e.g. `PromoDemoUiListener.OnScore`), not a generic `static` bucket.

The generated demo scene relies on **ILPP** for `Assembly-CSharp` and does **not** include `ReflectionScanner` (avoids extra SUB noise from Unity UI internals).

## What the demo includes

Typical contents (exact names may vary by version):

- **Canvas** — left column: player, game state, enemy controls, and sequence buttons; right column: **Live HUD** and **Diagnostics (1.1+)**.
- **Promo / demo buses** — MonoBehaviours exposing C# events (`OnPlayerJump`, `OnScoreChanged`, `OnEnemySpawned`, etc.).
- **Listeners** — extra subscribers so the **Subscribers** graph is non-trivial.
- **Diagnostics (1.1+)** — buttons to demo:
  - **Create leak** — destroyed subscriber without unsubscribe → [Leak detection](./leak-detection.md) (Stats tab).
  - **Simulate subscriber growth** — sustained `OnDiagnosticsPing` subscriptions → [Growth Alerts](./subscriber-growth-alerts.md) tab.
  - **Throw in handler** — exception with breadcrumb context → [Exception breadcrumbs](./exception-breadcrumbs.md) tab.
  - **Spawn boss (slow)** — busy handler; enable **⏱ Timing** for [Invoke timing](./invoke-timing.md).
  - **Toggle extra listener** — runtime `+=` / `-=` for [Diff view](./diff-view.md) on Subscribers.
  - **Run showcase (1.1+)** — one-click sequence through the features above (good for screen recordings).

Window-only features (no dedicated demo button): **Save…** / **Load…** sessions, **Compare sessions** (Stats), **⚡ Re-fire** (Log detail), **⚙ Assemblies** filter — see linked how-to guides.

## See also

- [Quick Start](../guide/quick-start.md)
- [ILPP vs ReflectionScanner](../concepts/ilpp-vs-reflection-scanner.md)
- [Session save/load](./session-save-load.md)
- [Manual dispatch (Re-fire)](./manual-dispatch.md)
