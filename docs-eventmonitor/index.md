---
layout: home

hero:
  name: Event Monitor
  text: ''
  tagline: Unity event tracing — record who subscribes, unsubscribes, and when events fire — with zero manual instrumentation.
  actions:
    - theme: brand
      text: Quick Start
      link: /guide/quick-start
    - theme: alt
      text: Core concepts
      link: /concepts/event-bus-and-records

features:
  - title: IL Post-Processor
    details: Injects tracking into event add/remove accessors and common invocation call sites after compilation.
  - title: Redux-style timeline
    details: Immutable SUB, UNSUB, and INVOKE records with filtering, stats, and export to Plain Text, CSV, JSON, or Markdown.
  - title: Live subscribers
    details: Inspect the current graph of listeners per event, with optional time-travel replay of subscriber state.
  - title: Optional payloads
    details: Capture invocation arguments when you need them; keep overhead low when you do not.
---

## What is Event Monitor?

Event Monitor is a **Unity Editor** tool for teams that rely on **C# events** for gameplay, UI, or architecture. It answers questions such as:

- Who subscribed to this event, and from which type and method?
- When did it fire, and how many handlers were attached at that moment?
- How did the listener graph evolve over a Play session?

The workflow is inspired by **Redux DevTools**: an append-only log, derived subscriber state, and **time travel** to inspect that state at a chosen point in the timeline.

## Who is it for?

Projects with **event-driven** code paths where debugging “who listened, and why did this run?” otherwise means breakpoints, logging sprawl, or guesswork.

## What it is not

Event Monitor is a **development-time** observability tool inside the Editor. It is not a runtime analytics pipeline, a replacement for Unity Profiler, or a general-purpose logger.

## Next steps

- Follow the [Quick Start](./guide/quick-start) to open the window and read your first records.
- See [Installation](./guide/installation) for Unity version and package requirements.
- Browse [How-to guides](./how-to/payload-capture) for payloads, ILPP diagnostics, and exports.
