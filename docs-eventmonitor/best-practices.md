# Best practices

## Instrumentation

- Prefer **clear event firing** (`?.Invoke` or local copy + null check) in types you care about in the log.
- Keep **dispatcher** layers thin, or accept that centralized dispatch may need custom tooling / `TagPayload` for arguments.
- Put gameplay logic in **user** assemblies covered by ILPP; avoid hiding all events in a single non-rewritten DLL unless you understand the trade-off.

## Subscriptions

- Prefer **named methods** for `+=` / `-=` in shipped gameplay code to avoid Unity / delegate edge cases with lambdas.
- Unsubscribe symmetrically to avoid ghost listeners and confusing graphs.

## Payload and logging

- Leave **Payload** and **Stack Traces** **off** by default; enable only for focused investigations.
- Treat captured payloads as **sensitive** (PII, design data); scrub exports before sharing.

## Workflow

- Use **filters** deliberately; **clear** the search field when something “disappears” from the list.
- Use **time travel** when you need **who was subscribed at moment X**, not when you need raw invoke ordering only.

## See also

- [Troubleshooting & FAQ](./troubleshooting/faq)
- [IL patterns and limitations](./reference/il-limitations)
