import React from 'react'
import { Status, useFittingContext } from 'context/FittingsContext'
import { useParams } from 'react-router-dom'
import { handleError } from 'utils/handleError'
import { toast } from 'react-toastify'
import { updateAppointment } from 'api/admin'

const FittingTasks = () => {
  const { fittings, fittingRequests } = useFittingContext()
  const params = useParams()
  const id = params['id']
  const task = fittingRequests.find((request) => request._id == id)

  const handleTaskAction = async (action: Status) => {
    const _task = {
      _id: id,
      fittingId: task?.fittingId,
      status: action
    }
    try {
      const token = localStorage.getItem('token') || ''
      await updateAppointment(token, _task)
      toast.success('The appointment status has been updated')
    } catch (error) {
      const handledError = handleError(error)
      toast.error(handledError.message)
    }
  }

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Fitting Tasks</h2>
      <div className="space-y-4">
        {task ? (
          <>
            <div
              key={task._id}
              className={`p-4 rounded border flex items-center justify-between ${
                task.status === Status.Completed
                  ? 'bg-green-100 border-green-500'
                  : task.status === Status.Canceled
                    ? 'bg-red-100 border-red-500'
                    : 'bg-gray-100 border-gray-300'
              }`}
            >
              <div>
                <p className="font-semibold capitalize">
                  Appointment {task.status}
                </p>
                <p className="text-sm text-gray-600">
                  Customer: {task.customerName}
                </p>
                <p className="text-sm text-gray-600 capitalize">
                  Status: {task.status}
                </p>
              </div>

              <div className="flex space-x-2">
                {task.status === Status.Submitted && (
                  <button
                    onClick={() => handleTaskAction(Status.Scheduled)}
                    className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    Acknowledge
                  </button>
                )}
                {task.status !== Status.Canceled &&
                  task.status !== Status.Completed && (
                    <button
                      onClick={() => handleTaskAction(Status.Canceled)}
                      className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  )}
                {task.status === Status.Scheduled && (
                  <button
                    onClick={() => handleTaskAction(Status.Completed)}
                    className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default FittingTasks
