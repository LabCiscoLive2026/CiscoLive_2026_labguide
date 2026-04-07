import { Check, ChevronRight, Folder } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useHostGroups } from '../../context/HostGroupsContext'

function sortChildren(list) {
  return [...list].sort((a, b) => {
    const order = { site: 0, folder: 1, hostGroup: 2 }
    const d = (order[a.kind] ?? 2) - (order[b.kind] ?? 2)
    if (d !== 0) return d
    return a.name.localeCompare(b.name)
  })
}

export default function HostGroupTree({
  filter,
  selectedId,
  onSelect,
}) {
  const { nodes, listChildren } = useHostGroups()
  const [expanded, setExpanded] = useState(() => new Set(['site', 'inside', 'outside']))

  const filterLower = filter.trim().toLowerCase()

  const matchesFilter = useMemo(() => {
    const vis = new Set()
    if (!filterLower) {
      Object.keys(nodes).forEach((id) => vis.add(id))
      return vis
    }
    const selfMatch = new Set()
    for (const n of Object.values(nodes)) {
      if (n.name.toLowerCase().includes(filterLower)) selfMatch.add(n.id)
    }
    const addAncestors = (id) => {
      let p = nodes[id]?.parentId
      while (p) {
        vis.add(p)
        p = nodes[p]?.parentId ?? null
      }
    }
    for (const id of selfMatch) {
      vis.add(id)
      addAncestors(id)
      const stack = [id]
      while (stack.length) {
        const cur = stack.pop()
        for (const c of listChildren(cur)) {
          if (!vis.has(c.id)) {
            vis.add(c.id)
            stack.push(c.id)
          }
        }
      }
    }
    return vis
  }, [nodes, listChildren, filterLower])

  const toggle = (id) => {
    setExpanded((prev) => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }

  const renderNode = (id, depth) => {
    if (!matchesFilter.has(id)) return null
    const node = nodes[id]
    if (!node) return null
    const children = sortChildren(listChildren(id))
    const hasKids = children.length > 0
    const isOpen = expanded.has(id)
    const isFolder = node.kind === 'folder'
    const pad = depth * 12

    return (
      <div key={id} role="none">
        <div
          className="flex items-center rounded py-0.5 text-sm"
          style={{ paddingLeft: pad }}
        >
          {hasKids ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                toggle(id)
              }}
              className="mr-0.5 rounded p-0.5 text-[#9aa7b4] hover:bg-[#252a31]"
              aria-expanded={isOpen}
            >
              <ChevronRight
                className={`h-4 w-4 transition ${isOpen ? 'rotate-90' : ''}`}
              />
            </button>
          ) : (
            <span className="inline-block w-5" />
          )}
          <button
            type="button"
            onClick={() => {
              if (node.kind === 'hostGroup') onSelect(id)
              else if (node.kind === 'folder' || node.kind === 'site') {
                if (hasKids) toggle(id)
              }
            }}
            className={[
              'flex flex-1 items-center gap-1 rounded px-2 py-1 text-left text-[#e6e8ea]',
              selectedId === id && node.kind === 'hostGroup'
                ? 'bg-[#1e3a5f]/80 ring-1 ring-[#049fd9]/50'
                : 'hover:bg-[#252a31]',
            ].join(' ')}
          >
            {isFolder ? (
              <Folder className="h-3.5 w-3.5 shrink-0 text-[#7eb8d6]" aria-hidden />
            ) : null}
            <span className="truncate">{node.name}</span>
            {selectedId === id && node.kind === 'hostGroup' ? (
              <Check className="ml-auto h-3.5 w-3.5 shrink-0 text-[#049fd9]" aria-hidden />
            ) : null}
          </button>
        </div>
        {hasKids && isOpen ? (
          <div>{children.map((c) => renderNode(c.id, depth + 1))}</div>
        ) : null}
      </div>
    )
  }

  return <div className="text-sm">{renderNode('site', 0)}</div>
}
