"use client"

import { useAuth } from "@/hooks/use-auth";
import { Linkedin, History, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  // Usage
  const DAILY_LIMIT = 10;
  const [usage, setUsage] = useState(null);
  const [usageLoading, setUsageLoading] = useState(false);

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

  const used = usage?.used ?? 0;
  const remaining = usage?.remaining ?? DAILY_LIMIT;
  const pct = Math.min(100, Math.round((used / DAILY_LIMIT) * 100));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8 lg:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Welcome back, {profile?.name?.split(' ')[0]}!
        </h1>
        <p className="text-slate-400">Choose what you&apos;d like to analyze today.</p>
      </div>

      {/* Usage meter */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-slate-300 font-medium">Daily quota</p>
            <p className="text-slate-400 text-sm">
              {usageLoading ? "Checking..." : `${used}/${DAILY_LIMIT} used — ${remaining} left (resets daily, Asia/Jakarta)`}
            </p>
          </div>
        </div>
        <div className="h-2 mt-3 rounded bg-slate-700 overflow-hidden">
          <div className="h-2 bg-cyan-500 transition-all" style={{ width: `${pct}%` }} />
        </div>
        {usage && (
          <div className="mt-3 text-xs text-slate-400">
            Breakdown: Profile {usage.breakdown.profile} • Post {usage.breakdown.post}
          </div>
        )}
      </div>

      {/* Profile Info Card */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-6 mb-6 lg:mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Your LinkedIn Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-slate-400 text-sm">Email</p>
            <p className="text-white truncate">{profile?.email}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Name</p>
            <p className="text-white truncate">{profile?.name}</p>
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
        {/* {profile?.linkedinData && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="text-slate-400 text-sm mb-2">LinkedIn Data</p>
            <div className="overflow-x-auto">
              <pre className="text-xs text-slate-300 bg-slate-900 p-3 rounded whitespace-pre-wrap">
                {JSON.stringify(profile.linkedinData, null, 2)}
              </pre>
            </div>
          </div>
        )} */}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Analyze Profile Card */}
        <Link href="/profile-analyzer" className="group">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 lg:p-8 hover:border-cyan-500/50 transition h-full">
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
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 lg:p-8 hover:border-blue-500/50 transition h-full">
            <div className="w-12 h-12 bg-blue-500/20 border border-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Analyze Post</h3>
            <p className="text-slate-400 text-sm mb-4">Optimize your LinkedIn posts for maximum engagement.</p>
            <span className="text-cyan-400 font-medium text-sm group-hover:text-cyan-300">Analyze post →</span>
          </div>
        </Link>

        {/* View History Card */}
        <Link href="/history" className="group md:col-span-2 xl:col-span-1">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 lg:p-8 hover:border-purple-500/50 transition h-full">
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
  )
}