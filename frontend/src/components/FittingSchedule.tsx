import React from 'react'
import { Status, useFittingContext } from 'context/FittingsContext'
import { formatDate } from 'utils/formatDate'

const FittingSchedule = () => {
  const { fittingSchedule: schedule } = useFittingContext()
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Fitting Schedule</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {schedule.map((item) => (
          <div
            key={item._id}
            className={`p-4 border rounded ${
              item.status == Status.Completed
                ? 'bg-green-100 border-green-500'
                : item.status == Status.Submitted
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-yellow-100 border-yellow-500'
            }`}
          >
            <p className="font-bold">{formatDate(item.date)}</p>
            <p>{item.customerName}</p>
            <p>Status: {item.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FittingSchedule
