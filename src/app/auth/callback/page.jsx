"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { setAuthToken } from "@/lib/auth"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (code) {
      // In production, exchange code for token with your backend
      // For now, we'll simulate the token exchange
      setAuthToken(`token_${code}`)
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4" />
        <p className="text-white">Connecting to LinkedIn...</p>
      </div>
    </div>
  )
}
