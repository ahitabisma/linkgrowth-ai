"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function AuthCallbackPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session after OAuth callback
        const { data: { session }, error } = await supabase.auth.getSession()
        
        console.log('Callback - Session:', session)
        console.log('Callback - Error:', error)
        
        if (error) {
          console.error('Auth callback error:', error)
          router.push("/login")
          return
        }

        if (session) {
          console.log('Session found, redirecting to dashboard')
          router.push("/dashboard")
        } else {
          console.log('No session, redirecting to login')
          router.push("/login")
        }
      } catch (error) {
        console.error('Callback error:', error)
        router.push("/login")
      }
    }

    handleAuthCallback()
  }, [router, supabase.auth])

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4" />
        <p className="text-white">Connecting to LinkedIn...</p>
        <p className="text-slate-400 text-sm mt-2">Please wait while we process your authentication</p>
      </div>
    </div>
  )
}