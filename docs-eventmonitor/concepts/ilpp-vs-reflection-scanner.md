# ILPP vs ReflectionScanner

Event Monitor can observe subscriptions from two mechanisms. They complement each other but behave differently.

## IL Post-Processor (ILPP)

After compilation, Event Monitor’s **ILPP** rewrites eligible assemblies to inject calls at:

- Event **add** accessors (`+=`)
- Event **remove** accessors (`-=`)
- Common **invocation** sites (see [IL patterns and limitations](../reference/il-limitations))

**Pros**

- Precise **compile-time** placement: every instrumented `+=` / `-=` / `Invoke` is tied to real IL sites.
- **INVOKE** rows (when the pattern matches) without polling.

**Cons**

- Only assemblies and patterns the processor **understands** are covered.
- Requires a successful ILPP pass and compatible Unity / Cecil setup.

## ReflectionScanner

`ReflectionScanner` is a **runtime** `MonoBehaviour` that periodically scans `MonoBehaviour` instances in the scene, reflects over **delegate fields**, and diffs handler sets to emit **SUB** / **UNSUB** records.

**Pros**

- Useful when ILPP is **off**, **skipped**, or not applied to a particular assembly.
- Can surface subscription changes discovered purely by reflection.

**Cons**

- **Polling** — work every *N* frames; potential overhead on large scenes.
- Less precise than ILPP for attribution; may disagree slightly with ILPP timing.
- Does **not** replace **INVOKE** injection; invocation still depends on ILPP (or manual hooks).

## Using both

When ILPP subscription instrumentation **and** ReflectionScanner are active, you may see **additional** SUB/UNSUB activity compared to ILPP alone, because both paths can record the same logical change.

For a clean mental model:

- Prefer **ILPP** for production debugging of the full **SUB / UNSUB / INVOKE** story.
- Treat **ReflectionScanner** as a **fallback** or demo aid (the generated demo scene includes it intentionally).

## See also

- [ILPP diagnostics and settings](../how-to/ilpp-diagnostics)
- [IL patterns and limitations](../reference/il-limitations)
