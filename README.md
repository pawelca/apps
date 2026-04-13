# Apps site

This repository hosts the landing page, legal/support pages for mobile apps, and **Event Monitor** documentation (Unity Editor tool).

**Live at:** [https://pawelca.github.io/apps/](https://pawelca.github.io/apps/)

---

## Event Monitor documentation

Professional documentation (English) for **Event Monitor** lives in [`docs-eventmonitor/`](./docs-eventmonitor/) and is built with [VitePress](https://vitepress.dev/). The published site is served under **`/eventmonitor/`** on GitHub Pages (Airflow-inspired layout: sidebar, “On this page”, local search, light/dark).

### Local preview

Requires **Node.js 20+**.

```bash
npm install
npm run docs:dev
```

Open the URL VitePress prints in the terminal (often `http://localhost:5173/` with a relative `base`).

After a production build you can also run **`npm run docs:preview`** to serve the built output with the correct asset paths.

### Production build

Writes static HTML to `public/eventmonitor/` and runs [Pagefind](https://pagefind.app/) to emit a static index under `public/eventmonitor/pagefind/` (optional). The **search field** uses VitePress **local search** (no backend).

```bash
npm install
npm run docs:build:all
```

The build runs **`scripts/patch-eventmonitor-assets.mjs`** so asset URLs become **relative** (`./assets/...`). That fixes:

- opening **`index.html` directly** from disk (`file:///.../public/eventmonitor/index.html`), and  
- hosting under **`https://pawelca.github.io/apps/eventmonitor/`** (no broken `/eventmonitor/...` paths that ignore the `/apps/` prefix).

Do **not** open only the folder URL in the browser (directory listing); open **`index.html`** or use **`npm run docs:preview`**.

Then commit the updated `public/eventmonitor/` directory, or rely on **GitHub Actions** (see below).

### CI

Workflow [`.github/workflows/eventmonitor-docs.yml`](./.github/workflows/eventmonitor-docs.yml) rebuilds docs when `docs-eventmonitor/` or `package.json` changes on `main`, and commits `public/eventmonitor/`. Pushes that **only** change generated files under `public/eventmonitor/` do not retrigger the workflow (avoids loops).

You can also run it manually: **Actions → Build Event Monitor docs → Run workflow**.

### Content source

Product copy is aligned with the Unity package marketing/technical notes (`asset_store.md` in the Event Monitor repository). This site is the **canonical** English documentation for end users browsing the web.

---

## Mobile apps

### NightCare

Privacy-first mobile application for parents tracking newborn care.

**Pages:**

- [Privacy Policy](https://pawelca.github.io/apps/nightcare/privacy-policy.html)
- [Terms of Service](https://pawelca.github.io/apps/nightcare/terms.html)
- [Support](https://pawelca.github.io/apps/nightcare/support.html)

### Speakify

Speech-to-text application (pages in `public/speakify/` when enabled).

---

## Structure

```
apps/
├── docs-eventmonitor/       # VitePress source (Markdown + .vitepress/)
├── .github/workflows/       # CI (Event Monitor docs build)
├── package.json             # docs scripts + devDependencies
├── public/                  # GitHub Pages root
│   ├── index.html           # Landing (NightCare, Event Monitor, …)
│   ├── style.css
│   ├── eventmonitor/        # Generated — VitePress + Pagefind output
│   ├── nightcare/
│   └── speakify/
└── README.md
```

---

## Deployment

GitHub Pages serves the **`public/`** directory. Any push to `main` updates the live site within minutes.

After changing documentation sources, either:

- run `npm run docs:build:all` locally and commit `public/eventmonitor/`, or  
- push source changes and let the **Build Event Monitor docs** workflow commit the output.

---

## Design

- **Landing & legal pages:** clean, mobile-first layout (shared `style.css`).
- **Event Monitor docs:** VitePress default theme + [`custom.css`](./docs-eventmonitor/.vitepress/theme/custom.css) (documentation green accent, Airflow-style information density).

---

## License

© 2025 Pawelca Apps. All rights reserved.
