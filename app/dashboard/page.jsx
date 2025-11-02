import { Linkedin, Settings, History, BarChart3, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
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
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:border-cyan-500 transition">
              <span className="text-white font-semibold">JD</span>
            </button>
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
              <h1 className="text-4xl font-bold text-white mb-2">Welcome back!</h1>
              <p className="text-slate-400">Choose what you d like to analyze today.</p>
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
