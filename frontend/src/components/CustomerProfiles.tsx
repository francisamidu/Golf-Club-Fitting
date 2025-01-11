import React, { useEffect, useState } from 'react'
import { useFittingContext } from 'context/FittingsContext'
import { getCustomers, updateProfile } from '../api/consumer'
import { handleError } from 'utils/handleError'
import { toast } from 'react-toastify'

interface Customer {
  _id: string
  name: string
  address: string
  email: string
  phone: string
  golfClubSize: string
}

const CustomerProfiles: React.FC = () => {
  const [editingCustomer, setEditingCustomer] = useState<string | null>(null)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [formData, setFormData] = useState<Customer | null>(null)
  const token = localStorage.getItem('token') || ''

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer._id)
    setFormData(customer)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  }

  const getConsumers = async () => {
    try {
      const token = localStorage.getItem('token') || ''

      const customers = await getCustomers(token)
      setCustomers(customers)
    } catch (error) {
      const handledError = handleError(error)
      toast.error(handledError.message)
    }
  }

  const handleSave = async () => {
    if (formData) {
      const response: Customer = await updateProfile(token, {
        ...formData,
        id: formData._id
      })
      const currentCustomers = customers.map((customer) => {
        if (customer._id === response._id) {
          return response
        }
        return customer
      })
      setCustomers(currentCustomers)

      setEditingCustomer(null)
    }
  }

  const handleCancel = () => {
    setEditingCustomer(null)
    setFormData(null)
  }

  useEffect(() => {
    getConsumers()
  }, [])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Customer Profiles</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Golf Club Size
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id} className="hover:bg-gray-50">
                {editingCustomer === customer._id ? (
                  <>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <input
                        type="text"
                        name="name"
                        value={formData?.name || ''}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <input
                        type="text"
                        name="address"
                        value={formData?.address || ''}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <input
                        type="email"
                        name="email"
                        value={formData?.email || ''}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <input
                        type="text"
                        name="phone"
                        value={formData?.phone || ''}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <select
                        name="golfClubSize"
                        value={formData?.golfClubSize || ''}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border rounded"
                      >
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                      </select>
                    </td>
                    <td className="px-6 pl-5 py-4 border-b border-gray-200 flex flex-col justify-center">
                      <button
                        onClick={handleSave}
                        className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-[65px] mb-1"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-sm bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 w-[65px]"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {customer.address}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {customer.phone}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {customer.golfClubSize}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <button
                        onClick={() => handleEdit(customer)}
                        className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-[64px]"
                      >
                        Edit
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CustomerProfiles
