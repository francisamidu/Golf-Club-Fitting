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
          <p className="text-gray-600">{welcomeMessage}</p>
        </header>

        {/* Workflow Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Submit a Fitting/Swing Analysis */}
          <div className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105">
            <h2 className="text-2xl font-bold mb-3">
              Submit a Fitting/Swing Analysis
            </h2>
            <p className="text-lg">
              Begin by submitting your fitting or swing analysis. Our experts
              will assess your swing and fit the perfect clubs for you.
            </p>
          </div>

          {/* Card 2: Schedule a Fitting Appointment */}
          <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105">
            <h2 className="text-2xl font-bold mb-3">
              Schedule a Fitting Appointment
            </h2>
            <p className="text-lg">
              Once your analysis is ready, schedule an appointment with our
              fitting specialists. Choose a time that works for you!
            </p>
          </div>

          {/* Card 3: Receive Your Custom Fitted Clubs */}
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105">
            <h2 className="text-2xl font-bold mb-3">
              Receive Your Custom Fitted Clubs
            </h2>
            <p className="text-lg">
              After the fitting, we’ll provide you with your custom clubs
              tailored to your swing, ensuring optimal performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GettingStarted
