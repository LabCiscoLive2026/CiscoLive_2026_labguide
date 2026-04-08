import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useHostGroups } from '../../context/HostGroupsContext'

/**
 * @param {{ value: string[], onChange: (ids: string[]) => void }} props
 */
export default function HostGroupsPicker({ value, onChange }) {
  const { selectableGroups } = useHostGroups()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const summary =
    value.length === 0
      ? 'Select host groups'
      : value.length <= 2
        ? value
            .map((id) => selectableGroups.find((g) => g.id === id)?.name ?? id)
            .join(', ')
        : `${value.length} host groups selected`

  const toggle = (id) => {
    if (value.includes(id)) onChange(value.filter((x) => x !== id))
    else onChange([...value, id])
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded border border-sna-border-strong bg-sna-input px-3 py-2 text-left text-sm text-sna-text-2 hover:bg-sna-hover"
      >
        <span className="truncate">{summary}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 opacity-60 transition ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {open ? (
        <div className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded border border-sna-border-strong bg-sna-surface py-1 shadow-lg">
          {selectableGroups.map((g) => (
            <label
              key={g.id}
              className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-sna-text hover:bg-sna-hover"
            >
              <input
                type="checkbox"
                checked={value.includes(g.id)}
                onChange={() => toggle(g.id)}
                className="rounded border-sna-border-strong"
              />
              <span>{g.name}</span>
            </label>
          ))}
        </div>
      ) : null}
    </div>
  )
}
