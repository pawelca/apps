import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Addressables Leak Detector',
  description:
    'Detect forgotten Addressables.Release calls in Unity — live handle tracking with ILPP call-site capture and zero manual instrumentation.',
  lang: 'en-US',
  base: '/apps/public/addressables-leak-detector/',
  outDir: '../public/addressables-leak-detector',
  cleanUrls: false,

  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/apps/public/addressables-leak-detector/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
  ],

  themeConfig: {
    logo: '/apps/public/addressables-leak-detector/favicon.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quick Start', link: '/guide/quick-start' },
      { text: 'Concepts', link: '/concepts/layers-and-event-log' },
      { text: 'Reference', link: '/reference/supported-call-sites' },
      { text: 'Support', link: '/troubleshooting/support' },
      {
        text: 'Apps',
        link: 'https://pawelca.github.io/apps/',
      },
    ],

    sidebar: [
      { text: 'Overview', link: '/' },
      { text: 'Quick Start', link: '/guide/quick-start' },
      { text: 'Minimal code example', link: '/guide/code-example' },
      { text: 'Import checklist', link: '/guide/import-checklist' },
      { text: 'Installation', link: '/guide/installation' },
      {
        text: 'Core concepts',
        collapsed: false,
        items: [
          { text: 'Layers and event log', link: '/concepts/layers-and-event-log' },
          { text: 'Leak definition and severity', link: '/concepts/leak-definition-and-severity' },
          { text: 'Handle identity', link: '/concepts/handle-identity' },
        ],
      },
      {
        text: 'How-to guides',
        collapsed: false,
        items: [
          { text: 'Demo scene', link: '/how-to/demo-scene' },
          { text: 'Reading Live Leaks', link: '/how-to/reading-live-leaks' },
          { text: 'Allowlist and persistent handles', link: '/how-to/allowlist-and-persistent-handles' },
          { text: 'ILPP diagnostics', link: '/how-to/ilpp-diagnostics' },
          { text: 'Assembly exclude list', link: '/how-to/assembly-exclude-list' },
          { text: 'Scene survival heuristic', link: '/how-to/scene-survival-heuristic' },
        ],
      },
      {
        text: 'Reference',
        collapsed: false,
        items: [
          { text: 'Supported call sites', link: '/reference/supported-call-sites' },
          { text: 'ILPP settings (JSON)', link: '/reference/ilpp-settings' },
          { text: 'IL patterns and limitations', link: '/reference/il-limitations' },
          { text: 'Supported versions', link: '/reference/supported-versions' },
        ],
      },
      { text: 'Support', link: '/troubleshooting/support' },
      { text: 'Troubleshooting & FAQ', link: '/troubleshooting/faq' },
      { text: 'Best practices', link: '/best-practices' },
    ],

    socialLinks: [],

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
      label: 'On this page',
    },

    footer: {
      message: 'Addressables Leak Detector — Unity Editor documentation',
      copyright: 'Copyright © 2025',
    },
  },
})
