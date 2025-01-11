import { getFittings } from 'api/consumer'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { handleError } from 'utils/handleError'

const AccountHistory: React.FC = () => {
  const [fittings, setFittings] = useState([
    { date: '2025-01-01', status: 'Completed' },
    { date: '2025-01-05', status: 'Scheduled' },
    { date: '2025-01-10', status: 'Canceled' }
  ])

  const getUserFittings = async () => {
    try {
      const token = localStorage.getItem('token') || ''
      const _user = JSON.parse(localStorage.getItem('user') || '')
      const fittings = await getFittings(token, _user.name)
      setFittings(
        fittings
          .map((fit: any) => ({
            date: new Date(fit.date).toISOString().split('T')[0],
            status: fit.status
          }))
          .sort((a: any, b: any) => a - b)
      )
    } catch (error) {
      const handledError = handleError(error)
      toast.error(handledError.message)
    }
  }

  useEffect(() => {
    getUserFittings()
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Account History</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {fittings.map((fitting, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border p-2">{fitting.date}</td>
              <td
                className={`border p-2 ${
                  fitting.status === 'Canceled'
                    ? 'text-red-600'
                    : 'text-green-600'
                }`}
              >
                {fitting.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AccountHistory
