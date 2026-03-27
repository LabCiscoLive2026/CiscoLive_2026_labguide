import Header from './Header'
import Sidebar from './Sidebar'
import MainContent from './MainContent'

export default function AppLayout() {
  return (
    <div className="flex flex-col h-full w-full min-w-[768px]">
      <Header />
      <div className="w-full flex flex-1 min-h-0">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  )
}
