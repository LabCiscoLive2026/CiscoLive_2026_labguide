import { useEffect, useRef } from 'react'
import SnapshotView from '../shared/SnapshotView'
import inletHistoryImg from '../../assets/inlet_history.png'

export default function InletView() {
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const container = containerRef.current
      if (!container) return
      const chartEl = container.querySelector('ngx-chartjs')
      if (chartEl) {
        const img = document.createElement('img')
        img.src = inletHistoryImg
        img.alt = 'Inlet History Chart'
        img.style.cssText = 'display:block;width:100%;height:auto;image-rendering:auto;user-select:none;pointer-events:none;-webkit-user-drag:none;'
        chartEl.replaceWith(img)
        observer.disconnect()
      }
    })
    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true })
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef}>
      <SnapshotView snapshotPath="/snapshots/inlet.htm" />
    </div>
  )
}
