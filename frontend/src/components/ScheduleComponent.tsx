import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ScheduleForm } from '.'

const ScheduleComponent = () => {
  const { '*': temp } = useParams()
  const route = temp ? temp : ''
  const message =
    route == 'schedule-fitting'
      ? 'Schedule a Fitting Appoinment'
      : 'Schedule a Swing Analysis'
  const type = route == 'schedule-fitting' ? 'club fitting' : 'swing analysis'

  if (route) {
    return (
      <section className="p-8">
        <h1 className="text-2xl font-bold mb-6">{message}</h1>
        <ScheduleForm type={type} />
      </section>
    )
  }
  return null
}

export default ScheduleComponent
