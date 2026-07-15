# Support

If you need help with Addressables Leak Detector, use the support ticket format below.

## Preferred support channel

- Open a GitHub Issue: [Create Support Ticket](https://github.com/pawelca/apps/issues/new?template=support_request.md)

## Before you submit

- Reproduce in Play Mode at least once.
- Check [Troubleshooting & FAQ](./faq.md).
- Try the [demo scene](../how-to/demo-scene.md).
- Copy leak trace from Live Leaks detail panel.

## Support ticket template

```md
### 1) Problem summary
Short description in 1-2 sentences.

### 2) Environment
- Addressables Leak Detector version:
- Unity version:
- Addressables package version:
- OS:
- Scripting backend (Mono/IL2CPP):

### 3) Reproduction steps
1.
2.
3.

### 4) Expected behavior

### 5) Actual behavior

### 6) Evidence
- Console logs:
- Leak trace (Copy trace):
- Screenshot/video:

### 7) ILPP diagnostics
- Enabled: [Yes/No]
- Injection counts / skip logs:

### 8) Workarounds tried

### 9) Additional context
```

## High-quality tickets include

- Instrumented API used (`LoadAssetAsync`, `Release`, etc.)
- Whether assembly is excluded from ILPP
- Recording / Verbose state during repro
