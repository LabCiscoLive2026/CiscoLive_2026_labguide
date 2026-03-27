import { Outlet } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

export default function MainContent() {
  const { theme } = useTheme()

  return (
    <main
    // f3f4f6
      className={`flex-1 min-w-0 overflow-auto ${theme === 'dark' ? 'bg-[#0a1015]' : 'bg-[#f3f4f6]'}`}
      data-theme={theme}
    >
      <Outlet />
    </main>
  )
}
