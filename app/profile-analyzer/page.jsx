import { Linkedin, Copy, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProfileAnalyzer() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="text-slate-400 hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-slate-900" />
            </div>
            <span className="font-bold text-white">Profile Analyzer</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Analyze Your Profile</h2>

              <div className="space-y-6">
                {/* Headline Input */}
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">LinkedIn Headline</label>
                  <input
                    type="text"
                    placeholder="e.g., Fullstack Developer | Laravel + Next.js"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                {/* About/Summary Textarea */}
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">About / Summary</label>
                  <textarea
                    placeholder="Paste your LinkedIn about section..."
                    rows={4}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
                  />
                </div>

                {/* Skills Input */}
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">Skills (comma separated)</label>
                  <input
                    type="text"
                    placeholder="React, Next.js, TypeScript, Node.js..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                {/* Target Role Input */}
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-2">Target Role</label>
                  <input
                    type="text"
                    placeholder="e.g., Senior Full Stack Engineer"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                {/* Analyze Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
                  Analyze with AI
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 h-fit sticky top-24">
            <h3 className="text-lg font-semibold text-white mb-6">AI Result</h3>

            <div className="space-y-6">
              {/* Empty State */}
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Linkedin className="w-8 h-8 text-slate-500" />
                </div>
                <p className="text-slate-400">No analysis yet. Run analysis to see suggestions.</p>
              </div>

              {/* Score Badge (Hidden by default) */}
              <div className="hidden space-y-6">
                <div className="bg-linear-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-green-400">82</div>
                  <div className="text-sm text-slate-300 mt-2">Personal Brand Score</div>
                </div>

                {/* Suggested Headline */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Suggested Headline</label>
                  <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                    <p className="text-white font-medium mb-3">
                      Fullstack Developer | Laravel + Next.js | Building AI SaaS
                    </p>
                    <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                </div>

                {/* Suggested Summary */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Suggested Summary</label>
                  <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                    <p className="text-slate-300 text-sm leading-relaxed mb-3">
                      I help teams ship modern web products using Laravel, Next.js, and AI-assisted workflows.
                      Passionate about developer experience and scalable UI.
                    </p>
                    <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Missing Keywords</label>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-orange-500/20 border border-orange-500/50 text-orange-300 text-xs font-medium px-3 py-1 rounded-full">
                      TypeScript
                    </span>
                    <span className="bg-orange-500/20 border border-orange-500/50 text-orange-300 text-xs font-medium px-3 py-1 rounded-full">
                      REST API
                    </span>
                    <span className="bg-orange-500/20 border border-orange-500/50 text-orange-300 text-xs font-medium px-3 py-1 rounded-full">
                      PostgreSQL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
