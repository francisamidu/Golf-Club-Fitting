import axios from 'axios'
import { API_URL } from './auth'
export const gettingStarted = async (token: string) => {
  try {
    const response = await axios(`${API_URL}/consumer/getting-started`, {
      headers: {
        Authorization: `
            Bearer ${token}`
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
export const getFittings = async (token: string, username: string) => {
  try {
    const response = await axios(`${API_URL}/consumer/fittings/${username}`, {
      headers: {
        Authorization: `
            Bearer ${token}`
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
export const scheduleAppointment = async (token: string, user: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/consumer/schedule`,
      { ...user },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data
  } catch (error) {
    throw new Error('Something went wrong. Please try again')
  }
}
export const getCustomers = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/consumer/get-consumers`, {
      headers: {
        authorization: `
            Bearer ${token}`
      }
    })
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Something went wrong. Please try again'
    )
  }
}
export const updateProfile = async (token: string, user: any) => {
  try {
    const response = await axios(`${API_URL}/consumer/profile/${user.id}`, {
      data: { ...user },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
    return response.data
  } catch (error) {
    throw new Error('Something went wrong. Please try again')
  }
}
