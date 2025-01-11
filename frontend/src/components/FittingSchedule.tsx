import React from 'react'
import { Status, useFittingContext } from 'context/FittingsContext'
import { formatDate } from 'utils/formatDate'
import { formatTime } from 'utils/formatTime'

const FittingSchedule = () => {
  const { fittingSchedule: schedule } = useFittingContext()
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Fitting Schedule</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedule.map((item) => {
          const statusStyles = {
            [Status.Completed]: 'border-blue-500',
            [Status.Submitted]: 'border-gray-400',
            [Status.Canceled]: 'border-red-500',
            [Status.Scheduled]: 'border-red-500'
          }

          return (
            <div
              key={item._id}
              className={`flex flex-col justify-between p-4 bg-gray-50 rounded shadow border-l-4 ${
                statusStyles[item.status]
              }`}
            >
              <div>
                <p className="text-lg font-medium text-gray-700">
                  {formatDate(item.date)}
                </p>
                <p className="text-sm text-gray-500">{formatTime(item.time)}</p>
              </div>
              <div className="mt-2">
                <p className="text-base font-semibold text-gray-800">
                  {item.customerName}
                </p>
                <p className="text-sm text-gray-600">
                  Status:{' '}
                  <span
                    className={`${
                      item.status === Status.Completed
                        ? 'text-blue-500'
                        : item.status === Status.Submitted
                          ? 'text-gray-500'
                          : 'text-red-500'
                    }`}
                  >
                    {item.status}
                  </span>
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FittingSchedule
