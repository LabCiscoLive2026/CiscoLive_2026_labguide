import { BarChart3, Globe, Monitor, Search, Wrench } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

const navBtn =
  'flex w-full flex-col items-center gap-1 border-l-2 border-transparent py-3 text-[10px] text-[#9aa7b4] transition-colors hover:bg-[#22272e] hover:text-[#e6e8ea]'

function matchConfigureRoute(pathname) {
  return (
    pathname === '/host-groups' ||
    pathname === '/hostgroupmanagement' ||
    pathname.startsWith('/configure/')
  )
}

function matchInvestigateRoute(pathname) {
  if (matchConfigureRoute(pathname)) return false
  const prefixes = [
    '/flow-search',
    '/host-search',
    '/copyright',
    '/sal',
    '/jobs',
    '/saved-searches',
    '/saved-results',
    '/hosts',
    '/users',
    '/interfaces',
    '/roles',
  ]
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

export default function Sidebar({
  investigateOpen,
  configureOpen,
  closePanels,
  onToggleInvestigate,
  onToggleConfigure,
}) {
  const { pathname } = useLocation()

  const investigateActive =
    investigateOpen || matchInvestigateRoute(pathname)
  const configureActive =
    configureOpen || matchConfigureRoute(pathname)

  return (
    <aside className="flex w-14 shrink-0 flex-col border-r border-[#2a2f36] bg-[#16191d]">
      <div className="flex flex-col items-center py-4 text-center">
        <Globe className="h-5 w-5 text-[#7eb8d6]" aria-hidden />
        <span className="mt-1 max-w-[3.25rem] break-all text-[9px] leading-tight text-[#6b7784]">
          ds.mxc.cisco.com
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        <NavLink
          to="/dashboard"
          onClick={() => closePanels?.()}
          className={({ isActive }) =>
            [
              navBtn,
              isActive ? 'border-[#049fd9] bg-[#1e262e] text-white' : '',
            ].join(' ')
          }
        >
          <Monitor className="h-6 w-6" aria-hidden />
          <span>Monitor</span>
        </NavLink>

        <button
          type="button"
          onClick={onToggleInvestigate}
          className={[
            navBtn,
            investigateActive
              ? 'border-[#049fd9] bg-[#1e262e] text-white'
              : '',
          ].join(' ')}
        >
          <Search className="h-6 w-6" aria-hidden />
          <span>Investigate</span>
        </button>

        <button type="button" className={navBtn}>
          <BarChart3 className="h-6 w-6" aria-hidden />
          <span>Report</span>
        </button>

        <button
          type="button"
          onClick={onToggleConfigure}
          className={[
            navBtn,
            configureActive
              ? 'border-[#049fd9] bg-[#1e262e] text-white'
              : '',
          ].join(' ')}
        >
          <Wrench className="h-6 w-6" aria-hidden />
          <span>Configure</span>
        </button>
      </nav>
    </aside>
  )
}
