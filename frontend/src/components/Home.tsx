import React from 'react'

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen min-w-screen h-full w-full p-6">
      {/* Dashboard Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Golf Club Fitting Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome to your dashboard. Manage all fitting requests and customer
          profiles here.
        </p>
      </header>
    </div>
  )
}
export default Home
