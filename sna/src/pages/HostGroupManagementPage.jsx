import { Info } from 'lucide-react'
import { useState } from 'react'
import HostGroupDetailForm from '../components/host-groups/HostGroupDetailForm'
import HostGroupTree from '../components/host-groups/HostGroupTree'

export default function HostGroupManagementPage() {
  const [filter, setFilter] = useState('')
  const [selectedId, setSelectedId] = useState('inside')
  const [creating, setCreating] = useState(false)

  const parentForCreate = selectedId && selectedId !== 'site' ? selectedId : 'inside'

  return (
    <div className="mx-auto flex max-h-[calc(100vh-5rem)] max-w-[1600px] flex-col gap-4 text-sna-text">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">Host Group Management</h1>
        <Info className="h-4 w-4 text-sna-text-muted" aria-hidden />
      </div>

      <div className="flex min-h-0 flex-1 gap-4">
        <aside className="flex w-full max-w-sm shrink-0 flex-col rounded border border-sna-border bg-sna-surface">
          <div className="border-b border-sna-border p-3">
            <input
              type="search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter by Host Group Name"
              className="w-full rounded border border-sna-border-strong bg-sna-input px-3 py-2 text-sm text-sna-text placeholder:text-sna-text-muted focus:border-[#005eb8] focus:outline-none"
            />
          </div>
          <div className="min-h-0 flex-1 overflow-auto p-2">
            <HostGroupTree
              filter={filter}
              selectedId={creating ? null : selectedId}
              onSelect={(id) => {
                setCreating(false)
                setSelectedId(id)
              }}
            />
          </div>
          <div className="flex flex-col gap-2 border-t border-sna-border p-3">
            <button
              type="button"
              onClick={() => {
                setCreating(true)
              }}
              className="rounded border border-[#005eb8]/50 bg-[#005eb8]/15 py-2 text-sm text-[#005eb8] hover:bg-[#005eb8]/25"
            >
              + New host group
            </button>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="flex-1 rounded border border-sna-border-strong px-2 py-2 text-xs text-sna-text-2 hover:bg-sna-hover"
              >
                Automation
              </button>
              <button
                type="button"
                className="flex-1 rounded border border-sna-border-strong px-2 py-2 text-xs text-sna-text-2 hover:bg-sna-hover"
              >
                Import All
              </button>
              <button
                type="button"
                className="flex-1 rounded border border-sna-border-strong px-2 py-2 text-xs text-sna-text-2 hover:bg-sna-hover"
              >
                Export All
              </button>
            </div>
          </div>
        </aside>

        <section className="min-h-0 flex-1 overflow-auto rounded border border-sna-border bg-sna-surface p-6">
          <HostGroupDetailForm
            key={
              creating ? `new:${parentForCreate}` : `edit:${selectedId}`
            }
            groupId={creating ? null : selectedId}
            creating={creating}
            parentId={parentForCreate}
            onDoneCreate={(id) => {
              setCreating(false)
              setSelectedId(id)
            }}
            onCancelCreate={() => setCreating(false)}
          />
        </section>
      </div>
    </div>
  )
}
