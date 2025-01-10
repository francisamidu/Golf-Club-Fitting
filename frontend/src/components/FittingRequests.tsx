import { useFittingContext } from 'context/FittingsContext'
import React from 'react'
import { formatDate } from 'utils/formatDate'
import { useNavigate } from 'react-router-dom'

const FittingRequests = () => {
  const { fittingRequests } = useFittingContext()
  const navigate = useNavigate()

  const handleRowClick = (id: string) => {
    navigate(`/dashboard/fitting-tasks/${id}`)
  }

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Fitting Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 border rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Customer Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {fittingRequests.map((request) => (
              <tr
                key={request._id}
                className="border-t cursor-pointer hover:bg-gray-200 transition"
                onClick={() => handleRowClick(request._id)} // Make the row clickable
              >
                <td className="py-2 px-4">{formatDate(request.date)}</td>
                <td className="py-2 px-4">{request.customerName}</td>
                <td className="py-2 px-4">{request.email}</td>
                <td className="py-2 px-4">{request.phone}</td>
                <td className="py-2 px-4">{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FittingRequests
