import { ChevronDown, Info } from 'lucide-react'
import { useMemo, useState } from 'react'
import HostGroupsPicker from '../components/host-groups/HostGroupsPicker'

function FieldLabel({ children, hint }) {
  return (
    <div className="mb-1 flex items-center gap-1 text-xs text-sna-text-2">
      {children}
      {hint ? (
        <Info className="h-3.5 w-3.5 text-sna-text-muted" aria-hidden />
      ) : null}
    </div>
  )
}

function SelectLike({ value, className = '' }) {
  return (
    <button
      type="button"
      className={`flex w-full items-center justify-between rounded border border-sna-border-strong bg-sna-surface px-3 py-2 text-left text-sm text-sna-text hover:border-sna-text-muted ${className}`}
    >
      <span>{value}</span>
      <ChevronDown className="h-4 w-4 shrink-0 opacity-60" aria-hidden />
    </button>
  )
}

export default function FlowSearchPage() {
  const [subjectHostGroups, setSubjectHostGroups] = useState([])
  const [peerHostGroups, setPeerHostGroups] = useState([])

  const searchName = useMemo(() => {
    const d = new Date()
    return `Flow on ${d.toLocaleDateString()} at ${d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
  }, [])

  const columns = [
    {
      title: 'Subject',
      fields: [
        { label: 'Host IP Address', placeholder: 'Enter IP or range', type: 'text' },
        {
          label: 'Host Groups',
          type: 'hostGroups',
          value: subjectHostGroups,
          onChange: setSubjectHostGroups,
        },
      ],
    },
    {
      title: 'Connection',
      fields: [
        { label: 'Port / Protocol', placeholder: 'e.g. 443 / TCP', type: 'text' },
        { label: 'Applications', type: 'button', button: 'Select' },
      ],
    },
    {
      title: 'Peer',
      fields: [
        { label: 'Host IP Address', placeholder: 'Enter IP or range', type: 'text' },
        {
          label: 'Host Groups',
          type: 'hostGroups',
          value: peerHostGroups,
          onChange: setPeerHostGroups,
        },
      ],
    },
  ]

  return (
    <div className="mx-auto max-w-[1400px] text-sna-text">
      <div className="mb-4 flex items-center gap-2">
        <h1 className="text-lg font-semibold">Flow Search</h1>
        <Info className="h-4 w-4 text-sna-text-muted" aria-hidden />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {[
          'Last 5 minutes (Time Range)',
          '2,000 (Max Records)',
          'Either (Orientation)',
          'All (Flow Direction)',
        ].map((label) => (
          <span
            key={label}
            className="rounded-full border border-sna-pill-border bg-sna-pill-bg px-3 py-1 text-xs text-sna-pill-text"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-end gap-2 border-b border-sna-border pb-4">
        <button
          type="button"
          className="rounded border border-sna-border-strong px-4 py-2 text-sm text-sna-text hover:bg-sna-hover"
        >
          Restore Defaults
        </button>
        <button
          type="button"
          className="flex items-center gap-1 rounded border border-sna-border-strong px-4 py-2 text-sm text-sna-text hover:bg-sna-hover"
        >
          Load Saved Search <ChevronDown className="h-4 w-4" aria-hidden />
        </button>
        <button
          type="button"
          className="rounded border border-sna-border-strong px-4 py-2 text-sm text-sna-text hover:bg-sna-hover"
        >
          Save
        </button>
        <button
          type="button"
          className="rounded bg-[#005eb8] px-6 py-2 text-sm font-medium text-white hover:bg-[#004a94]"
        >
          Search
        </button>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <FieldLabel>Search Type</FieldLabel>
          <SelectLike value="Flow" />
        </div>
        <div>
          <FieldLabel>Time Range</FieldLabel>
          <SelectLike value="Last 5 minutes" />
        </div>
        <div>
          <FieldLabel>Search Name</FieldLabel>
          <input
            type="text"
            readOnly
            value={searchName}
            className="w-full rounded border border-sna-border-strong bg-sna-surface px-3 py-2 text-sm text-sna-text"
          />
        </div>
        <div>
          <FieldLabel>Max Records Returned</FieldLabel>
          <SelectLike value="2,000" />
        </div>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        {columns.map((col) => (
          <div
            key={col.title}
            className="rounded border border-sna-border bg-sna-surface p-4"
          >
            <h3 className="mb-3 text-sm font-semibold text-sna-text">
              {col.title}
            </h3>
            <div className="space-y-4">
              {col.fields.map((f) => (
                <div key={`${col.title}-${f.label}`}>
                  <FieldLabel>{f.label}</FieldLabel>
                  {f.type === 'hostGroups' ? (
                    <HostGroupsPicker
                      value={f.value}
                      onChange={f.onChange}
                    />
                  ) : f.type === 'button' ? (
                    <button
                      type="button"
                      className="w-full rounded border border-sna-border-strong bg-sna-input px-3 py-2 text-sm text-sna-text-2 hover:bg-sna-hover"
                    >
                      {f.button}
                    </button>
                  ) : (
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      className="w-full rounded border border-sna-border-strong bg-sna-input px-3 py-2 text-sm text-sna-text placeholder:text-sna-text-muted focus:border-[#005eb8] focus:outline-none"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {[
          'Advanced Subject Options',
          'Advanced Connection Options',
          'Advanced Peer Options',
        ].map((title) => (
          <button
            key={title}
            type="button"
            className="flex items-center justify-between rounded border border-sna-border bg-sna-surface px-4 py-3 text-left text-sm text-sna-text-2 hover:bg-sna-hover"
          >
            <span className="flex items-center gap-2">
              {title}
              <Info className="h-3.5 w-3.5 text-sna-text-muted" aria-hidden />
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" aria-hidden />
          </button>
        ))}
      </div>
    </div>
  )
}
