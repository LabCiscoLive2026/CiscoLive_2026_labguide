import { X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const groups = [
  {
    title: 'Detection',
    items: [
      { to: '/host-groups', label: 'Host Group Management' },
      { to: '/configure/alarm-severity', label: 'Alarm Severity' },
      { to: '/configure/policy-management', label: 'Policy Management' },
      { to: '/configure/response-management', label: 'Response Management' },
      { to: '/configure/network-scanners', label: 'Network Scanners' },
      { to: '/configure/analytics', label: 'Analytics' },
      { to: '/configure/alerts', label: 'Alerts' },
      { to: '/configure/pack-management', label: 'Pack Management' },
    ],
  },
  {
    title: 'Global',
    items: [
      { to: '/configure/central-management', label: 'Central Management' },
      { to: '/configure/user-management', label: 'User Management' },
      { to: '/configure/manager', label: 'Manager' },
      { to: '/configure/udp-director', label: 'UDP Director' },
      { to: '/configure/external-lookup', label: 'External Lookup' },
    ],
  },
  {
    title: 'System',
    items: [
      { to: '/configure/services', label: 'Services' },
      { to: '/configure/applications', label: 'Applications' },
      { to: '/configure/domain-properties', label: 'Domain Properties' },
      { to: '/configure/flow-collectors', label: 'Flow Collectors' },
      { to: '/configure/exporters', label: 'Exporters' },
    ],
  },
]

export default function ConfigurePanel({ onClose }) {
  return (
    <aside className="absolute left-0 top-0 z-30 flex h-full w-80 flex-col border-r border-sna-border bg-sna-surface shadow-xl">
      <div className="flex items-center justify-between border-b border-sna-border px-4 py-3">
        <span className="text-sm font-semibold text-sna-text">Configure</span>
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
          <div key={group.title} className="mb-4">
            <div className="px-4 pb-2 pt-3 text-xs font-semibold uppercase tracking-wide text-sna-text-muted">
              {group.title}
            </div>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end ?? false}
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
