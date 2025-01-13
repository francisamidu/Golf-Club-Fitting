import React from 'react'
import { Header, MainContent, Sidebar } from '../components'

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex ml-[20%] mt-[60px]">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  )
}

export default App
