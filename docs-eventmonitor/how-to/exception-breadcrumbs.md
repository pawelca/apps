# Exception breadcrumbs

When Unity logs an **exception** during Play Mode and recording is on, Event Monitor captures the last 20 timeline records as **breadcrumbs** — context for what happened right before the crash (Sentry-style).

## Where to find them

Open **Window → Event Monitor** and switch to the **Exceptions** tab. Each entry shows:

- Exception message and stack trace
- Expandable list of preceding Event Monitor records (SUB / UNSUB / INVOKE)

## Requirements

- **Record** must be ON
- Play Mode (exceptions in Edit Mode are not captured by this hook)
- At least one instrumented event should have fired before the exception for useful context

## Tips

- Combine with **Stack Traces** on individual records for deeper handler-origin detail
- Breadcrumbs are capped (20 entries) and reset when you **Clear** the live bus
