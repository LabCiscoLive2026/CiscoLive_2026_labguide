import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { BsCircleHalf } from 'react-icons/bs'
import ciscolive from "../../assets/ciscolive.png";


export default function LoginView() {
  const { isAuthenticated, login } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  if (isAuthenticated) return <Navigate to="/" replace />

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(false)

    if (login(username, password)) {
      navigate('/', { replace: true })
    } else {
      setError(true)
    }
  }

  const isDark = theme === 'dark'

  return (

        <div
      className={`flex flex-col items-center justify-center min-h-screen transition-colors ${
        isDark ? 'bg-[#0b172c]' : 'bg-gray-500'
      }`}
    >

      <div className="w-full max-w-2xl rounded-xl shadow-lg px-6 md:px-8 lg:px-10 py-7 md:py-9 lg:py-10 border border-slate-600">

        <div className='bg-red-0 flex justify-center items-center py-5 md:py-8 lg:py-10'>
          <div className="flex flex-col justify-center items-center gap-4">
              <div className="h-20 w-44 md:h-24 md:w-56 lg:h-28 lg:w-64 overflow-hidden">
                <img src={ciscolive} alt="Cisco Live logo" className="h-full w-full object-cover" />
              </div>
              <span className="font-bold leading-tight tracking-wide text-lg md:text-xl lg:text-[1.4rem] text-gray-200 text-center">
                AI Era Data Center Power Management
              </span>
            </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded bg-red-100 border border-red-300 text-red-700 text-sm">
            Error: Authentication failed.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="username"
            className="w-full px-4 py-2.5 rounded border text-sm outline-none transition-colors bg-gray-200 border-[#3a5068] text-black placeholder-gray-400 focus:border-[#4ea6a6]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className="w-full px-4 py-2.5 rounded border text-sm outline-none transition-colors bg-gray-200 border-[#3a5068] text-black placeholder-gray-400 focus:border-[#4ea6a6]"
          />
          <button
            type="submit"
            className="w-full py-2.5 rounded bg-slate-600/80! hover:bg-slate-600/60! text-white! font-medium text-sm transition-colors cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>

      {/* Footer: theme toggle + copyright */}
      <div className="w-full max-w-2xl flex flex-col md:flex-row items-center justify-between gap-2 mt-4 px-2">
        <button
          type="button"
          onClick={toggleTheme}
          className={`flex items-center gap-1.5 text-sm cursor-pointer ${
            isDark
              ? 'text-gray-400 hover:text-white'
              : 'text-gray-500 hover:text-gray-800'
          }`}
          aria-label="Toggle theme"
        >
          <BsCircleHalf />
          <span>{isDark ? 'Light' : 'Dark'}</span>
        </button>
        <span
          className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
        >
          Copyright 2026 &middot; All Rights Reserved &middot;.
        </span>
      </div>
    </div>
  )
}
