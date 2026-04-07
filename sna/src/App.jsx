import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { HostGroupsProvider } from './context/HostGroupsContext'
import AppLayout from './components/layout/AppLayout'
import ConfigurePlaceholderPage from './pages/ConfigurePlaceholderPage'
import FlowSearchPage from './pages/FlowSearchPage'
import HostGroupManagementPage from './pages/HostGroupManagementPage'
import LoginPage from './pages/LoginPage'
import PlaceholderPage from './pages/PlaceholderPage'
import SecurityInsightDashboardPage from './pages/SecurityInsightDashboardPage'

function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

function RootRedirect() {
  const { isAuthenticated } = useAuth()
  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />
}

export default function App() {
  return (
    <HostGroupsProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route
                  path="dashboard"
                  element={<SecurityInsightDashboardPage />}
                />
                <Route path="flow-search" element={<FlowSearchPage />} />
                <Route
                  path="host-groups"
                  element={<HostGroupManagementPage />}
                />
                <Route
                  path="hostgroupmanagement"
                  element={<HostGroupManagementPage />}
                />
                <Route
                  path="configure/:section"
                  element={<ConfigurePlaceholderPage />}
                />
                <Route
                  path="host-search"
                  element={<PlaceholderPage title="Host Search" />}
                />
                <Route
                  path="copyright"
                  element={<PlaceholderPage title="Copyright Infringement" />}
                />
                <Route
                  path="sal"
                  element={
                    <PlaceholderPage title="Security Analytics and Logging (OnPrem)" />
                  }
                />
                <Route
                  path="jobs"
                  element={<PlaceholderPage title="Job Management" />}
                />
                <Route
                  path="saved-searches"
                  element={<PlaceholderPage title="Saved Searches" />}
                />
                <Route
                  path="saved-results"
                  element={<PlaceholderPage title="Saved Results" />}
                />
                <Route path="hosts" element={<PlaceholderPage title="Hosts" />} />
                <Route path="users" element={<PlaceholderPage title="Users" />} />
                <Route
                  path="interfaces"
                  element={<PlaceholderPage title="Interfaces" />}
                />
                <Route path="roles" element={<PlaceholderPage title="Roles" />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HostGroupsProvider>
  )
}
