# Generate the demo scene

**Goal:** Create a ready-made Unity scene that fires sample events so you can verify **SUB** and **INVOKE** rows without writing code.

**Prerequisites:** Event Monitor Editor extension installed (menu item present).

## Steps

1. In the Unity menu, choose **Tools → Event Monitor → Generate Demo Scene**.
2. Confirm the dialog if prompted. The scene is saved under `Assets/` (name may match your package version, for example `EventMonitor_Demo.unity`).
3. Open **Window → Event Monitor** and enable **Record**.
4. Enter **Play Mode**.
5. Click UI buttons (labels show event names), or run **Run sample sequence** / **Random event burst** if present.

You should see **SUB** lines when listeners attach and **INVOKE** lines when buttons trigger events. A small **HUD** mirrors the last actions for quick visual confirmation.

## What the demo includes

Typical contents (exact names may vary by version):

- **Canvas** with labeled controls (player, game state, enemy samples).
- **Promo / demo buses** — MonoBehaviours exposing C# events.
- **Listeners** — extra subscribers so the **Subscribers** graph is non-trivial.
- **ReflectionScanner** — fallback subscription discovery alongside ILPP.

## See also

- [Quick Start](../guide/quick-start)
- [ILPP vs ReflectionScanner](../concepts/ilpp-vs-reflection-scanner)
