# Installation

## Unity version

Addressables Leak Detector is tested on **Unity 6 LTS** (`6000.3.7f1`). The package relies on Unity's **IL Post-Processor** pipeline and the Addressables package.

## Compatibility matrix (tested)

| Unity version | Addressables | Status |
|---------------|--------------|--------|
| `6000.3.7f1` | `2.2.2` | Supported |

See [Supported versions](../reference/supported-versions) for API notes and minimum versions.

## Install via UPM (copy-paste)

Recommended path is Unity Package Manager.

### Option A: Package Manager UI

1. Open **Window → Package Manager**
2. Click **+**
3. Choose **Add package from git URL…**
4. Paste your Addressables Leak Detector repository URL

### Option B: `manifest.json`

Add the package to `Packages/manifest.json`:

```json
{
  "dependencies": {
    "com.pawelca.addressables-leak-detector": "https://github.com/your-org/addressables-leak-detector.git"
  }
}
```

Replace the repository URL with your actual source.

Also ensure these dependencies are present:

```json
{
  "dependencies": {
    "com.unity.addressables": "2.2.2",
    "com.unity.nuget.mono-cecil": "1.11.6"
  }
}
```

## Package layout

After install, the package typically contains:

- **Runtime** — `HandleTracker`, event store, live handle registry, lifecycle bridges.
- **Editor** — Leak Detector window, settings, allowlist UI.
- **IL Post-Processors** — Cecil-based injector that rewrites user assemblies at compile time.
- **Demo** — optional demo scene and intentional leak scenarios.

Exact folder names may vary by version; treat this documentation as product-level guidance.

## First run

1. Open **Window → Addressables Leak Detector**.
2. Confirm **Recording** is enabled.
3. Enter Play Mode and load an Addressable asset.
4. Check **Live Leaks** for a new entry with your script's file:line.

If nothing appears, see [Troubleshooting & FAQ](../troubleshooting/faq).

## Recompile after settings change

Toolbar toggles write `Library/AddressablesLeakDetector/ilpp_settings.json`. Changing them triggers script recompile so ILPP picks up new settings.
