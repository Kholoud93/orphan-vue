import axios from 'axios'

export const certificateApi = axios.create({
  baseURL: 'https://influencerwaqf.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
