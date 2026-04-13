# Minimal code example

This page shows the smallest practical setup a Unity developer needs to write in code to see Event Monitor records.

## 1) Event source (publisher)

```csharp
using System;
using UnityEngine;

public sealed class DemoPlayerBus : MonoBehaviour
{
    public event Action OnPlayerJump;
    public event Action<int> OnPlayerDamage;

    public void TriggerJump()
    {
        var h = OnPlayerJump;
        if (h != null)
            h.Invoke();
    }

    public void TriggerDamage(int damage = 10) => OnPlayerDamage?.Invoke(damage);
}
```

What Event Monitor logs automatically:

- `SUB` and `UNSUB` when handlers are added/removed
- `INVOKE` when `TriggerJump()` / `TriggerDamage()` fire (for supported IL patterns)

## 2) Event listener (subscriber)

```csharp
using UnityEngine;

public sealed class DemoUiListener : MonoBehaviour
{
    [SerializeField] private DemoPlayerBus _player;

    private void OnEnable()
    {
        if (_player == null) _player = FindFirstObjectByType<DemoPlayerBus>();
        if (_player == null) return;

        _player.OnPlayerJump += OnJump;
        _player.OnPlayerDamage += OnDamage;
    }

    private void OnDisable()
    {
        if (_player == null) return;

        _player.OnPlayerJump -= OnJump;
        _player.OnPlayerDamage -= OnDamage;
    }

    private static void OnJump() { }
    private static void OnDamage(int _) { }
}
```

## 3) Trigger from input (or button)

```csharp
using UnityEngine;

public sealed class DemoTriggerInput : MonoBehaviour
{
    [SerializeField] private DemoPlayerBus _player;

    private void Update()
    {
        if (_player == null) return;

        if (Input.GetKeyDown(KeyCode.Space))
            _player.TriggerJump();

        if (Input.GetKeyDown(KeyCode.H))
            _player.TriggerDamage(15);
    }
}
```

## 4) What the user does in Event Monitor window

1. Open `Window -> Event Monitor`
2. Turn on `Record`
3. Enter Play Mode
4. Press `Space` / `H`
5. Check `Log` and `Subscribers` tabs

You should see a sequence like: `SUB` rows (on enable), then `INVOKE`, then `UNSUB` (on disable/stop).

## Demo parity

This example is directly based on the demo classes used in the package (`PromoDemoPlayerBus`, `PromoDemoUiListener`), but reduced to the cleanest version for copy/paste.
