import {
  ChevronDown,
  ChevronUp,
  Globe,
  HelpCircle,
  Search as SearchIcon,
  User,
  UserRound,
  Wand2,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { CiscoLogo } from './base'

const USER_LABEL = 'CXlabs'

export default function TopNav() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [themeChoice, setThemeChoice] = useState(
    /** @type {'light' | 'dark' | 'auto'} */ ('dark'),
  )
  const menuRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [menuOpen])

  const handleLogout = () => {
    setMenuOpen(false)
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="flex h-16 shrink-0 justify-between items-center gap-4 border-b border-[#2a2f36] bg-zinc-800 px-4 text-sm text-[#e6e8ea]">
      <div className="flex min-w-0 shrink-0 items-center gap-3">
        <CiscoLogo />
        <span className="whitespace-nowrap text-base font-medium tracking-tight">
          Secure Network Analytics
        </span>
      </div>

      <div className="flex shrink-0 w-[45%] bg-red-0 items-center gap-3">
      <div className="mx-auto flex max-w-2xl flex-1 items-center gap-0 rounded border border-[#3d454e] bg-[#0f1216]">
        <button
          type="button"
          className="flex items-center gap-1 border-r border-[#3d454e] px-3 py-2 text-[#b3bcc6] hover:bg-[#1e2328]"
        >
          Host
          <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
        </button>
        <div className="flex flex-1 items-center gap-2 px-3 py-2 text-[#6b7784]">
          <SearchIcon className="h-4 w-4 shrink-0" aria-hidden />
          <input
            type="search"
            placeholder="Enter IP Address or Range"
            className="min-w-0 flex-1 bg-transparent text-[#e6e8ea] placeholder:text-[#6b7784] focus:outline-none"
          />
        </div>
      </div>
        <button
          type="button"
          className="rounded p-1.5 text-[#b3bcc6] hover:bg-[#252a31]"
          aria-label="Help"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
        <div className="hidden h-6 w-px bg-[#3d454e] sm:block" aria-hidden />

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className={[
              'inline-flex h-9 shrink-0 min-w-[10.5rem] max-w-[12rem] items-center justify-between gap-2 rounded border px-2.5 text-sm text-[#e6e8ea] transition-colors',
              menuOpen
                ? 'border-[#505a65] bg-[#252a31] shadow-sm'
                : 'border-[#3d454e] bg-[#1e2328] hover:border-[#505a65] hover:bg-[#2a2f36]',
            ].join(' ')}
          >
            <span className="flex items-center gap-2">
              <User className="h-5 w-5 opacity-70" aria-hidden />
              <span className="truncate tracking-wide">{USER_LABEL}</span>
            </span>
            {menuOpen ? (
              <ChevronUp className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
            ) : (
              <ChevronDown className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
            )}
          </button>

          {menuOpen ? (
            <div
              className="absolute right-0 z-50 mt-1 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded border border-[#3d454e] bg-[#1c2128] shadow-xl"
              role="menu"
            >
              <div className="flex items-center gap-3 border-b border-[#3d454e] px-4 py-3">
                <User className="h-8 w-8 shrink-0 text-[#9aa7b4]" aria-hidden />
                <span className="flex-1 font-medium text-white">
                  {USER_LABEL}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="shrink-0 rounded border border-[#049fd9] px-3 py-1.5 text-xs font-medium text-[#049fd9] hover:bg-[#049fd9]/10"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>

              <div className="flex items-center gap-3 border-b border-[#3d454e] px-4 py-3">
                <UserRound className="h-5 w-5 shrink-0 text-[#9aa7b4]" />
                <span className="min-w-0 flex-1 font-medium text-white">
                  Profile
                </span>
                <div className="flex shrink-0 flex-wrap justify-end gap-x-3 gap-y-1 text-xs">
                  <button
                    type="button"
                    className="text-[#049fd9] hover:underline"
                  >
                    Change Password
                  </button>
                  <button
                    type="button"
                    className="text-[#049fd9] hover:underline"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              <div className="border-b border-[#3d454e] px-4 py-3">
                <div className="mb-3 flex items-center gap-2 text-white">
                  <Wand2 className="h-4 w-4 text-[#9aa7b4]" aria-hidden />
                  <span className="font-semibold">Theme</span>
                </div>
                <div className="space-y-2 pl-6">
                  {[
                    { id: 'light', label: 'Light' },
                    { id: 'dark', label: 'Dark' },
                    { id: 'auto', label: 'Auto' },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className="flex cursor-pointer items-center gap-2 text-sm text-[#c4cdd6]"
                    >
                      <input
                        type="radio"
                        name="nav-theme"
                        checked={themeChoice === opt.id}
                        onChange={() => setThemeChoice(opt.id)}
                        className="size-4 shrink-0 border-[#5c6773] bg-[#0f1216] accent-[#049fd9] focus:outline-none focus:ring-2 focus:ring-[#049fd9]/40 focus:ring-offset-0"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[#252a31]"
              >
                <Globe className="h-4 w-4 shrink-0 text-[#9aa7b4]" aria-hidden />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-white">Language</div>
                  <div className="text-xs text-[#9aa7b4]">
                    English (United States)
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 shrink-0 text-[#9aa7b4]" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
