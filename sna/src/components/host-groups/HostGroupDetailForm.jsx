import { Info } from 'lucide-react'
import { useState } from 'react'
import { useHostGroups } from '../../context/HostGroupsContext'

const advancedLabels = [
  { key: 'baseline', label: 'Enable baselining for hosts in this group' },
  {
    key: 'excludedServices',
    label: 'Disable security events using excluded services',
  },
  {
    key: 'floodDisabled',
    label:
      'Disable flood alarms and security events when a host in this group is the target',
  },
  {
    key: 'trapScanners',
    label: 'Trap hosts that scan unused addresses in this group',
  },
]

export default function HostGroupDetailForm({
  groupId,
  creating,
  parentId,
  onDoneCreate,
  onCancelCreate,
}) {
  const { getNode, nodes, addHostGroup, updateHostGroup } = useHostGroups()
  const node = !creating && groupId ? getNode(groupId) : null
  const initial = !creating && node?.kind === 'hostGroup' ? node : null

  const [name, setName] = useState(() => initial?.name ?? '')
  const [description, setDescription] = useState(
    () => initial?.description ?? '',
  )
  const [ipRanges, setIpRanges] = useState(() => initial?.ipRanges ?? '')
  const [advanced, setAdvanced] = useState(() => ({
    baseline: true,
    excludedServices: true,
    floodDisabled: false,
    trapScanners: false,
    ...(initial?.advanced ?? {}),
  }))

  const parentName = (() => {
    if (creating) return nodes[parentId]?.name ?? '—'
    if (node?.parentId) return nodes[node.parentId]?.name ?? '—'
    return '—'
  })()

  const handleSave = () => {
    if (creating) {
      const id = addHostGroup(parentId, {
        name,
        description,
        ipRanges,
        advanced,
      })
      if (id) onDoneCreate?.(id)
      return
    }
    if (groupId && node?.kind === 'hostGroup') {
      updateHostGroup(groupId, {
        name,
        description,
        ipRanges,
        advanced,
      })
    }
  }

  const handleCancel = () => {
    if (creating) {
      onCancelCreate?.()
      return
    }
    const cur = groupId ? getNode(groupId) : null
    if (cur?.kind === 'hostGroup') {
      setName(cur.name)
      setDescription(cur.description ?? '')
      setIpRanges(cur.ipRanges ?? '')
      setAdvanced({
        baseline: true,
        excludedServices: true,
        floodDisabled: false,
        trapScanners: false,
        ...cur.advanced,
      })
    }
  }

  if (!creating && (!groupId || !node || node.kind !== 'hostGroup')) {
    return (
      <div className="rounded border border-dashed border-sna-border-strong bg-sna-surface/50 p-8 text-center text-sm text-sna-text-muted">
        Select a host group in the tree, or create a new one.
      </div>
    )
  }

  return (
    <div className="text-sna-text">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">
            {creating ? 'New host group' : node.name}
          </h2>
          <p className="text-sm text-sna-text-muted">
            {creating
              ? `Will be created under: ${parentName}`
              : `Host Group ID: ${node.id}`}
          </p>
        </div>
        {!creating ? (
          <button
            type="button"
            className="rounded border border-sna-border-strong px-4 py-2 text-sm hover:bg-sna-hover"
          >
            Edit
          </button>
        ) : null}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs text-sna-text-2">
              Host Group Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border border-sna-border-strong bg-sna-surface px-3 py-2 text-sm text-sna-text focus:border-[#005eb8] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-sna-text-2">
              Parent Host Group
            </label>
            <input
              type="text"
              readOnly
              value={parentName}
              className="w-full cursor-not-allowed rounded border border-sna-border-strong bg-sna-input px-3 py-2 text-sm text-sna-text-muted"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-sna-text-2">
              Description (512 Char Max)
            </label>
            <textarea
              rows={4}
              value={description}
              maxLength={512}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-y rounded border border-sna-border-strong bg-sna-surface px-3 py-2 text-sm text-sna-text focus:border-[#005eb8] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-sna-text-2">
              IP Addresses And Ranges
            </label>
            <textarea
              rows={5}
              value={ipRanges}
              onChange={(e) => setIpRanges(e.target.value)}
              placeholder="ex. 192.168.10.10, 192.168.10, 192.168.10-100, 192.168.10.0/24"
              className="w-full resize-y rounded border border-sna-border-strong bg-sna-input px-3 py-2 text-sm text-sna-text placeholder:text-sna-text-muted focus:border-[#005eb8] focus:outline-none"
            />
            <button
              type="button"
              className="mt-2 rounded border border-sna-border-strong px-4 py-2 text-sm text-sna-text-2 hover:bg-sna-hover"
            >
              Import IP Addresses and Ranges
            </button>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            Advanced Options
            <Info className="h-4 w-4 text-sna-text-muted" aria-hidden />
          </div>
          <div className="space-y-3 rounded border border-sna-border bg-sna-surface p-4">
            {advancedLabels.map((row) => (
              <label
                key={row.key}
                className="flex cursor-pointer items-start gap-2 text-sm text-sna-text-2"
              >
                <input
                  type="checkbox"
                  checked={!!advanced[row.key]}
                  onChange={(e) =>
                    setAdvanced((a) => ({ ...a, [row.key]: e.target.checked }))
                  }
                  className="mt-1 rounded border-sna-border-strong bg-sna-input"
                />
                <span>{row.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end gap-3 border-t border-sna-border pt-6">
        <button
          type="button"
          onClick={handleCancel}
          className="text-sm text-[#049fd9] hover:underline"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="rounded bg-[#005eb8] px-6 py-2 text-sm font-medium text-white hover:bg-[#004a94]"
        >
          Save
        </button>
      </div>
    </div>
  )
}
