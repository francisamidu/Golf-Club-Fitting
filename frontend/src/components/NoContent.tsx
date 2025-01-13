import React from 'react'

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-12 px-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          No Content Found
        </h2>
        <p className="text-gray-600 text-lg">
          Create a new swing analysis or Fitting to see more
        </p>
      </div>
    </div>
  )
}

export default EmptyState
