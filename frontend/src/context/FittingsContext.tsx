import {
  getFittingHistory,
  getFittingRequests,
  getFittingSchedule,
  getFittings
} from 'api/admin'
import React, {
  Dispatch,
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction
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
  Submitted = 'Submitted',
  Scheduled = 'Scheduled',
  Completed = 'Completed',
  Canceled = 'Canceled'
}
type Fitting = {
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
  time: string
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
  fittings: Fitting[]
  fittingRequests: FittingRequest[]
  fittingSchedule: FittingSchedule[]
  fittingHistory: FittingHistory[]
  setFittings: Dispatch<SetStateAction<Fitting[]>>
  setFittingHistory: Dispatch<SetStateAction<FittingHistory[]>>
  setFittingRequests: Dispatch<SetStateAction<FittingRequest[]>>
  setFittingSchedule: Dispatch<SetStateAction<FittingSchedule[]>>
}

// Default context data
const defaultState: FittingContextState = {
  fittings: [],
  fittingRequests: [],
  fittingSchedule: [],
  fittingHistory: [],
  setFittings: () => {},
  setFittingHistory: () => {},
  setFittingRequests: () => {},
  setFittingSchedule: () => {}
  // refreshData: () => {}
}

// Create the context
const FittingContext = createContext<FittingContextState>(defaultState)

// Provider component
export const FittingProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [fittings, setFittings] = useState<Fitting[]>([])
  const [fittingRequests, setFittingRequests] = useState<FittingRequest[]>([])
  const [fittingSchedule, setFittingSchedule] = useState<FittingSchedule[]>([])
  const [fittingHistory, setFittingHistory] = useState<FittingHistory[]>([])
  const token = localStorage.getItem('token') || ''
  const fetchFittings = async () => {
    const fittings = await getFittings(token)
    setFittings(fittings)
  }
  const fetchFittingRequests = async () => {
    const requests = await getFittingRequests(token)
    setFittingRequests(requests)
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
    fetchFittings()
    fetchFittingRequests()
    fetchFittingSchedule()
    fetchFittingHistory()
  }

  // Initial data fetch
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '')
    if (user.role === 'admin') {
      refreshData()
    }
  }, [])

  return (
    <FittingContext.Provider
      value={{
        fittings,
        fittingRequests,
        fittingSchedule,
        fittingHistory,
        setFittings,
        setFittingHistory,
        setFittingRequests,
        setFittingSchedule
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
