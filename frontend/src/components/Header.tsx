import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 text-center fixed top-0 left-0 w-full mb-4">
      <div className="text-lg font-bold">
        <p className="inline-block">
          Get <span className="text-yellow-400">20% off</span> on all Golf
          Clubs! Limited time offer.
        </p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ml-2">
          Get It!
        </button>
      </div>
    </header>
  )
}

export default Header
