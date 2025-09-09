"use client"

import { useState, useEffect } from "react"
import { Session } from "@supabase/supabase-js"

export default function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Ambil session dari server-side API
    const getSession = async () => {
      try {
        const response = await fetch('/api/auth/session')
        if (response.ok) {
          const data = await response.json()
          setSession(data.session)
        }
      } catch (error) {
        console.error('Error fetching session:', error)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Polling untuk update session (alternatif untuk real-time updates)
    const interval = setInterval(getSession, 30000) // Check setiap 30 detik

    return () => clearInterval(interval)
  }, [])

  // Function untuk refresh session manual
  const refreshSession = async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        const data = await response.json()
        setSession(data.session)
      }
    } catch (error) {
      console.error('Error refreshing session:', error)
    }
  }

  return { session, loading, refreshSession }
}
