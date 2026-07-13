# Assembly filters (ILPP scope)

## Goal
Control which compiled assemblies IL Post Processing (ILPP) instruments.

## Where
Open **Window → Event Monitor** → ⚙ **Settings** → **Instrumented Assemblies...**.

## What it does
- Builds an `assemblyExcludeList` for ILPP.
- ILPP will still apply its built-in deny rules (Unity/System/EventMonitor assemblies are never instrumented).
- Your exclude list only further **reduces** the set — it won’t override safety denies.

## Workflow
1. Open **⚙ Settings** → **Instrumented Assemblies...**.
2. Toggle assemblies you want to exclude (un-instrument).
3. Click **Apply**.
4. Wait for script recompilation.

