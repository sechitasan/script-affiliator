import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getServerSession() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    console.error('Error getting server session:', error)
    return null
  }
  
  return session
}

export async function requireAuth() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/')
  }
  
  return session
}

export async function getServerUser() {
  const session = await getServerSession()
  return session?.user || null
}
