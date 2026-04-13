# Installation

## Unity version

Event Monitor is built and tested with **Unity 6 LTS** (for example `6000.3.7f1`). The package relies on Unity’s **IL Post-Processor** pipeline, which is available in modern Unity versions. If you use an older editor, verify ILPP support before relying on automatic instrumentation.

## Package layout

Add the Event Monitor package to your project using **Unity Package Manager** (git URL, tarball, or embedded folder), following your team’s usual workflow. The package typically contains:

- **Runtime** — `EventBus`, `EventRecord`, optional `ReflectionScanner`.
- **Editor** — `EventMonitor` window, settings, demo scene tooling.
- **IL Post-Processors** — assembly that rewrites user assemblies at compile time.

Exact folder names may vary by version; treat this documentation as product-level guidance.

## Dependency: Mono.Cecil

The IL post-processor depends on **Mono.Cecil**, commonly pulled in via Unity’s package:

- `com.unity.nuget.mono-cecil` (for example `1.11.6`)

Ensure it resolves without conflicts in **Package Manager**.

## Which assemblies get instrumented?

The post-processor **does not** rewrite every DLL in your project. Typical **user** script assemblies (for example `Assembly-CSharp` and many custom **asmdef** assemblies) are candidates. **Unity engine**, **Editor**, **system**, and **Event Monitor’s own** assemblies are skipped to avoid recursion and noise.

If your gameplay code lives in a **custom asmdef**, that assembly is usually still processed as long as it is allow-listed by the tool’s gate and recording is enabled. See [ILPP diagnostics and settings](../how-to/ilpp-diagnostics) and [IL patterns and limitations](../reference/il-limitations).

## Verify instrumentation

After installation:

1. Open **Window → Event Monitor** and enable **Record**.
2. Enter **Play Mode** and trigger a known `event +=` / `?.Invoke()` path.
3. Confirm **SUB** / **INVOKE** rows appear.

If nothing appears, use [Troubleshooting & FAQ](../troubleshooting/faq) and optional ILPP diagnostics.

## Next step

Continue with [Quick Start](./quick-start).
