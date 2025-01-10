import {
  getFittingHistory,
  getFittingRequests,
  getFittingSchedule,
  getFittings
} from 'api/admin'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'

type FittingRequest = {
  _id: string
  fittingId: string
  date: string
  time: string
  customerName: string
  email: string
  phone: string
  receivedAt: string
  status: Status
}
export enum Status {
  Submitted = 'submitted',
  Prepped = 'prepped',
  Scheduled = 'scheduled',
  Completed = 'completed',
  Canceled = 'canceled'
}
type FittingTask = {
  _id: string
  customerName: string
  email: string
  phone: string
  fittingType: 'swing analysis' | 'club fitting'
  date: Date
  status: Status
  comments: string
}

type FittingSchedule = {
  _id: string
  date: string
  customerName: string
  status: Status
}

type FittingHistory = {
  _id: string
  customerName: string
  date: Date | string
  fittingId: string
  status: Status
  completedAt: string
}

type FittingContextState = {
  fittingRequests: FittingRequest[]
  fittingTasks: FittingTask[]
  fittingSchedule: FittingSchedule[]
  fittingHistory: FittingHistory[]
  // refreshData: () => void
}

// Default context data
const defaultState: FittingContextState = {
  fittingRequests: [],
  fittingTasks: [],
  fittingSchedule: [],
  fittingHistory: []
  // refreshData: () => {}
}

// Create the context
const FittingContext = createContext<FittingContextState>(defaultState)

// Provider component
export const FittingProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [fittingRequests, setFittingRequests] = useState<FittingRequest[]>([])
  const [fittingTasks, setFittingTasks] = useState<FittingTask[]>([])
  const [fittingSchedule, setFittingSchedule] = useState<FittingSchedule[]>([])
  const [fittingHistory, setFittingHistory] = useState<FittingHistory[]>([])
  const token = localStorage.getItem('token') || ''
  const fetchFittingRequests = async () => {
    const requests = await getFittingRequests(token)
    setFittingRequests(requests)
  }

  const fetchFittingTasks = async () => {
    const tasks = await getFittings(token)
    setFittingTasks(tasks)
  }

  const fetchFittingSchedule = async () => {
    const schedule = await getFittingSchedule(token)
    setFittingSchedule(schedule)
  }

  const fetchFittingHistory = async () => {
    const history = await getFittingHistory(token)
    setFittingHistory(history)
  }

  // Refresh all data
  const refreshData = () => {
    fetchFittingRequests()
    fetchFittingTasks()
    fetchFittingSchedule()
    fetchFittingHistory()
  }

  // Initial data fetch
  useEffect(() => {
    refreshData()
  }, [])

  return (
    <FittingContext.Provider
      value={{
        fittingRequests,
        fittingTasks,
        fittingSchedule,
        fittingHistory
        // refreshData
      }}
    >
      {children}
    </FittingContext.Provider>
  )
}

// Custom hook for using the context
export const useFittingContext = () => {
  const context = useContext(FittingContext)
  if (!context) {
    throw new Error('useFittingContext must be used within a FittingProvider')
  }
  return context
}
