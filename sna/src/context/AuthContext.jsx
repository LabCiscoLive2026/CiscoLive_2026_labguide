import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const AUTH_KEY = 'sna_authenticated'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(
    () => localStorage.getItem(AUTH_KEY) === 'true',
  )

  const login = useCallback((username, password) => {
    const validUser = import.meta.env.VITE_AUTH_USERNAME ?? 'admin'
    const validPass = import.meta.env.VITE_AUTH_PASSWORD ?? ''
    if (username !== validUser || password !== validPass) {
      return false
    }
    localStorage.setItem(AUTH_KEY, 'true')
    setAuthenticated(true)
    return true
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY)
    setAuthenticated(false)
  }, [])

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
