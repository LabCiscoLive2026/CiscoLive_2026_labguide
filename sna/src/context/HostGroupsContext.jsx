import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

/** @typedef {{ baseline: boolean, excludedServices: boolean, floodDisabled: boolean, trapScanners: boolean }} HostGroupAdvanced */

/**
 * @typedef {'site' | 'folder' | 'hostGroup'} HostGroupKind
 * @typedef {{
 *   id: string,
 *   parentId: string | null,
 *   name: string,
 *   kind: HostGroupKind,
 *   description?: string,
 *   ipRanges?: string,
 *   advanced?: HostGroupAdvanced,
 * }} HostGroupNode
 */

const defaultAdvanced = () => ({
  baseline: true,
  excludedServices: true,
  floodDisabled: false,
  trapScanners: false,
})

function newHostGroupId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `hg-${crypto.randomUUID()}`
  }
  return `hg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function seedNodes() {
  /** @type {Record<string, HostGroupNode>} */
  const m = {
    site: {
      id: 'site',
      parentId: null,
      name: 'ds.mxc.cisco.com',
      kind: 'site',
    },
    inside: {
      id: 'inside',
      parentId: 'site',
      name: 'Inside Hosts',
      kind: 'hostGroup',
      description: '',
      ipRanges: '',
      advanced: defaultAdvanced(),
    },
    outside: {
      id: 'outside',
      parentId: 'site',
      name: 'Outside Hosts',
      kind: 'hostGroup',
      description: '',
      ipRanges: '',
      advanced: defaultAdvanced(),
    },
    'catch-all': {
      id: 'catch-all',
      parentId: 'inside',
      name: 'Catch All',
      kind: 'hostGroup',
      description: '',
      ipRanges: '',
      advanced: defaultAdvanced(),
    },
    'by-function': {
      id: 'by-function',
      parentId: 'inside',
      name: 'By Function',
      kind: 'folder',
    },
    'by-location': {
      id: 'by-location',
      parentId: 'inside',
      name: 'By Location',
      kind: 'folder',
    },
    mxc: {
      id: 'mxc',
      parentId: 'inside',
      name: 'MXC',
      kind: 'folder',
    },
    'protected-asset': {
      id: 'protected-asset',
      parentId: 'inside',
      name: 'Protected Asset Monitoring',
      kind: 'hostGroup',
      description: '',
      ipRanges: '',
      advanced: defaultAdvanced(),
    },
    honeypot: {
      id: 'honeypot',
      parentId: 'inside',
      name: 'Protected Trapped Hosts - Honeypot',
      kind: 'hostGroup',
      description: '',
      ipRanges: '',
      advanced: defaultAdvanced(),
    },
    'seattle-dc': {
      id: 'seattle-dc',
      parentId: 'inside',
      name: 'SEATTLE Data Center',
      kind: 'hostGroup',
      description: '',
      ipRanges: '',
      advanced: defaultAdvanced(),
    },
  }
  return m
}

const HostGroupsContext = createContext(null)

export function HostGroupsProvider({ children }) {
  const [nodes, setNodes] = useState(seedNodes)

  const getNode = useCallback((id) => nodes[id] ?? null, [nodes])

  const listChildren = useCallback(
    (parentId) =>
      Object.values(nodes).filter((n) => n.parentId === parentId),
    [nodes],
  )

  const selectableGroups = useMemo(
    () =>
      Object.values(nodes).filter(
        (n) => n.kind === 'hostGroup' && n.id !== 'site',
      ),
    [nodes],
  )

  const addHostGroup = useCallback((parentId, opts = {}) => {
    const trimmed = (opts.name ?? '').trim()
    if (!trimmed) return null
    const id = newHostGroupId()
    setNodes((prev) => {
      const resolvedParent = parentId && prev[parentId] ? parentId : 'inside'
      return {
        ...prev,
        [id]: {
          id,
          parentId: resolvedParent,
          name: trimmed,
          kind: 'hostGroup',
          description: opts.description ?? '',
          ipRanges: opts.ipRanges ?? '',
          advanced: opts.advanced ?? defaultAdvanced(),
        },
      }
    })
    return id
  }, [])

  const updateHostGroup = useCallback((id, patch) => {
    setNodes((prev) => {
      const cur = prev[id]
      if (!cur || cur.kind !== 'hostGroup') return prev
      const next = { ...cur, ...patch }
      if (patch.advanced) {
        next.advanced = { ...defaultAdvanced(), ...cur.advanced, ...patch.advanced }
      }
      return { ...prev, [id]: next }
    })
  }, [])

  const removeHostGroup = useCallback((id) => {
    setNodes((prev) => {
      const cur = prev[id]
      if (!cur || cur.kind !== 'hostGroup' || id === 'site') return prev
      const next = { ...prev }
      const reparent = cur.parentId ?? 'inside'
      for (const k of Object.keys(next)) {
        if (next[k].parentId === id) {
          next[k] = { ...next[k], parentId: reparent }
        }
      }
      delete next[id]
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      nodes,
      getNode,
      listChildren,
      selectableGroups,
      addHostGroup,
      updateHostGroup,
      removeHostGroup,
    }),
    [
      nodes,
      getNode,
      listChildren,
      selectableGroups,
      addHostGroup,
      updateHostGroup,
      removeHostGroup,
    ],
  )

  return (
    <HostGroupsContext.Provider value={value}>
      {children}
    </HostGroupsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useHostGroups() {
  const ctx = useContext(HostGroupsContext)
  if (!ctx) throw new Error('useHostGroups must be used within HostGroupsProvider')
  return ctx
}
