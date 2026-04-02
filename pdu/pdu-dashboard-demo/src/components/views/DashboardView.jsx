import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import SnapshotView from '../shared/SnapshotView'
import InletHistoryChart from '../shared/InletHistoryChart'

export default function DashboardView() {
  const containerRef = useRef(null)

  useEffect(() => {
    let root = null
    const observer = new MutationObserver(() => {
      const container = containerRef.current
      if (!container) return
      const chartEl = container.querySelector('ngx-chartjs')
      if (chartEl) {
        const wrapper = document.createElement('div')
        chartEl.replaceWith(wrapper)
        root = createRoot(wrapper)
        root.render(<InletHistoryChart />)
        observer.disconnect()
      }
    })
    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true })
    }
    return () => {
      observer.disconnect()
      if (root) root.unmount()
    }
  }, [])

  return (
    <div ref={containerRef}>
      <SnapshotView snapshotPath="/snapshots/dashboard.htm" />
    </div>
  )
}
