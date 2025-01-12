import axios from 'axios'
import { API_URL } from './auth'
export const gettingStarted = async (token: string) => {
  try {
    const response = await axios(`${API_URL}/admin/getting-started`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'GET'
    })
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Something went wrong. Please try again'
    )
  }
}
export const getFittings = async (token: string) => {
  try {
    const response = await axios(`${API_URL}/admin/fittings`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'GET'
    })
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Something went wrong. Please try again'
    )
  }
}
export const getFittingRequests = async (token: string) => {
  try {
    const response = await axios(`${API_URL}/admin/fitting-requests`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'GET'
    })
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Something went wrong. Please try again'
    )
  }
}
export const getFittingHistory = async (token: string) => {
  try {
    const response = await axios(`${API_URL}/admin/fitting-history`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'GET'
    })
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Something went wrong. Please try again'
    )
  }
}
export const getFittingSchedule = async (token: string) => {
  try {
    const response = await axios(`${API_URL}/admin/fitting-schedule`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'GET'
    })
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Something went wrong. Please try again'
    )
  }
}
export const updateAppointment = async (token: string, fitting: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/admin/fittings`,
      {
        _id: fitting._id,
        fittingId: fitting.fittingId,
        status: fitting.status
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error) {
    throw new Error('Something went wrong. Please try again')
  }
}
