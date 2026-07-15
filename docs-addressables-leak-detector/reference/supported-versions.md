# Supported versions (spike decisions)

**Last verified:** 2026-07-13  
**Unity editor:** 6000.3.7f1  
**Addressables package:** 2.2.2 (pinned in host `Packages/manifest.json`)

## API verification

| API | Status | Notes |
|-----|--------|-------|
| `ResourceManager.RegisterDiagnosticCallback` | Removed in 2.2.2 public API | Layer 2b (`Completed` / `Destroyed`) is primary channel |
| `AsyncOperationHandle.Completed` / `Destroyed` | Expected stable | Subscribed in `PerHandleEventBridge` |
| `GetHashCode` / `Equals` / `IsValid` / `DebugName` | Expected stable | Handle identity only — no private reflection |

## Runtime defaults

- **Verbose stack traces:** off by default (`captureStackTraces: false` in ILPP JSON)
- **Lifecycle channels:** both diagnostic callback and per-handle events enabled
- **Minimum Addressables:** 1.20+ recommended; 2.x validated in host project

## Follow-up spike

Re-run spike when bumping Addressables major version or Unity LTS target.
