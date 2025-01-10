import { updateProfile } from 'api/consumer'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { handleError } from 'utils/handleError'

const MyProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    address: '123 Main St, Springfield',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    golfClubSize: 'Standard'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token') || ''
      const user = JSON.parse(localStorage.getItem('user') || '')
      await updateProfile(token, {
        ...user,
        ...profile
      })
      toast.success('Profile updated')
    } catch (error) {
      const handledError = handleError(error)
      toast.error(handledError.message)
    }
  }

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem('user') || '')
    setProfile({
      ...profile,
      name: _user.name,
      email: _user.email,
      phone: _user.phone
    })
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Profile</h2>
      {Object.keys(profile).map((key) => (
        <div key={key}>
          <label className="block text-gray-600 capitalize">{key}</label>
          <input
            type="text"
            name={key}
            className="border p-2 rounded w-full"
            value={(profile as any)[key]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  )
}

export default MyProfile
