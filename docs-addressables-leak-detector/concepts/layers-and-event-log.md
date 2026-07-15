# Layers and event log

Addressables Leak Detector uses two complementary mechanisms to track Addressables handles.

## Layer 1 — IL Post-Processor (call-site capture)

At compile time, Cecil injects calls to `HandleTracker` at Addressables **load** and **release** call sites in **your** assemblies (not inside the package itself).

Each injection records:

- Operation kind (LoadAsset, Instantiate, LoadScene, Release, etc.)
- Source file and line number (default)
- Optional full stack trace when **Verbose** mode is enabled

Layer 1 answers: **where was this handle loaded or released in user code?**

## Layer 2 — Lifecycle bridges (public API)

After a load is recorded, the runtime subscribes to public handle lifecycle signals:

- `AsyncOperationHandle.Completed`
- `AsyncOperationHandle.Destroyed`

On Addressables 2.2.2+, the global `RegisterDiagnosticCallback` API was removed from the public surface; per-handle events are the primary channel.

Layer 2 answers: **when did the handle complete or get destroyed?**

## Append-only event log

All events are stored as immutable `HandleEventRecord` entries. The live handle registry is **rebuilt** from this stream — historical records are never edited or deleted in place.

Toolbar **Clear** resets the log and registry for a fresh session.

## What ILPP does not track

- Flow of a handle between methods (handles are structs — only creation and release call sites are captured).
- Loads/releases inside excluded assemblies (see [Assembly exclude list](../how-to/assembly-exclude-list.md)).
- Non-instrumented API overloads (see [Supported call sites](../reference/supported-call-sites.md)).

## Settings bridge

Editor toggles (**Recording**, **Verbose**, assembly exclude list) are written to `Library/AddressablesLeakDetector/ilpp_settings.json` because EditorPrefs are unavailable during ILPP. Changing settings triggers recompile. See [ILPP settings](../reference/ilpp-settings.md).

## See also

- [Handle identity](./handle-identity.md)
- [IL patterns and limitations](../reference/il-limitations.md)
- [ILPP diagnostics](../how-to/ilpp-diagnostics.md)
