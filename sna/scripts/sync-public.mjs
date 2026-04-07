import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')

mkdirSync(pub, { recursive: true })

const pairs = [
  ['Secure Network Analytics.html', 'login.html'],
  [
    'Security Insight Dashboard _ Secure Network Analytics.html',
    'security-insight-dashboard.html',
  ],
  [
    'Host Group Management _ Secure Network Analytics.html',
    'host-group-management.html',
  ],
  ['Flow Search _ Secure Network Analytics.html', 'flow-search.html'],
  [
    'Flow Search Results _ Secure Network Analytics.html',
    'flow-search-results.html',
  ],
]

for (const [srcName, destName] of pairs) {
  copyFileSync(join(root, srcName), join(pub, destName))
}

console.log('Synced', pairs.length, 'HTML snapshots into public/')
