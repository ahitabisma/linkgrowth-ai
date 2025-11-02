import { ArrowLeft, Linkedin, MessageSquare, Eye } from "lucide-react"
import Link from "next/link"

export default function History() {
  const analyses = [
    {
      id: 1,
      type: "profile",
      date: "2025-10-30",
      score: 82,
      title: "Fullstack Developer Profile",
    },
    {
      id: 2,
      type: "post",
      date: "2025-10-29",
      score: 8.5,
      title: "LinkedIn Post Analysis",
    },
    {
      id: 3,
      type: "profile",
      date: "2025-10-28",
      score: 76,
      title: "Updated Profile Analysis",
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-white mb-8">Your Analyses</h2>

      {/* Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {analyses.map((analysis) => (
                <tr key={analysis.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {analysis.type === "profile" ? (
                        <Linkedin className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <MessageSquare className="w-5 h-5 text-blue-400" />
                      )}
                      <span className="text-sm text-slate-300 capitalize">{analysis.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{analysis.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-400 text-sm">{analysis.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-white font-semibold">{analysis.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition text-sm font-medium">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State (if no analyses) */}
      <div className="hidden text-center py-16">
        <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Linkedin className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No analyses yet</h3>
        <p className="text-slate-400 mb-6">Start by analyzing your profile or posts.</p>
        <Link
          href="/dashboard"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
