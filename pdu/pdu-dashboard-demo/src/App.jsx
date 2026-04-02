import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import AppLayout from './components/layout/AppLayout'
import DashboardView from './components/views/DashboardView'
import InletView from './components/views/InletView'
import PduView from './components/views/PduView'
import OutletsView from './components/views/OutletsView'
import LoginView from './components/views/LoginView'

function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

const MIN_SUPPORTED_WIDTH = 768

function UnsupportedScreen() {
  return (
    <div className="unsupported-screen">
      <div className="unsupported-screen__card">
        <h1 className="unsupported-screen__title">Screen size not supported</h1>
        <p className="unsupported-screen__text">
          This dashboard is available on tablets, laptops, and desktop screens only.
        </p>
        <p className="unsupported-screen__text">
          Please use a device with a minimum width of 768px.
        </p>
      </div>
    </div>
  )
}

function App() {
  const [isSupportedScreen, setIsSupportedScreen] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.innerWidth >= MIN_SUPPORTED_WIDTH
  })

  useEffect(() => {
    const handleResize = () => {
      setIsSupportedScreen(window.innerWidth >= MIN_SUPPORTED_WIDTH)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isSupportedScreen) {
    return <UnsupportedScreen />
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <HashRouter>
            <div className="h-full min-h-screen w-full max-w-[1800px] mx-auto">
            <Routes>
              <Route path="/login" element={<LoginView />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<DashboardView />} />
                  <Route path="pdu/1" element={<PduView />} />
                  <Route path="inlets/1/1" element={<InletView />} />
                  <Route path="outlets/1" element={<OutletsView />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </HashRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
