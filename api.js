import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const healthCheck = async () => {
  const response = await api.get('/health')
  return response.data
}

export const predictDelay = async (flightData) => {
  const response = await api.post('/predict', flightData)
  return response.data
}

export const getAnalytics = async () => {
  const response = await api.get('/analytics')
  return response.data
}

export default api
