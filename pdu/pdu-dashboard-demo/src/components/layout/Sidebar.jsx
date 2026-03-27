import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsChevronRight, BsBoxArrowUpRight } from 'react-icons/bs'

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', path: '/', hasView: true },
  { id: 'pdu', label: 'PDU', path: '/pdu/1', hasView: true },
  { id: 'inlet', label: 'Inlet', path: '/inlets/1/1', hasView: true },
  { id: 'outlets', label: 'Outlets', path: '/outlets/1', hasView: true },
  { id: 'outletgroups', label: 'Outlet Groups', path: '/outletgroups', hasView: false },
  { id: 'ocps', label: 'OCPs', path: '/ocps', hasView: false },
  { id: 'peripherals', label: 'Peripherals', path: '/peripherals/1', hasView: false },
  { id: 'usermanagement', label: 'User Management', path: '/userManagement', hasView: false, hasSubmenu: true },
  { id: 'devicesettings', label: 'Device Settings', path: '/deviceSettings', hasView: false, hasSubmenu: true },
  { id: 'maintenance', label: 'Maintenance', path: '/maintenance', hasView: false, hasSubmenu: true },
]

const NO_VIEW_MESSAGE = 'No View'

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [tooltipItemId, setTooltipItemId] = useState(null)

  const currentPath = location.pathname || '/'

  const isActive = (item) => {
    if (item.path === '/') return currentPath === '/' || currentPath === ''
    return currentPath.startsWith(item.path)
  }

  const handleClick = (item) => {
    if (item.hasView) {
      navigate(item.path)
      setTooltipItemId(null)
    } else {
      setTooltipItemId(item.id)
      setTimeout(() => setTooltipItemId(null), 2500)
    }
  }

  return (
    // 213448 #4b5563
    <aside className="w-[168px] md:w-[176px] lg:w-[196px] xl:w-[220px] shrink-0 flex flex-col bg-[#121b23] text-white border-r border-[#1b2834] overflow-hidden">
      <div className="flex-1 overflow-y-auto min-h-0 py-2">
        <ul className="nav list-none m-0 p-0 divide-y divide-gray-600">
          {MENU_ITEMS.map((item) => (
            <li key={item.id} className="relative">
              <button
                type="button"
                onClick={() => handleClick(item)}
                style={{
                  borderLeft: isActive(item) ? '5px solid #4083d5' : '5px solid transparent',
                  backgroundColor: isActive(item) ? '#192631' : 'transparent',
                }}
                className={`w-full text-left px-3.5 md:px-4 lg:px-5 xl:px-6 py-3 lg:py-4 text-[13px] lg:text-md cursor-pointer flex items-center justify-between text-white ${
                  !isActive(item) ? 'hover:bg-[#c8d2d61a]' : ''
                }`}
              >
                <span className="sidebar-text truncate">{item.label}</span>
                {item.hasSubmenu && <BsChevronRight className="text-md opacity-90 shrink-0" />}
              </button>
              {tooltipItemId === item.id && (
                <div
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-[#1f2937] text-white text-xs rounded shadow z-10 whitespace-nowrap"
                  role="tooltip"
                >
                  {NO_VIEW_MESSAGE}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden lg:block px-4 py-4 mt-4 border-t border-gray-600 text-md text-white space-y-2">
          <div>
            <span className="font-semibold block">Model</span>
            <span>PX2-5522</span>
          </div>
          <div>
            <span className="font-semibold block">Firmware Version</span>
            <span>4.2.0.5-50274</span>
          </div>
          <div className='flex flex-col'>
            <span className="font-semibold block">Help</span>
            <a href="https://help.customer.com/pdu-g2/4.2.0/" target="_blank" rel="noopener noreferrer" className="flex gap-1.5 items-center text-[#0066cc]">
              <BsBoxArrowUpRight className="text-[10px] shrink-0" />
              <span>Online Documentation</span>
            </a>
            <a href="https://www.customer.com/support/pdu-g2/4.2.0/" target="_blank" rel="noopener noreferrer" className="flex gap-1.5 items-center text-[#0066cc]">
              <BsBoxArrowUpRight className="text-[10px] shrink-0" />
              <span>customer Support</span>
            </a>
          </div>
          {/* <div>
            <span className="font-semibold block">
              <a href="#" className="text-[#0066cc]">Last Login</a>
            </span>
            <span>9/5/2012, 6:28:49 PM CDT</span>
          </div>
          <div>
            <span className="font-semibold block">
              <a href="#" className="text-[#0066cc]">Device Time</a>
            </span>
            <span>9/5/2012, 8:06:26 PM EDT</span>
          </div> */}
        </div>
      </div>
    </aside>
  )
}
