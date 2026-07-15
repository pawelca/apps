# Apps site

This repository hosts the landing page, legal/support pages for mobile apps, and documentation for Unity Editor tools (**Event Monitor**, **Addressables Leak Detector**).

**Live at:** [https://pawelca.github.io/apps/](https://pawelca.github.io/apps/)

---

## Event Monitor documentation

Professional documentation (English) for **Event Monitor** lives in [`docs-eventmonitor/`](./docs-eventmonitor/) and is built with [VitePress](https://vitepress.dev/). The published site is served under **`/apps/public/eventmonitor/`** on GitHub Pages.

### Local preview

Requires **Node.js 20+**.

```bash
npm install
npm run docs:em:dev
```

Open the URL VitePress prints (typically `http://localhost:5173/apps/public/eventmonitor/`).

### Production build

```bash
npm install
npm run docs:build:all
```

Build output: `public/eventmonitor/` and `public/addressables-leak-detector/` plus Pagefind indexes.

Do not test production builds via `file:///` — use `npm run docs:em:preview` / `npm run docs:ald:preview` or deployed URLs.

---

## Addressables Leak Detector documentation

Documentation for **Addressables Leak Detector** lives in [`docs-addressables-leak-detector/`](./docs-addressables-leak-detector/) and publishes to **`/apps/public/addressables-leak-detector/`**.

**Live URL:** [https://pawelca.github.io/apps/public/addressables-leak-detector/](https://pawelca.github.io/apps/public/addressables-leak-detector/)

### Local preview

```bash
npm install
npm run docs:ald:dev
```

### Content source

Product copy syncs from `Assets/AddressablesLeakDetector/Documentation/` in the Unity package repository (shared pages only). Online-only pages: `index.md`, `guide/installation.md` (UPM/git install).

---

## CI

Workflow [`.github/workflows/docs-sites.yml`](./.github/workflows/docs-sites.yml) rebuilds **both** doc sites when sources or `package.json` change on `main`, and commits `public/eventmonitor/` and `public/addressables-leak-detector/`.

Pushes that **only** change generated files under those directories do not retrigger the workflow (avoids loops).

Manual run: **Actions → Build docs sites → Run workflow**.

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
├── docs-eventmonitor/                    # Event Monitor VitePress source
├── docs-addressables-leak-detector/      # Addressables Leak Detector VitePress source
├── .github/workflows/docs-sites.yml      # CI — builds both doc sites
├── package.json
├── public/                               # GitHub Pages root
│   ├── index.html                        # Landing (tools + mobile apps)
│   ├── eventmonitor/                     # Generated
│   ├── addressables-leak-detector/       # Generated
│   ├── nightcare/
│   └── speakify/
└── README.md
```

---

## Deployment

GitHub Pages serves the **`public/`** directory. After changing documentation sources:

- run `npm run docs:build:all` locally and commit both `public/*` outputs, or
- push source changes and let **Build docs sites** commit the output.

---

## Design

- **Landing & legal pages:** clean, mobile-first layout (shared `style.css`).
- **Event Monitor docs:** green accent — [`docs-eventmonitor/.vitepress/theme/custom.css`](./docs-eventmonitor/.vitepress/theme/custom.css).
- **Addressables Leak Detector docs:** amber accent — [`docs-addressables-leak-detector/.vitepress/theme/custom.css`](./docs-addressables-leak-detector/.vitepress/theme/custom.css).

---

## License

© 2025 Pawelca Apps. All rights reserved.
