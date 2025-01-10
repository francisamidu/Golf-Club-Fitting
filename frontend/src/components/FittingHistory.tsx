import { Status, useFittingContext } from 'context/FittingsContext'
import React from 'react'
import { formatDate } from 'utils/formatDate'

const FittingHistory = () => {
  const { fittingHistory: history } = useFittingContext()
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Fitting History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 border rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Customer Name</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="py-2 px-4">{formatDate(item.date)}</td>
                <td className="py-2 px-4">{item.customerName}</td>
                <td
                  className={`py-2 px-4 ${
                    item.status === Status.Completed
                      ? 'text-green-600'
                      : item.status === Status.Scheduled
                        ? 'text-blue-600'
                        : item.status === Status.Submitted
                          ? 'text-yellow-600'
                          : 'text-red-600'
                  }`}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FittingHistory
