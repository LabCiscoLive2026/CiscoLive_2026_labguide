import { ChevronDown, Globe, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { CiscoLogo, EarthImg } from '../components/layout/base'

const DEMO_CLIENT_IP = '10.26.192.130'

export default function LoginPage() {
  const { login } = useAuth()
  const { resolved: theme, setTheme } = useTheme()
  const isDark = theme === 'dark'
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [welcomeSnapshot, setWelcomeSnapshot] = useState({
    atMs: 0,
  })

  const displayName = "CiscoLive 2026"

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const ok = login(user, password)
    if (!ok) {
      setError('Invalid username or password')
      return
    }
    window.history.replaceState(null, '', '/login')
    setWelcomeSnapshot({ atMs: Date.now() })
    setShowWelcomeModal(true)
  }

  const handleWelcomeOk = () => {
    setShowWelcomeModal(false)
    navigate('/dashboard', { replace: true })
  }

  const lastLoginLine =
    welcomeSnapshot.atMs > 0
      ? new Date(welcomeSnapshot.atMs).toLocaleString(undefined, {
          dateStyle: 'short',
          timeStyle: 'short',
        })
      : ''

  return (
    <div className={`relative flex min-h-screen flex-col ${isDark ? 'bg-[#12161b]' : 'bg-white'}`}>
      <header className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-6 py-4">
        <div className="flex justify-center items-end gap-2 text-white">
          <CiscoLogo />
          <span className="text-lg font-medium leading-7 tracking-wide text-[#6cc04a]">
            SECURE
          </span>
        </div>
        <div className={`flex items-center gap-6 text-sm ${isDark ? 'text-[#b3bcc6]' : 'text-[#3d4a5c]'}`}>
          <button
            type="button"
            className="flex items-center gap-1 hover:opacity-80"
          >
            <Globe className="h-4 w-4" aria-hidden />
            Language
            <ChevronDown className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="flex items-center gap-1 hover:opacity-80"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            Theme
          </button>
        </div>
      </header>

      <div className="flex min-h-0 w-full flex-1 flex-col md:flex-row md:items-stretch">
        <div className="relative flex w-full min-h-[min(42vh,22rem)] shrink-0 items-center justify-center bg-[#1c3e6a] md:min-h-0 md:w-[50%]">
          <EarthImg />
        </div>
        
        <div className="flex w-full flex-1 flex-col justify-center px-8 py-12 md:w-[50%] md:flex-none md:px-8 lg:px-8 md:py-12">
          <div className='md:w-[80%]'>
            <h1 className={`mb-10 text-5xl font-bold tracking-tight ${isDark ? 'text-[#e6e8ea]' : 'text-[#2b3848]'}`}>
              Secure Network Analytics
            </h1>
            <form onSubmit={handleSubmit} className="max-w-md space-y-6">
              <div>
                <label className={`mb-1 block text-sm font-medium ${isDark ? 'text-[#b3bcc6]' : 'text-[#3d4a5c]'}`}>
                  User Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  autoComplete="username"
                  placeholder="User Name"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className={`rounded-sm md:w-[60%] text-sm border border-[#0b5fc0] px-1 py-1 placeholder:text-[#9aa5b1] focus:border-[#005eb8] focus:outline-none focus:ring-1 focus:ring-[#005eb8] ${isDark ? 'bg-[#0f1216] text-[#e6e8ea]' : 'text-[#2b3848]'}`}
                />
              </div>
              <div>
                <label className={`mb-1 block text-sm font-medium ${isDark ? 'text-[#b3bcc6]' : 'text-[#3d4a5c]'}`}>
                  Password <span className="text-red-600">*</span>
                </label>
                <div className="relative w-full md:w-[60%]">
                  <input
                    type={showPw ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full rounded-sm border border-[#0b5fc0] px-2 py-1.5 pr-14 text-sm placeholder:text-[#9aa5b1] focus:border-[#005eb8] focus:outline-none focus:ring-1 focus:ring-[#005eb8] ${isDark ? 'bg-[#0f1216] text-[#e6e8ea]' : 'text-[#2b3848]'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="absolute inset-y-0 right-0 flex items-center pr-2 text-sm text-[#005eb8] hover:underline"
                  >
                    Show
                  </button>
                </div>
              </div>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <div className="flex md:w-[60%] justify-end pt-2">
                <button
                  type="submit"
                  className="rounded-md bg-[#005eb8] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#004a94]"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className={`border-t px-6 py-2 text-center text-xs ${isDark ? 'border-[#2a2f36] text-[#6b7784]' : 'border-[#e8ecef] text-[#7a8794]'}`}>
        Copyright © 2026 Cisco Systems Inc. All rights reserved.{' '}
        <a href="#" className="text-[#005eb8] hover:underline">
          Privacy Statement
        </a>
      </footer>

      {showWelcomeModal ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4"
          role="presentation"
        >
          <div
            className={`w-full max-w-md overflow-hidden rounded-lg shadow-xl ${isDark ? 'bg-[#1c2128]' : 'bg-white'}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-dialog-title"
          >
            <div className="px-6 pt-6 pb-4">
              <h2
                id="welcome-dialog-title"
                className={`text-lg font-bold tracking-tight ${isDark ? 'text-[#e6e8ea]' : 'text-[#1a1a1a]'}`}
              >
                Welcome to {displayName}!
              </h2>
              <div className={`mt-4 space-y-3 text-sm leading-relaxed ${isDark ? 'text-[#b3bcc6]' : 'text-[#3d4a5c]'}`}>
                <p className={isDark ? 'text-[#9aa7b4]' : 'text-[#5c6a76]'}>
                  You have successfully logged in.
                </p>
                {lastLoginLine ? (
                  <p className={`text-xs ${isDark ? 'text-[#6b7784]' : 'text-[#7a8794]'}`}>
                    Session started {lastLoginLine} from {DEMO_CLIENT_IP}.
                  </p>
                ) : null}
              </div>
            </div>
            <div className={`flex justify-end border-t px-4 py-3 ${isDark ? 'border-[#2a2f36] bg-[#16191d]' : 'border-[#e8ecef] bg-[#f5f5f5]'}`}>
              <button
                type="button"
                onClick={handleWelcomeOk}
                className="rounded border border-[#005073] bg-[#005073] px-6 py-1 text-sm font-medium text-white shadow-sm hover:bg-[#003d52]"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
