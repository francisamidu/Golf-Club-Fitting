import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Schedule {
  id: string
  type: 'fitting' | 'swing-analysis'
  name: string
  details: string
}
interface ISchedule {
  customerName: string
  email: string
  phone: string
  fittingType: string
  date: Date | string
  time: Date | string
  comments: string
}

interface ScheduleContextProps {
  schedule: ISchedule
  schedules: Schedule[]
  setSchedule: React.Dispatch<React.SetStateAction<ISchedule>>
}

const ScheduleContext = createContext<ScheduleContextProps | undefined>(
  undefined
)

const ScheduleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [schedules] = useState<Schedule[]>([
    {
      id: '1',
      type: 'fitting',
      name: 'Golf Club Fitting',
      details: 'Detailed fitting session for your clubs.'
    },
    {
      id: '2',
      type: 'swing-analysis',
      name: 'Swing Analysis',
      details: 'Analyze and improve your golf swing.'
    }
  ])
  const [schedule, setSchedule] = useState<ISchedule>({
    comments: '',
    customerName: '',
    date: '',
    time: '',
    email: '',
    fittingType: '',
    phone: ''
  })

  return (
    <ScheduleContext.Provider value={{ schedules, schedule, setSchedule }}>
      {children}
    </ScheduleContext.Provider>
  )
}

export const useScheduleContext = () => {
  const context = useContext(ScheduleContext)
  if (!context) {
    throw new Error('useScheduleContext must be used within a ScheduleProvider')
  }
  return context
}

export default ScheduleProvider
