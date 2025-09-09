import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// Define the PlanTier interface to match your database schema
export interface PlanTier {
  id: number
  name: string
  price_idr: number
  duration_in_days: number | null
  created_at: string
}

// Server-side Supabase client function
export const getServerSupabase = () => {
  return createServerComponentClient({ cookies })
}

// Fallback server client for non-auth operations (if needed)
export const getSupabaseAdmin = () => {
  const { createClient } = require('@supabase/supabase-js')
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
