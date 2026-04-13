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

    public void TriggerJump() => OnPlayerJump?.Invoke();
    public void TriggerDamage(int damage = 10) => OnPlayerDamage?.Invoke(damage);
}
```

What Event Monitor logs automatically:

- `SUB` and `UNSUB` when handlers are added/removed
- `INVOKE` when `TriggerJump()` / `TriggerDamage()` fire (for supported IL patterns)

`?.Invoke(...)` is the preferred, clean default style for users.

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

If you ever hit a very specific IL edge case in your project, you can switch to the explicit local-copy invoke pattern, but most users should not need that.

## Extra case: custom payload class (`Action<TPayload>`)

Use this pattern when you want to pass structured data instead of a primitive.

```csharp
using System;
using UnityEngine;

[Serializable]
public sealed class DamageInfo
{
    public int Amount;
    public string Source;
    public bool Critical;
}

public sealed class CombatBus : MonoBehaviour
{
    public event Action<DamageInfo> OnDamageTaken;

    public void TriggerDamage(int amount, string source, bool critical)
    {
        var payload = new DamageInfo
        {
            Amount = amount,
            Source = source,
            Critical = critical
        };

        OnDamageTaken?.Invoke(payload);
    }
}
```

Subscriber example:

```csharp
using UnityEngine;

public sealed class CombatHudListener : MonoBehaviour
{
    [SerializeField] private CombatBus _combatBus;

    private void OnEnable()
    {
        if (_combatBus == null) _combatBus = FindFirstObjectByType<CombatBus>();
        if (_combatBus != null) _combatBus.OnDamageTaken += OnDamageTaken;
    }

    private void OnDisable()
    {
        if (_combatBus != null) _combatBus.OnDamageTaken -= OnDamageTaken;
    }

    private static void OnDamageTaken(DamageInfo info)
    {
        Debug.Log($"Damage: {info.Amount}, source: {info.Source}, crit: {info.Critical}");
    }
}
```

### Optional: payload tagging for helper/dispatcher paths

When your invocation goes through custom dispatchers and INVOKE rows are missing, tag payload explicitly right before firing:

```csharp
EventBus.TagPayload(payload);
OnDamageTaken?.Invoke(payload);
```

This is usually not required for normal `?.Invoke(...)` paths, but helps in non-standard flows.
