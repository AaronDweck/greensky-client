import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL

// Signup API Service
export const signup = async (formData) => {
  try {
    const res = await axios.post(BASE_URL + '/signup', formData)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export function login(formData) {
    return axios.post(BASE_URL + '/signin', formData)
}