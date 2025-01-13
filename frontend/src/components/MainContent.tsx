import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  AccountHistory,
  FittingHistory,
  FittingRequests,
  FittingSchedule,
  FittingTasks,
  GettingStarted,
  Home,
  MyProfile,
  ScheduleComponent
} from '.'
import FittingProgress from './Progress'
import CustomerProfiles from './CustomerProfiles'
import { FittingProvider } from 'context/FittingsContext'

const MainContent: React.FC = () => {
  return (
    <main className="w-full py-6">
      <FittingProvider>
        <Routes>
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/schedule/*" element={<ScheduleComponent />} />
          <Route path="/fitting-progress" element={<FittingProgress />} />
          <Route path="/account-history" element={<AccountHistory />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/fitting-requests/" element={<FittingRequests />} />
          <Route path="/fitting-tasks/:id" element={<FittingTasks />} />
          <Route path="/fitting-schedule" element={<FittingSchedule />} />
          <Route path="/fitting-history" element={<FittingHistory />} />
          <Route path="/customer-profiles" element={<CustomerProfiles />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </FittingProvider>
    </main>
  )
}

export default MainContent
