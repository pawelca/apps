import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Event Monitor',
  description:
    'Automatic C# event tracing for Unity — subscriptions, unsubscriptions, and invocations with zero manual instrumentation.',
  lang: 'en-US',
  // GitHub Pages path for this repository deployment.
  // Site URL: https://pawelca.github.io/apps/public/eventmonitor/
  base: '/apps/public/eventmonitor/',
  outDir: '../public/eventmonitor',
  cleanUrls: false,

  head: [['link', { rel: 'icon', href: '/apps/public/eventmonitor/favicon.svg', type: 'image/svg+xml' }]],

  themeConfig: {
    logo: '/apps/public/eventmonitor/favicon.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quick Start', link: '/guide/quick-start' },
      { text: 'Concepts', link: '/concepts/event-bus-and-records' },
      { text: 'Reference', link: '/reference/event-bus-api' },
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
          { text: 'Event bus and records', link: '/concepts/event-bus-and-records' },
          { text: 'ILPP vs ReflectionScanner', link: '/concepts/ilpp-vs-reflection-scanner' },
          { text: 'Time travel and subscribers', link: '/concepts/time-travel-and-subscribers' },
        ],
      },
      {
        text: 'How-to guides',
        collapsed: false,
        items: [
          { text: 'Capture invocation payloads', link: '/how-to/payload-capture' },
          { text: 'ILPP diagnostics and settings', link: '/how-to/ilpp-diagnostics' },
          { text: 'Generate the demo scene', link: '/how-to/demo-scene' },
          { text: 'Export the log', link: '/how-to/export-log' },
          { text: 'Filtering and missing INVOKE rows', link: '/how-to/filtering-and-missing-invoke' },
        ],
      },
      {
        text: 'Reference',
        collapsed: false,
        items: [
          { text: 'EventBus API', link: '/reference/event-bus-api' },
          { text: 'ILPP settings (JSON)', link: '/reference/ilpp-settings' },
          { text: 'IL patterns and limitations', link: '/reference/il-limitations' },
        ],
      },
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
      message: 'Event Monitor — Unity Editor documentation',
      copyright: 'Copyright © 2025',
    },
  },
})
