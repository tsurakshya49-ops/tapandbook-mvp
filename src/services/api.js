// Tap&Book API Service
// Connects React frontend to Python FastAPI backend

const API_BASE_URL = (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== 'leave completely empty') 
  ? import.meta.env.VITE_API_URL 
  : ''

// Safely parse JSON response, handling empty or non-JSON bodies
const parseResponse = async (response) => {
  const text = await response.text()
  if (!text) return {}
  try {
    return JSON.parse(text)
  } catch {
    return { detail: `Server error: ${response.status} ${response.statusText}` }
  }
}

// Save a new booking to Supabase
export const saveBooking = async (bookingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })

    if (!response.ok) {
      const errorData = await parseResponse(response)
      throw new Error(errorData.detail || 'Failed to save booking')
    }

    const result = await parseResponse(response)
    return result
  } catch (error) {
    console.error('Error saving booking:', error)
    throw error
  }
}

// Get all bookings from Supabase
export const getBookings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await parseResponse(response)
      throw new Error(errorData.detail || 'Failed to fetch bookings')
    }

    const result = await parseResponse(response)
    return result.data || []
  } catch (error) {
    console.error('Error fetching bookings:', error)
    throw error
  }
}

// Save a new user to Supabase
export const saveUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorData = await parseResponse(response)
      throw new Error(errorData.detail || 'Failed to save user')
    }

    const result = await parseResponse(response)
    return result
  } catch (error) {
    console.error('Error saving user:', error)
    throw error
  }
}

// Get user by phone number
export const getUserByPhone = async (phone) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${phone}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null // User not found
      }
      const errorData = await parseResponse(response)
      throw new Error(errorData.detail || 'Failed to fetch user')
    }

    const result = await parseResponse(response)
    return result.data || null
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}

// Login user with Supabase Auth
export const loginUser = async (phone, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, password }),
    })

    if (!response.ok) {
      const errorData = await parseResponse(response)
      throw new Error(errorData.detail || 'Invalid phone or password')
    }

    const result = await parseResponse(response)
    localStorage.setItem('access_token', result.access_token)
    const userName = result.user?.name || result.user?.email?.split('@')[0] || 'User'
    localStorage.setItem('userName', userName)
    return result
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

// Signup user with Supabase Auth
export const signupUser = async (phone, password, name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, password, name }),
    })

    if (!response.ok) {
      const errorData = await parseResponse(response)
      throw new Error(errorData.detail || 'Signup failed')
    }

    const result = await parseResponse(response)
    localStorage.setItem('access_token', result.access_token)
    localStorage.setItem('userName', name)
    return result
  } catch (error) {
    console.error('Error signing up:', error)
    throw error
  }
}
