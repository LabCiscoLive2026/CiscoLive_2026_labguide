import { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import '../../styles/pdu-legacy.css'
import '../../styles/snapshot-overrides.css'

export default function SnapshotView({ snapshotPath }) {
  const { theme } = useTheme()
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadSnapshot() {
      setError('')
      setContent('')
      try {
        const response = await fetch(snapshotPath, { cache: 'no-store' })
        if (!response.ok) {
          throw new Error(`Could not load ${snapshotPath}`)
        }
        const html = await response.text()
        const doc = new DOMParser().parseFromString(html, 'text/html')
        const pageContent = doc.querySelector('#page-content')
        if (!pageContent) {
          throw new Error(`Missing #page-content in ${snapshotPath}`)
        }
        if (!cancelled) {
          setContent(pageContent.outerHTML)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load snapshot')
        }
      }
    }

    loadSnapshot()
    return () => {
      cancelled = true
    }
  }, [snapshotPath])

  if (error) {
    return <div className="p-4 text-sm text-red-600">{error}</div>
  }

  if (!content) {
    return <div className="p-4 text-sm text-gray-500">Loading view...</div>
  }

  return (
    <div className={`snapshot-shell h-full w-full overflow-auto ${theme === 'dark' ? 'dark' : ''}`}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
