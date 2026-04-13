/**
 * Post-build fix: VitePress emits "/eventmonitor/..." absolute paths.
 * Those break under file:// and under https://.../apps/eventmonitor/.
 * Patch href/src/preload and embedded __VP_SITE_DATA__ base — do not skip whole lines
 * (one line may contain both github.io and /eventmonitor/ links).
 */
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('public/eventmonitor')

function* walk(dir) {
  if (!fs.existsSync(dir)) {
    console.warn('patch-eventmonitor-assets: missing', dir)
    return
  }
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) yield* walk(p)
    else yield p
  }
}

function patchHtml(raw) {
  let t = raw
  t = t.replace(/="\/eventmonitor\//g, '="./')
  t = t.replace(/='\/eventmonitor\//g, "='./")
  t = t.replace(/"base":"\/eventmonitor\/"/g, '"base":"./"')
  // Escaped JSON inside JSON.parse("...") in VitePress output
  t = t.replace(/base\\":\\"\/eventmonitor\/\\"/g, 'base\\":\\"./\\"')
  t = t.replace(/link\\":\\"\//g, 'link\\":\\"./')
  t = t.replace(/logo\\":\\"\/favicon\.svg\\"/g, 'logo\\":\\"./favicon.svg\\"')
  return t
}

function patchBundledAsset(raw) {
  return raw.split('/eventmonitor/').join('./')
}

let count = 0
for (const file of walk(root)) {
  const ext = path.extname(file)
  const rel = path.relative(root, file).replace(/\\/g, '/')
  const raw = fs.readFileSync(file, 'utf8')
  let next = raw

  if (ext === '.html') next = patchHtml(raw)
  else if ((ext === '.js' || ext === '.css') && rel.startsWith('assets/')) next = patchBundledAsset(raw)
  else if (ext === '.json' && rel.startsWith('pagefind/')) next = patchBundledAsset(raw)

  if (next !== raw) {
    fs.writeFileSync(file, next)
    count++
    console.log('patched', path.relative(process.cwd(), file))
  }
}
console.log('patch-eventmonitor-assets: updated', count, 'files')
