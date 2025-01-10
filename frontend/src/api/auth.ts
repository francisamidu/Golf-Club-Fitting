// api/auth.ts
import axios from 'axios'

export const API_URL = 'http://localhost:5000'

// Login API
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Server is unreachable')
  }
}
