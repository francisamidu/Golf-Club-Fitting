import React, { createContext, useContext, useState, useEffect } from 'react'
import { login as loginAPI } from '../api/auth'
import { gettingStarted } from 'api/consumer'

interface AuthContextType {
  user: { id: string; name: string; email: string; role: string } | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode | null }> = ({
  children
}) => {
  const [user, setUser] = useState<AuthContextType['user']>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  const login = async (email: string, password: string) => {
    try {
      const { token, user } = await loginAPI(email, password)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setIsAuthenticated(true)
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUser(null)
  }

  const checkAuthentication = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '')
      const token = localStorage.getItem('token')
      if (user && token) {
        setUser(user)
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      setIsAuthenticated(false)
    } finally {
      console.log(isAuthenticated)
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuthentication()
  }, [])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
