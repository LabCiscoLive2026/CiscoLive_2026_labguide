import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import ConfigurePanel from './ConfigurePanel'
import InvestigatePanel from './InvestigatePanel'
import Sidebar from './Sidebar'
import TopNav from './TopNav'

export default function AppLayout() {
  const [investigateOpen, setInvestigateOpen] = useState(false)
  const [configureOpen, setConfigureOpen] = useState(false)

  const overlayOpen = investigateOpen || configureOpen

  const closePanels = () => {
    setInvestigateOpen(false)
    setConfigureOpen(false)
  }

  return (
    <div className="flex h-screen flex-col bg-sna-bg">
      <TopNav />
      <div className="flex min-h-0 flex-1">
        <Sidebar
          investigateOpen={investigateOpen}
          configureOpen={configureOpen}
          closePanels={() => {
            setInvestigateOpen(false)
            setConfigureOpen(false)
          }}
          onToggleInvestigate={() => {
            setConfigureOpen(false)
            setInvestigateOpen((v) => !v)
          }}
          onToggleConfigure={() => {
            setInvestigateOpen(false)
            setConfigureOpen((v) => !v)
          }}
        />
        <div className="relative min-h-0 flex-1">
          {overlayOpen ? (
            <button
              type="button"
              className="absolute inset-0 z-20 cursor-default bg-black/40"
              aria-label="Close side panel"
              onClick={closePanels}
            />
          ) : null}
          {investigateOpen ? (
            <InvestigatePanel onClose={() => setInvestigateOpen(false)} />
          ) : null}
          {configureOpen ? (
            <ConfigurePanel onClose={() => setConfigureOpen(false)} />
          ) : null}
          <main className="relative z-10 h-full overflow-auto bg-sna-bg p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
