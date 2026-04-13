# IL patterns and limitations

Event Monitor’s **INVOKE** instrumentation is **pattern-based**. Typical C# event usage works well; indirection does not.

## Support matrix

| Pattern | Supported | Notes |
|--------|-----------|-------|
| `MyEvent?.Invoke(args)` | Usually yes | Recommended default style |
| Local copy + `Invoke` | Usually yes | Fallback style for edge IL cases |
| Custom dispatcher helper | Maybe | Depends on emitted IL shape |
| Reflection (`DynamicInvoke`) | Usually no | Not a direct event invoke pattern |
| Obfuscated/generated unusual IL | Maybe | Verify with ILPP diagnostics |

## Patterns that usually work

- `MyEvent?.Invoke(...)`
- Copy to a local, then invoke, for example:

```csharp
var h = MyEvent;
if (h != null)
    h.Invoke(...);
```

## Patterns that may not be tracked

- Invocation through a **custom dispatcher** that does not expose a direct `Invoke` call matching the injector’s rules.
- **Reflection-based** `Delegate.DynamicInvoke` or similar.
- **Non-standard** IL produced by source generators or obfuscators (case-by-case).

If a fire is missing, confirm with [ILPP diagnostics](../how-to/ilpp-diagnostics) and consider restructuring the hot path or using `TagPayload` + manual `RecordInvoke` only for diagnostics.

## Custom event accessors

Standard **field-like events** are straightforward. **Custom** `add` / `remove` accessors with unusual backing storage may require heuristic resolution; edge cases are possible.

## Static events

Static events are tracked with **`instanceId = 0`**. You still distinguish by **owner type + event name**, not by a specific object instance.

## Assembly coverage

Only assemblies the post-processor **includes** are rewritten. Unity, system, and Event Monitor internal assemblies are skipped. Your gameplay code should live in **user** assemblies (for example `Assembly-CSharp` or your asmdefs).

## Payload capture

When **Payload** is off, INVOKE rows intentionally omit arguments. When on, arguments are captured for **instrumented** sites; otherwise use `TagPayload` before firing.

## Unity / C# compatibility

Some Unity versions have edge cases with **lambda** subscriptions (`event += _ => ...`). Prefer **named methods** for maximum compatibility when subscribing and unsubscribing.

## See also

- [ILPP vs ReflectionScanner](../concepts/ilpp-vs-reflection-scanner)
- [Troubleshooting & FAQ](../troubleshooting/faq)
