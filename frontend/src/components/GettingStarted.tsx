import { gettingStarted } from 'api/consumer'
import React, { useEffect, useState } from 'react'

const GettingStarted: React.FC = () => {
  const [welcomeMessage, setWelcomeMessage] = useState('')
  const getMessage = async () => {
    try {
      const token = localStorage.getItem('token') || ''
      const response = await gettingStarted(token)
      setWelcomeMessage(response.message)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getMessage()
  }, [])
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 min-h-screen min-w-screen h-full w-full p-6">
        {/* Dashboard Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Getting Started
          </h1>
          <p className="text-gray-600 mt-2">{welcomeMessage}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 text-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105">
            <h2 className="text-xl font-bold mb-3 text-gray-900">
              Submit a Fitting/Swing Analysis
            </h2>
            <p className="text-base text-gray-700">
              Begin by submitting your fitting or swing analysis. Our experts
              will assess your swing and fit the perfect clubs for you.
            </p>
          </div>
          <div className="bg-white border border-gray-200 text-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105">
            <h2 className="text-xl font-bold mb-3 text-gray-900">
              Schedule a Fitting Appointment
            </h2>
            <p className="text-base text-gray-700">
              Once your analysis is ready, schedule an appointment with our
              fitting specialists. Choose a time that works for you!
            </p>
          </div>
          <div className="bg-white border border-gray-200 text-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105">
            <h2 className="text-xl font-bold mb-3 text-gray-900">
              Receive Your Custom Fitted Clubs
            </h2>
            <p className="text-base text-gray-700">
              After the fitting, we{`’`}ll provide you with your custom clubs
              tailored to your swing, ensuring optimal performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GettingStarted
