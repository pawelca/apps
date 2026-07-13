# Subscriber growth alerts

Warns when an event's subscriber count keeps growing beyond a threshold — similar to Node.js `MaxListenersExceededWarning`. Helps spot missing `-=` in `OnDestroy` / `OnDisable`.

## How it works

A warning fires when **both** are true:

1. Subscriber count for an event bucket (`OwnerType::EventName`) is **above the threshold** (default **10**)
2. Count **increased** on each of the last **N** consecutive subscribes (default **3** — reduces false positives from scene-load spikes)

Unsubscribes that drop count below the threshold **re-arm** the warning for that event.

## Where to find them

- **Growth Alerts** tab — settings + recent warnings list
- Unity Console — `[EventMonitor] Subscriber growth alert: …` (when enabled)
- **Stats** tab title may include alert count alongside leak count

## Settings

On the **Growth Alerts** tab (persisted via EditorPrefs):

| Setting | Default | Meaning |
|---------|---------|---------|
| Warnings enabled | ON | Master switch |
| Threshold | 10 | Subscriber count that must be exceeded |
| Min growth streak | 3 | Consecutive growth subscribes before warning |

## Tips

- Legitimate fan-out (e.g. UI pooling many listeners) may trigger alerts — raise threshold or disable warnings for that project phase
- Pair with **Leak detection** (Stats tab) for destroyed-object leaks vs runaway growth
