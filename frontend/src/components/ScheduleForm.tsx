import { scheduleAppointment } from 'api/consumer'
import React, { FormEvent, useState } from 'react'
import Calendar from 'react-calendar'
import { toast } from 'react-toastify'
import { handleError } from 'utils/handleError'
import { useScheduleContext } from '../context/ScheduleContext'
import { formatDate } from 'utils/formatDate'
import { toISO8601Timestamp } from 'utils/formatTime'

const ScheduleForm: React.FC<{ type: string }> = ({ type }) => {
  const { setSchedule } = useScheduleContext()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [comments, setComments] = useState('')
  const availableTimes = ['9:00 AM', '11:00 AM', '2:00 PM']

  const handleDateChange = (value: Date | [Date, Date]) => {
    if (Array.isArray(value)) {
      setSelectedDate(value[0])
    } else {
      setSelectedDate(value)
    }
  }

  const handleSave = async (e: FormEvent<Element>): Promise<void> => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) {
      toast.error('Please select a schedule, date, and time.')
      return
    }

    const token = localStorage.getItem('token') || ''
    const _user = JSON.parse(localStorage.getItem('user') || '')
    const user = {
      _id: _user.id,
      customerName: _user.name,
      email: _user.email,
      phone: _user.phone || '0000000000',
      fittingType: type,
      date: selectedDate,
      time: toISO8601Timestamp(selectedTime),
      comments
    }
    try {
      await scheduleAppointment(token, user)
      setSchedule(user)
      const formattedDate = formatDate(selectedDate.toDateString())
      const message = `Your appointment is scheduled for ${formattedDate} at ${selectedTime}.`

      toast.success(message)
      // Reset fields
      setSelectedDate(null)
      setSelectedTime('')
      setComments('')
    } catch (error) {
      const handledError = handleError(error)
      toast.error(handledError.message)
    }
  }
  return (
    <form>
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select a Date</label>
        <Calendar
          value={selectedDate}
          onChange={(event) => handleDateChange(new Date(String(event)))}
          minDate={new Date()}
          className="border rounded shadow-md"
          selectRange={false}
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select a Time</label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">-- Select a Time --</option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-medium">Additional Comments</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={4}
          className="w-full border rounded p-2"
          placeholder="Any additional details you'd like to share?"
        />
      </div>
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={handleSave}
      >
        Save Appoinment
      </button>
    </form>
  )
}

export default ScheduleForm
