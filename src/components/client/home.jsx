"use client"

import { Linkedin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"

export default function ClientHomePage({ showCTA = false }) {
    const router = useRouter()
    const { user, signInWithLinkedIn, loading } = useAuth()
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    const handleLinkedInLogin = async () => {
        if (loading || isAuthenticating) return

        setIsAuthenticating(true)
        try {
            await signInWithLinkedIn()
        } catch (error) {
            console.error("LinkedIn login failed:", error)
            setIsAuthenticating(false)
        }
    }

    const handleGetStarted = () => {
        if (user) {
            router.push("/dashboard")
        } else {
            handleLinkedInLogin()
        }
    }

    if (showCTA) {
        return (
            <button
                onClick={handleGetStarted}
                disabled={loading || isAuthenticating}
                className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/50 disabled:cursor-not-allowed text-slate-900 font-semibold px-8 py-3 rounded-lg transition flex items-center justify-center gap-2 mx-auto"
            >
                {loading || isAuthenticating ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900" />
                        Connecting...
                    </>
                ) : user ? (
                    "Go to Dashboard"
                ) : (
                    <>
                        <Linkedin className="w-5 h-5" />
                        Get Started with LinkedIn
                    </>
                )}
            </button>
        )
    }

    return (
        <div className="flex items-center gap-4">
            {user && (
                <Link href="/dashboard" className="text-slate-300 hover:text-white transition">
                    Dashboard
                </Link>
            )}
            <button
                onClick={handleGetStarted}
                disabled={loading || isAuthenticating}
                className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/50 disabled:cursor-not-allowed text-slate-900 font-semibold px-6 py-2 rounded-lg transition flex items-center gap-2"
            >
                {loading || isAuthenticating ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900" />
                        Connecting...
                    </>
                ) : user ? (
                    "Dashboard"
                ) : (
                    <>
                        <Linkedin className="w-4 h-4" />
                        Get Started
                    </>
                )}
            </button>
        </div>
    )
}