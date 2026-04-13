# Installation

## Unity version

Event Monitor is built and tested with **Unity 6 LTS** (for example `6000.3.7f1`). The package relies on Unity’s **IL Post-Processor** pipeline, which is available in modern Unity versions. If you use an older editor, verify ILPP support before relying on automatic instrumentation.

## Compatibility matrix (tested)

| Unity version | Status | Notes |
|---------------|--------|-------|
| `6000.3.7f1` | Supported | Primary target (Unity 6 LTS) |
| `2022.3.62f3` | Supported | Verified by import and runtime test |

## Install via UPM (copy-paste)

Recommended path is Unity Package Manager.

### Option A: Package Manager UI

1. Open **Window -> Package Manager**
2. Click **+**
3. Choose **Add package from git URL...**
4. Paste your Event Monitor repository URL

### Option B: `manifest.json`

Add the package to `Packages/manifest.json`:

```json
{
  "dependencies": {
    "com.pawelca.eventmonitor": "https://github.com/your-org/eventmonitor.git"
  }
}
```

Replace only the repository URL with your actual source.

When installed this way, Event Monitor can declare and restore its own dependencies automatically (including Mono.Cecil).

## Package layout

After install, the package typically contains:

- **Runtime** — `EventBus`, `EventRecord`, optional `ReflectionScanner`.
- **Editor** — `EventMonitor` window, settings, demo scene tooling.
- **IL Post-Processors** — assembly that rewrites user assemblies at compile time.

Exact folder names may vary by version; treat this documentation as product-level guidance.

## Dependency: Mono.Cecil (automatic in UPM flow)

The IL post-processor depends on **Mono.Cecil**:

- `com.unity.nuget.mono-cecil` (for example `1.11.6`)

For UPM package installation, this dependency should be resolved automatically by `package.json`.
If you use legacy asset export/import, see [Import checklist](./import-checklist).

## Which assemblies get instrumented?

The post-processor **does not** rewrite every DLL in your project. Typical **user** script assemblies (for example `Assembly-CSharp` and many custom **asmdef** assemblies) are candidates. **Unity engine**, **Editor**, **system**, and **Event Monitor’s own** assemblies are skipped to avoid recursion and noise.

If your gameplay code lives in a **custom asmdef**, that assembly is usually still processed as long as it is allow-listed by the tool’s gate and recording is enabled. See [ILPP diagnostics and settings](../how-to/ilpp-diagnostics) and [IL patterns and limitations](../reference/il-limitations).

## Verify instrumentation

After installation:

1. Open **Window → Event Monitor** and enable **Record**.
2. Enter **Play Mode** and trigger a known `event +=` / `?.Invoke()` path.
3. Confirm **SUB** / **INVOKE** rows appear.

If nothing appears, use [Troubleshooting & FAQ](../troubleshooting/faq) and optional ILPP diagnostics.

## Import Demo Scene sample (Package Manager)

To enable `Tools/Event Monitor/Generate Demo Scene`:

1. Open **Window -> Package Manager**
2. Select **Event Monitor**
3. Open the **Samples** tab
4. Click **Import** on **Demo Scene Generator**

![Package Manager Samples import flow](/apps/public/eventmonitor/images/package-manager-samples-import.png)

## Next step

Continue with [Quick Start](./quick-start).

If you imported Event Monitor via asset export into another project, use [Import checklist](./import-checklist).
