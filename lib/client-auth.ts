// Utility functions untuk client-side auth tanpa Supabase client

export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/session')
    if (response.ok) {
      const data = await response.json()
      return !!data.session
    }
    return false
  } catch (error) {
    console.error('Error checking auth status:', error)
    return false
  }
}

export const refreshAuthSession = async () => {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data.session
    }
    return null
  } catch (error) {
    console.error('Error refreshing auth session:', error)
    return null
  }
}

export const logoutUser = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.ok
  } catch (error) {
    console.error('Error logging out:', error)
    return false
  }
}
