import React, { useEffect } from 'react'
import { ProtectedRoute } from 'components'
import Login from 'pages/login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Dashboard from 'pages/Dashboard'

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Login Route */}
          <Route path="/" element={<Login />} />

          {/* Protected Dashboard Route */}
          <Route
            path="/dashboard/*"
            element={<ProtectedRoute component={Dashboard} />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
