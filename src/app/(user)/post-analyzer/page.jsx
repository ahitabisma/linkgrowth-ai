import { MessageSquare, ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"

export default function PostAnalyzer() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Analyze Your Post</h2>

            <div className="space-y-6">
              {/* Post Content Textarea */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Paste your LinkedIn post</label>
                <textarea
                  placeholder="Paste your LinkedIn post content here..."
                  rows={6}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
                />
              </div>

              {/* Niche/Audience Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Niche / Audience</label>
                <input
                  type="text"
                  placeholder="e.g., Web Developers, Startups, Tech Enthusiasts"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              {/* Analyze Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
                Analyze post
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 h-fit sticky top-24">
          <h3 className="text-lg font-semibold text-white mb-6">Analysis Results</h3>

          <div className="space-y-6">
            {/* Empty State */}
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-400">No analysis yet. Paste a post to get started.</p>
            </div>

            {/* Results (Hidden by default) */}
            <div className="hidden space-y-6">
              {/* Hook Score */}
              <div className="bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Hook Score</span>
                  <div className="text-3xl font-bold text-cyan-400">
                    8.5<span className="text-lg text-slate-400">/10</span>
                  </div>
                </div>
              </div>

              {/* Structure Feedback */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Structure Feedback</label>
                <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Great opening hook! Your post has strong engagement potential. Consider adding a call-to-action at
                    the end to boost comments.
                  </p>
                </div>
              </div>

              {/* Generated Versions */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-300">Alternative Versions</label>
                <div className="space-y-2">
                  <button className="w-full text-left bg-slate-700/50 border border-slate-600 hover:border-cyan-500/50 rounded-lg p-3 transition">
                    <div className="text-xs font-semibold text-cyan-400 mb-1">Story Version</div>
                    <p className="text-slate-300 text-sm line-clamp-2">Personal narrative approach...</p>
                  </button>
                  <button className="w-full text-left bg-slate-700/50 border border-slate-600 hover:border-cyan-500/50 rounded-lg p-3 transition">
                    <div className="text-xs font-semibold text-cyan-400 mb-1">Educational Version</div>
                    <p className="text-slate-300 text-sm line-clamp-2">Teaching-focused approach...</p>
                  </button>
                  <button className="w-full text-left bg-slate-700/50 border border-slate-600 hover:border-cyan-500/50 rounded-lg p-3 transition">
                    <div className="text-xs font-semibold text-cyan-400 mb-1">Authority Version</div>
                    <p className="text-slate-300 text-sm line-clamp-2">Thought leadership approach...</p>
                  </button>
                </div>
              </div>

              {/* Hashtags */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Suggested Hashtags</label>
                <div className="flex flex-wrap gap-2">
                  {["webdevelopment", "laravel", "nextjs", "ai", "buildinpublic"].map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-500/20 border border-blue-500/50 text-blue-300 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Best Time to Post */}
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-400">Best time to post</div>
                  <div className="text-white font-medium">Tuesday, 09:00 WIB</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
