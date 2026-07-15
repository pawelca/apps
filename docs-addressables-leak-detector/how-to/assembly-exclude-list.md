# Assembly exclude list

Skip ILPP injection for selected assemblies (plugins, generated code, test harnesses you do not want instrumented).

## Edit the list

1. **Window → Addressables Leak Detector**
2. Settings menu (⋮) → **Edit assembly exclude list**
3. Enter semicolon-separated assembly names (asmdef name, not folder path)

Example:

```
MyGame.Generated;ThirdParty.NoTrack;LeakDetector.IlppSamples
```

4. Confirm — Unity recompiles scripts.

## Defaults

The package excludes its own assemblies (`AddressablesLeakDetector.*`) and demo/test assemblies as configured. User gameplay assemblies are instrumented by default.

## When to exclude

- Large third-party DLLs you cannot recompile meaningfully
- Generated protobuf / source-generator output
- Dedicated test assemblies (optional — tests may want instrumentation)

## Verify

Enable [ILPP diagnostics](./ilpp-diagnostics.md) and confirm excluded assemblies appear in skip logs.

## Note on demo ILPP samples

`LeakDetector.IlppSamples` is a separate assembly intentionally **outside** the `AddressablesLeakDetector.*` prefix so demo ILPP buttons show origins in `AddressablesInstrumentationSamples.cs`. Exclude it only if you do not need those demo scenarios.
