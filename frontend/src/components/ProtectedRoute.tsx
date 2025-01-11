import React from 'react'
import { useAuth } from 'context/AuthContext'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  component: React.ElementType
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component
}) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-24 h-24 border-4 rounded-full border-t-blue-500 border-gray-200"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return <Component />
}

export default ProtectedRoute
