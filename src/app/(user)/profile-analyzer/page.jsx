"use client";

import { Linkedin, Copy, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileAnalyzer() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Form states
  const [headline, setHeadline] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [targetRole, setTargetRole] = useState("");

  // Analysis states
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Protect the route
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4" />
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  const rubricPrompt = `
You are a LinkedIn Personal Branding Rater.

Your task is NOT to "be creative", but to RATE the profile based on a fixed rubric.
You MUST follow the scoring weights below and return the result in JSON ONLY.

========================
RUBRIC & WEIGHTS (TOTAL 100)
1. Headline Quality (20 pts)
   - 0 pts: empty or generic ("Student", "Developer")
   - +5 pts: mentions role (e.g. "Fullstack Developer")
   - +5 pts: mentions tech / domain (e.g. "Laravel, Next.js")
   - +5 pts: mentions value / outcome (e.g. "helping brands build...")
   - +5 pts: length 40-120 characters and readable

2. Summary / About Clarity (20 pts)
   - 0 pts: empty
   - +5 pts: tells what they do now
   - +5 pts: tells what they can help with (services / problem)
   - +5 pts: mentions experience / credibility (years, companies, results)
   - +5 pts: has some personality/tone (not 100% generic)

3. Skills-Target Match (20 pts)
   - Base skills = user.skills[]
   - Target role = user.target_role
   - +10 pts if at least 3 skills are clearly relevant to target role
   - +5 pts if includes modern / in-demand tools for that role
   - +5 pts if there is no obvious missing skill (e.g. target=Frontend but no React)

4. Experience Relevance (15 pts)
   - 0 pts: no experience data
   - +5 pts: at least 1 role relevant to target role
   - +5 pts: has progression (intern → junior → mid)
   - +5 pts: has company or project that supports the role (freelance counts)

5. Keyword Optimization (15 pts)
   - Take target role → extract main keywords → check if they appear in headline OR summary OR skills
   - +5 pts if target keyword appears in headline
   - +5 pts if tech keyword appears in summary or skills
   - +5 pts if profile is searchable for that role (has at least 3 role-related terms)

6. Overall Branding / Consistency (10 pts)
   - +5 pts: headline, summary, skills talk about the SAME thing
   - +5 pts: tone matches target region / role (e.g. professional for "Product Manager")

========================

OUTPUT RULES:
- "score" = sum of all component scores (0-100)
- "missing_keywords" = keywords that SHOULD exist, based on target_role, but not present
- "improvement_tips" = MAX 3, each must be actionable
- If headline score < 15, generate a better headline
- If summary score < 15, generate a better summary (max 120 words)

========================
INPUT (JSON):
{
  "name": "{{name}}",
  "headline": "{{headline}}",
  "summary": "{{summary}}",
  "skills": {{skillsJson}},
  "experience": {{experienceJson}},
  "education": "{{education}}",
  "achievements": {{achievementsJson}},
  "target_role": "{{targetRole}}",
  "languages": {{languagesJson}},
  "target_region": "{{targetRegion}}"
}

========================
RETURN JSON ONLY IN THIS SHAPE:
{
  "score": 0,
  "components": {
    "headline_quality": 0,
    "summary_clarity": 0,
    "skills_target_match": 0,
    "experience_relevance": 0,
    "keyword_optimization": 0,
    "branding_consistency": 0
  },
  "headline_suggestion": "",
  "summary_suggestion": "",
  "missing_keywords": [],
  "improvement_tips": [],
  "notes": ""
}
DO NOT wrap with \`\`\`json
DO NOT add explanation text
`.trim();

  const safeParseJSON = (text) => {
    try {
      // Handle response that comes wrapped in ```json
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1]);
      }

      // Try to find JSON object in the text
      const objectMatch = text.match(/\{[\s\S]*\}/);
      if (objectMatch) {
        return JSON.parse(objectMatch[0]);
      }

      // Try parsing the whole text
      return JSON.parse(text);
    } catch (error) {
      console.error("JSON parsing error:", error);
      return null;
    }
  };

  const handleAnalyze = async () => {
    if (!headline || !about || !skills || !targetRole) {
      setError("Please fill in all fields");
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      const skillsArr = skills.split(",").map(s => s.trim()).filter(Boolean);

      // minimal fields (yang lain bisa lo tambahin dari UI lo nanti)
      const payload = {
        name: user?.user_metadata?.full_name || user?.user_metadata?.name || "",
        headline,
        summary: about,
        skills: skillsArr,
        experience: [],              // TODO: isi dari UI (opsional)
        education: "",               // TODO
        achievements: [],            // TODO
        targetRole,
        languages: ["Indonesian"],   // default
        targetRegion: "Asia/Jakarta"
      };

      // build prompt final
      const finalPrompt = rubricPrompt
        .replace('{{name}}', payload.name.replaceAll('"', '\\"'))
        .replace('{{headline}}', payload.headline.replaceAll('"', '\\"'))
        .replace('{{summary}}', payload.summary.replaceAll('"', '\\"'))
        .replace('{{skillsJson}}', JSON.stringify(payload.skills))
        .replace('{{experienceJson}}', JSON.stringify(payload.experience))
        .replace('{{education}}', payload.education.replaceAll('"', '\\"'))
        .replace('{{achievementsJson}}', JSON.stringify(payload.achievements))
        .replace('{{targetRole}}', payload.targetRole.replaceAll('"', '\\"'))
        .replace('{{languagesJson}}', JSON.stringify(payload.languages))
        .replace('{{targetRegion}}', payload.targetRegion.replaceAll('"', '\\"'));

      const response = await fetch("/api/ai/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to analyze profile");

      // Handle different response formats
      const aiText = data.summary || data.text || data.content || data.response || "";
      console.log("AI Response:", aiText); // Debug log

      const parsed = safeParseJSON(aiText);

      // fallback minimal terstruktur
      const fallback = {
        score: 0,
        components: {
          headline_quality: 0,
          summary_clarity: 0,
          skills_target_match: 0,
          experience_relevance: 0,
          keyword_optimization: 0,
          branding_consistency: 0,
        },
        headline_suggestion: "",
        summary_suggestion: "",
        missing_keywords: [],
        improvement_tips: ["Unable to parse AI response. Please try again."],
        notes: "AI returned non-JSON; using fallback."
      };

      // validasi bentuk
      if (!parsed || typeof parsed !== 'object') {
        console.error("Failed to parse AI response:", aiText);
        setResult(fallback);
        return;
      }

      const resultObj = parsed.components ? parsed : fallback;

      // Ensure all required fields exist
      resultObj.components = resultObj.components || {};
      resultObj.missing_keywords = Array.isArray(resultObj.missing_keywords) ? resultObj.missing_keywords : [];
      resultObj.improvement_tips = Array.isArray(resultObj.improvement_tips) ? resultObj.improvement_tips : [];
      resultObj.headline_suggestion = resultObj.headline_suggestion || "";
      resultObj.summary_suggestion = resultObj.summary_suggestion || "";
      resultObj.notes = resultObj.notes || "";

      // harden: hitung ulang score dari komponennya (biar gak ngaco)
      const c = resultObj.components;
      const recomputed =
        (c.headline_quality ?? 0) +
        (c.summary_clarity ?? 0) +
        (c.skills_target_match ?? 0) +
        (c.experience_relevance ?? 0) +
        (c.keyword_optimization ?? 0) +
        (c.branding_consistency ?? 0);

      resultObj.score = Math.max(0, Math.min(100, recomputed));

      setResult(resultObj);
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err.message || "Failed to analyze profile");
    } finally {
      setAnalyzing(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You can add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    if (score >= 40) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreGradient = (score) => {
    if (score >= 80) return "from-green-500/20 to-emerald-500/20 border-green-500/30";
    if (score >= 60) return "from-yellow-500/20 to-amber-500/20 border-yellow-500/30";
    if (score >= 40) return "from-orange-500/20 to-red-500/20 border-orange-500/30";
    return "from-red-500/20 to-pink-500/20 border-red-500/30";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Column - Form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
              Analyze Your Profile
            </h2>

            <div className="space-y-6">
              {/* Headline Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  LinkedIn Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g., Fullstack Developer | Laravel + Next.js"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              {/* About/Summary Textarea */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  About / Summary
                </label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Paste your LinkedIn about section..."
                  rows={4}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
                />
              </div>

              {/* Skills Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="React, Next.js, TypeScript, Node.js..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              {/* Target Role Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Target Role
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g., Senior Full Stack Engineer"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                  {error}
                </div>
              )}

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                {analyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze with AI"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 lg:p-8 h-fit lg:sticky lg:top-24">
          <h3 className="text-lg font-semibold text-white mb-6">AI Result</h3>

          <div className="space-y-6">
            {/* Empty State */}
            {!result && !analyzing && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Linkedin className="w-8 h-8 text-slate-500" />
                </div>
                <p className="text-slate-400">
                  No analysis yet. Run analysis to see suggestions.
                </p>
              </div>
            )}

            {/* Loading State */}
            {analyzing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4" />
                <p className="text-white">Analyzing your profile...</p>
              </div>
            )}

            {/* Results */}
            {result && !analyzing && (
              <div className="space-y-6">
                {/* Score */}
                <div className={`bg-linear-to-r ${getScoreGradient(result.score)} rounded-lg p-6 text-center`}>
                  <div className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
                    {result.score}
                  </div>
                  <div className="text-sm text-slate-300 mt-2">
                    Personal Brand Score
                  </div>
                </div>

                {/* Breakdown */}
                <div className="space-y-3">
                  <p className="text-xs uppercase text-slate-400 font-semibold">Component Breakdown</p>
                  {[
                    ["Headline Quality", result.components?.headline_quality ?? 0, 20],
                    ["Summary Clarity", result.components?.summary_clarity ?? 0, 20],
                    ["Skills-Target Match", result.components?.skills_target_match ?? 0, 20],
                    ["Experience Relevance", result.components?.experience_relevance ?? 0, 15],
                    ["Keyword Optimization", result.components?.keyword_optimization ?? 0, 15],
                    ["Branding Consistency", result.components?.branding_consistency ?? 0, 10],
                  ].map(([label, val, max], i) => {
                    const pct = Math.min(100, Math.round((val / max) * 100));
                    return (
                      <div key={i}>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>{label}</span>
                          <span>{val}/{max}</span>
                        </div>
                        <div className="h-2 rounded bg-slate-700 overflow-hidden">
                          <div
                            className="h-2 bg-cyan-500 transition-all duration-300"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Suggested Headline */}
                {result.headline_suggestion && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300">Suggested Headline</label>
                    <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                      <p className="text-white font-medium mb-3">{result.headline_suggestion}</p>
                      <button
                        onClick={() => copyToClipboard(result.headline_suggestion)}
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                      >
                        <Copy className="w-4 h-4" /> Copy
                      </button>
                    </div>
                  </div>
                )}

                {/* Suggested Summary */}
                {result.summary_suggestion && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300">Suggested Summary</label>
                    <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                      <p className="text-slate-300 text-sm leading-relaxed mb-3">{result.summary_suggestion}</p>
                      <button
                        onClick={() => copyToClipboard(result.summary_suggestion)}
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                      >
                        <Copy className="w-4 h-4" /> Copy
                      </button>
                    </div>
                  </div>
                )}

                {/* Missing Keywords */}
                {result.missing_keywords && result.missing_keywords.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300">Missing Keywords</label>
                    <div className="flex flex-wrap gap-2">
                      {result.missing_keywords.map((kw, idx) => (
                        <span key={idx} className="bg-orange-500/20 border border-orange-500/50 text-orange-300 text-xs font-medium px-3 py-1 rounded-full">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Improvement Tips */}
                {result.improvement_tips && result.improvement_tips.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300">Improvement Tips</label>
                    <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                      {result.improvement_tips.slice(0, 3).map((tip, i) => (
                        <li key={i} className="leading-relaxed">{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Notes */}
                {result.notes && (
                  <div className="text-xs text-slate-400 bg-slate-900/50 p-3 rounded border border-slate-700">
                    <span className="font-semibold">Note: </span>{result.notes}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}