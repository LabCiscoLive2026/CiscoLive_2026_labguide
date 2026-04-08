import { X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const groups = [
  {
    title: null,
    items: [
      { to: '/flow-search', label: 'Flow Search', end: true },
      { to: '/host-search', label: 'Host Search' },
      { to: '/copyright', label: 'Copyright Infringement' },
      { to: '/sal', label: 'Security Analytics and Logging (OnPrem)' },
    ],
  },
  {
    title: 'Search Management',
    items: [
      { to: '/jobs', label: 'Job Management' },
      { to: '/saved-searches', label: 'Saved Searches' },
      { to: '/saved-results', label: 'Saved Results' },
    ],
  },
  {
    title: 'Assets',
    items: [
      { to: '/hosts', label: 'Hosts' },
      { to: '/host-groups', label: 'Host Groups' },
      { to: '/users', label: 'Users' },
      { to: '/interfaces', label: 'Interfaces' },
      { to: '/roles', label: 'Roles' },
    ],
  },
]

export default function InvestigatePanel({ onClose }) {
  return (
    <aside className="absolute left-0 top-0 z-30 flex h-full w-72 flex-col border-r border-sna-border bg-sna-surface shadow-xl">
      <div className="flex items-center justify-between border-b border-sna-border px-4 py-3">
        <span className="text-sm font-semibold text-sna-text">Investigate</span>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 text-sna-text-2 hover:bg-sna-hover"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-2 text-sm">
        {groups.map((group) => (
          <div key={group.title ?? 'main'} className="mb-4">
            {group.title ? (
              <div className="px-4 pb-2 pt-3 text-xs font-semibold uppercase tracking-wide text-sna-text-muted">
                {group.title}
              </div>
            ) : null}
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      [
                        'block px-4 py-2 text-sna-text-2 hover:bg-sna-hover',
                        isActive ? 'bg-sna-active text-sna-text' : '',
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
