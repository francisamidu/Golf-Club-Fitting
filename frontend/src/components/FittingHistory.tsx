import { Status, useFittingContext } from 'context/FittingsContext'
import React from 'react'
import { formatDate } from 'utils/formatDate'

const FittingHistory = () => {
  const { fittingHistory: history } = useFittingContext()
  return (
    <div className="p-5 bg-gray-50 shadow-lg rounded-md">
      <h2 className="text-lg font-semibold mb-5 text-gray-700">
        Fitting History
      </h2>
      <div className="overflow-hidden border border-gray-300 rounded-md">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {history.map((item) => (
              <tr
                key={item._id}
                className="cursor-pointer hover:bg-gray-100 transition"
              >
                <td className="py-3 px-4 text-sm text-gray-700">
                  {formatDate(item.date)}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {item.customerName}
                </td>
                <td
                  className={`py-3 px-4 text-sm font-semibold ${
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
