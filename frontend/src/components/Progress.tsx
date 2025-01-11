import { useScheduleContext } from 'context/ScheduleContext'
import React from 'react'

const FittingProgress: React.FC = () => {
  const { schedule } = useScheduleContext()
  const name =
    schedule.fittingType == 'club fitting' ? 'Fitting' : 'Swing Appointment'
  const steps = [
    `${name} Request Submitted`,
    `${name} Scheduled`,
    `${name} Cancelled`,
    `${name} Completed`
  ]
  const currentStep = 1

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{name} Progress</h2>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`p-4 rounded-md shadow flex items-center justify-between ${
              index < currentStep
                ? 'bg-green-200 border-l-4 border-green-500' // Done
                : 'bg-yellow-200 border-l-4 border-yellow-500' // Current Step
            }`}
          >
            <span
              className={`text-lg font-medium ${
                index < currentStep ? 'text-green-800' : 'text-gray-800'
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FittingProgress
