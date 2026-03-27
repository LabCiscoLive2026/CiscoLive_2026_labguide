import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'pdu_session'
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000

function getStoredSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const session = JSON.parse(raw)
    if (session.expiresAt > Date.now()) return session
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }
  return null
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => getStoredSession())

  useEffect(() => {
    if (!session) return
    const remaining = session.expiresAt - Date.now()
    if (remaining <= 0) {
      setSession(null)
      localStorage.removeItem(STORAGE_KEY)
      return
    }
    const timer = setTimeout(() => {
      setSession(null)
      localStorage.removeItem(STORAGE_KEY)
    }, remaining)
    return () => clearTimeout(timer)
  }, [session])

  const login = useCallback((username, password) => {
    const validUser = import.meta.env.VITE_LOGIN_USERNAME
    const validPass = import.meta.env.VITE_LOGIN_PASSWORD

    if (username === validUser && password === validPass) {
      const newSession = {
        user: username,
        expiresAt: Date.now() + SESSION_DURATION_MS,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession))
      setSession(newSession)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setSession(null)
  }, [])

  const value = {
    isAuthenticated: !!session,
    user: session?.user ?? null,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
