import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'

const DashboardRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<Dashboard />} />
    </Routes>
  )
}

export default DashboardRoutes
