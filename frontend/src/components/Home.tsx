import React, { useEffect, useState } from 'react'

const Home = () => {
  const [message, setMessage] = useState(
    `Welcome to your dashboard. Schedule your fittings and swing analysis here.`
  )
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '')
    if (user?.role == 'admin') {
      setMessage(
        `Welcome to your dashboard. Manage all fitting requests and customer profiles here.`
      )
    }
  }, [])
  return (
    <div className="bg-gray-50 min-h-screen min-w-screen h-full w-full p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Golf Club Fitting Dashboard
        </h1>
        <p className="text-gray-600">{message}</p>
      </header>
    </div>
  )
}
export default Home
