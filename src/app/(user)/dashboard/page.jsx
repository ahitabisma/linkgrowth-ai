"use client"

import { Linkedin, Settings, History, BarChart3, MessageSquare, LogOut, User } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useClickOutside } from "@/hooks/use-click-outside"
import { useAuth } from "@/hooks/use-auth"

export default function Dashboard() {
  const { user, signOut, loading } = useAuth()
  const [profile, setProfile] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()
  const dropdownRef = useClickOutside(() => setShowDropdown(false))

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile({
        email: user.email,
        name: user.user_metadata?.full_name || user.user_metadata?.name || 'User',
        avatar: user.user_metadata?.avatar_url || user.user_metadata?.picture,
        provider: user.app_metadata?.provider,
        linkedinData: user.user_metadata
      })
    }
  }, [user])

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4" />
          <p className="text-white">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-blue-900 to-slate-900">
      {/* Top Bar */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-slate-900" />
            </div>
            <span className="font-bold text-white">LinkedIn Growth AI</span>
          </div>
          
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition"
            >
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                {profile?.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-semibold text-sm">
                    {getInitials(profile?.name || 'User')}
                  </span>
                )}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-white font-medium text-sm">{profile?.name}</p>
                <p className="text-slate-400 text-xs">{profile?.email}</p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                      {profile?.avatar ? (
                        <Image
                          src={profile.avatar}
                          alt="Profile"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-semibold">
                          {getInitials(profile?.name || 'User')}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">{profile?.name}</p>
                      <p className="text-slate-400 text-sm">{profile?.email}</p>
                      <p className="text-cyan-400 text-xs capitalize">
                        Connected via {profile?.provider}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 transition">
                    <User className="w-4 h-4" />
                    Profile Settings
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-slate-700 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-800 bg-slate-900/50 min-h-screen p-6 hidden md:block">
          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800 text-white font-medium"
            >
              <BarChart3 className="w-5 h-5" />
              Home
            </Link>
            <Link
              href="/profile-analyzer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition"
            >
              <Linkedin className="w-5 h-5" />
              Profile Analyzer
            </Link>
            <Link
              href="/post-analyzer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition"
            >
              <MessageSquare className="w-5 h-5" />
              Post Analyzer
            </Link>
            <Link
              href="/history"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition"
            >
              <History className="w-5 h-5" />
              History
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition"
            >
              <Settings className="w-5 h-5" />
              Settings
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-5xl">
            {/* Welcome Section */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, {profile?.name?.split(' ')[0]}!
              </h1>
              <p className="text-slate-400">Choose what you&apos;d like to analyze today.</p>
            </div>

            {/* Profile Info Card */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Your LinkedIn Profile</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">Email</p>
                  <p className="text-white">{profile?.email}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Name</p>
                  <p className="text-white">{profile?.name}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Provider</p>
                  <p className="text-white capitalize">{profile?.provider}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">User ID</p>
                  <p className="text-white font-mono text-sm">{user?.id?.slice(0, 8)}...</p>
                </div>
              </div>
              
              {/* LinkedIn specific data */}
              {profile?.linkedinData && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <p className="text-slate-400 text-sm mb-2">LinkedIn Data</p>
                  <pre className="text-xs text-slate-300 bg-slate-900 p-3 rounded overflow-x-auto">
                    {JSON.stringify(profile.linkedinData, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Analyze Profile Card */}
              <Link href="/profile-analyzer" className="group">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-cyan-500/50 transition h-full">
                  <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition">
                    <Linkedin className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Analyze Profile</h3>
                  <p className="text-slate-400 text-sm mb-4">Get AI insights on your LinkedIn profile optimization.</p>
                  <span className="text-cyan-400 font-medium text-sm group-hover:text-cyan-300">Start analysis →</span>
                </div>
              </Link>

              {/* Analyze Post Card */}
              <Link href="/post-analyzer" className="group">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition h-full">
                  <div className="w-12 h-12 bg-blue-500/20 border border-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition">
                    <MessageSquare className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Analyze Post</h3>
                  <p className="text-slate-400 text-sm mb-4">Optimize your LinkedIn posts for maximum engagement.</p>
                  <span className="text-cyan-400 font-medium text-sm group-hover:text-cyan-300">Analyze post →</span>
                </div>
              </Link>

              {/* View History Card */}
              <Link href="/history" className="group">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-purple-500/50 transition h-full">
                  <div className="w-12 h-12 bg-purple-500/20 border border-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition">
                    <History className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">View History</h3>
                  <p className="text-slate-400 text-sm mb-4">Check your previous analyses and results.</p>
                  <span className="text-cyan-400 font-medium text-sm group-hover:text-cyan-300">View history →</span>
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}