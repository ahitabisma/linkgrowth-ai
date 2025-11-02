/* eslint-disable react/no-unescaped-entities */
"use client"

import { Linkedin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { signInWithLinkedIn } = useAuth()

  const handleLinkedInLogin = async () => {
    setIsLoading(true)
    try {
      await signInWithLinkedIn()
    } catch (error) {
      console.error("Login failed:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-blue-900 to-slate-900 flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-slate-900" />
            </div>
            <span className="font-bold text-white">LinkedIn Growth AI</span>
          </Link>
          <Link href="/" className="text-slate-300 hover:text-white transition">
            Back to home
          </Link>
        </div>
      </nav>

      {/* Login Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 backdrop-blur-sm">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Linkedin className="w-8 h-8 text-cyan-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
              <p className="text-slate-400">Sign in with your LinkedIn account to get started</p>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLinkedInLogin}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 mb-4"
            >
              <Linkedin className="w-5 h-5" />
              {isLoading ? "Connecting..." : "Sign in with LinkedIn"}
            </button>

            {/* Footer */}
            <p className="text-center text-slate-400 text-sm">
              Don't have an account? <button className="text-cyan-400 hover:text-cyan-300 font-medium">Sign up</button>
            </p>
          </div>

          {/* Security Info */}
          <div className="mt-8 bg-slate-800/30 border border-slate-700 rounded-lg p-4">
            <p className="text-slate-400 text-sm text-center">
              We only access your public LinkedIn profile information. Your data is secure and never shared.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-slate-500 text-sm">
          <p>© 2025 LinkedIn Growth AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}