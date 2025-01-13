import { useFittingContext } from 'context/FittingsContext'
import React from 'react'
import { formatDate } from 'utils/formatDate'
import { useNavigate } from 'react-router-dom'
import { useScheduleContext } from 'context/ScheduleContext'
import { NoContent } from 'components'

const FittingRequests = () => {
  const { fittingRequests } = useFittingContext()
  const navigate = useNavigate()

  const handleRowClick = (id: string) => {
    navigate(`/dashboard/fitting-tasks/${id}`)
  }

  return (
    <>
      {fittingRequests.length > 0 ? (
        <div className="p-5 bg-gray-50 shadow-lg rounded-md">
          <h2 className="text-lg font-semibold mb-5 text-gray-700">
            Fitting Requests
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
                    Email
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {fittingRequests.map((request, index) => (
                  <tr
                    key={request._id}
                    className={`cursor-pointer ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-gray-100 transition`}
                    onClick={() => handleRowClick(request._id)}
                  >
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {formatDate(request.date)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {request.customerName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {request.email}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {request.phone}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-800">
                      {request.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <NoContent />
      )}
    </>
  )
}

export default FittingRequests
