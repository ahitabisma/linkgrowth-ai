"use client";

import { useState } from "react";
import { MessageSquare, ArrowLeft, Clock, Copy } from "lucide-react";
import Link from "next/link";

/**
 * Prompt rubric (Post Analyzer)
 * - Memaksa model ngikut format JSON tertentu
 * - Skor hook 0-10
 * - Feedback struktur
 * - 3 variasi caption (story / educational / authority)
 * - Hashtag & best time (Asia/Jakarta)
 */
const buildPostPrompt = (postText, niche) => `
You are a LinkedIn Content Growth Rater.

Your job is NOT to be creative without control.
Rate and transform the post based on the rubric below and return ONLY valid JSON.

========================
RUBRIC
1) Hook Score (0-10):
   +0: no clear hook (first 1-2 lines weak, vague, or off-topic)
   +5: somewhat clear hook but generic or too long
   +8-10: sharp, curiosity-driven, concise (<= 180 chars for first 2 lines)

2) Structure Feedback:
   - Check presence of: hook, body, CTA
   - Check readability: short lines, scannable, avoids wall-of-text
   - Suggest 1-2 concrete fixes (no more than 2 sentences)

3) Variants (Rewrite):
   Generate 3 alternative captions keeping original meaning:
   - "story": personal narrative, first-person, 4-7 short lines
   - "educational": step-by-step, bullet-ish, 4-7 short lines
   - "authority": confident, data/insight-led, 4-7 short lines
   * Each variant MUST end with a short CTA (e.g., "Thoughts?" or "Want the checklist?")

4) Hashtags:
   - 5–7 hashtags, lowercase, no spaces, relevant to the given niche
   - Do NOT repeat identical words

5) Best Time to Post (Asia/Jakarta):
   - Suggest exact day + time in WIB (e.g., "Tuesday, 09:00 WIB")
   - Prefer weekday morning or early afternoon

========================
INPUT:
Post: """${postText}"""
Niche: "${niche || "general tech"}"

========================
RETURN JSON ONLY WITH THIS SHAPE:
{
  "hook_score": number,
  "structure_feedback": string,
  "variants": {
    "story": string,
    "educational": string,
    "authority": string
  },
  "hashtags": string[],
  "best_time": string
}
DO NOT wrap with \`\`\`
DO NOT add any extra keys
`.trim();

/** Utility: extract and parse JSON safely from LLM text output */
function safeParseLLMJson(text) {
  try {
    // strip code-fences if any
    const clean = text.replace(/```json|```/g, "").trim();
    // try direct parse
    return JSON.parse(clean);
  } catch {
    // last resort: find the last {...} block
    const m = text.match(/\{[\s\S]*\}/);
    if (!m) return null;
    try {
      return JSON.parse(m[0]);
    } catch {
      return null;
    }
  }
}

export default function PostAnalyzer() {
  const [postText, setPostText] = useState("");
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [result, setResult] = useState(null);

  async function handleAnalyze() {
    setErr(null);
    setResult(null);

    if (!postText.trim()) {
      setErr("Please paste your LinkedIn post first.");
      return;
    }

    setLoading(true);
    try {
      const finalPrompt = buildPostPrompt(postText.trim(), niche.trim());

      // OPTIONAL: consume quota terlebih dulu (kalau pakai limiter)
      // const consume = await fetch("/api/usage/consume", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ feature: "post-analyze" }),
      // });
      // if (!consume.ok) {
      //   const j = await consume.json().catch(() => ({}));
      //   throw new Error(j?.error || "Daily limit reached");
      // }

      // CALL GEMINI API PROXY (sesuai instruksi lo)
      const response = await fetch("/api/ai/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to analyze");
      }

      const aiText = data?.summary ?? data?.text ?? data?.content ?? "";
      const parsed = safeParseLLMJson(aiText);

      // shape guard + fallback minimal
      const shaped = {
        hook_score: Number(parsed?.hook_score ?? 0),
        structure_feedback: String(parsed?.structure_feedback ?? ""),
        variants: {
          story: String(parsed?.variants?.story ?? ""),
          educational: String(parsed?.variants?.educational ?? ""),
          authority: String(parsed?.variants?.authority ?? ""),
        },
        hashtags: Array.isArray(parsed?.hashtags) ? parsed.hashtags.map((x) => String(x)) : [],
        best_time: String(parsed?.best_time ?? ""),
      };

      setResult(shaped);
    } catch (e) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-300 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>
      </div>

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
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
                />
              </div>

              {/* Niche/Audience Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Niche / Audience</label>
                <input
                  type="text"
                  placeholder="e.g., Web Developers, Startups, Tech Enthusiasts"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              {/* Error */}
              {err && (
                <div className="bg-red-500/15 border border-red-500/40 text-red-300 text-sm rounded-lg px-3 py-2">
                  {err}
                </div>
              )}

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
              >
                {loading ? "Analyzing..." : "Analyze post"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 h-fit sticky top-24">
          <h3 className="text-lg font-semibold text-white mb-6">Analysis Results</h3>

          <div className="space-y-6">
            {/* Empty State */}
            {!result && !loading && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-slate-500" />
                </div>
                <p className="text-slate-400">No analysis yet. Paste a post to get started.</p>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4" />
                <p className="text-white">Analyzing your post…</p>
              </div>
            )}

            {/* Results */}
            {result && !loading && (
              <div className="space-y-6">
                {/* Hook Score */}
                <div className="bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Hook Score</span>
                    <div className="text-3xl font-bold text-cyan-400">
                      {Number(result.hook_score?.toFixed?.(1) ?? result.hook_score)}
                      <span className="text-lg text-slate-400">/10</span>
                    </div>
                  </div>
                </div>

                {/* Structure Feedback */}
                {result.structure_feedback && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300">Structure Feedback</label>
                    <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                      <p className="text-slate-300 text-sm leading-relaxed">{result.structure_feedback}</p>
                    </div>
                  </div>
                )}

                {/* Generated Versions */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-300">Alternative Versions</label>

                  {/* Story */}
                  {result.variants?.story && (
                    <button
                      onClick={() => copyToClipboard(result.variants.story)}
                      className="w-full text-left bg-slate-700/50 border border-slate-600 hover:border-cyan-500/50 rounded-lg p-3 transition"
                    >
                      <div className="text-xs font-semibold text-cyan-400 mb-1">Story Version (click to copy)</div>
                      <p className="text-slate-300 text-sm whitespace-pre-line">{result.variants.story}</p>
                    </button>
                  )}

                  {/* Educational */}
                  {result.variants?.educational && (
                    <button
                      onClick={() => copyToClipboard(result.variants.educational)}
                      className="w-full text-left bg-slate-700/50 border border-slate-600 hover:border-cyan-500/50 rounded-lg p-3 transition"
                    >
                      <div className="text-xs font-semibold text-cyan-400 mb-1">Educational Version (click to copy)</div>
                      <p className="text-slate-300 text-sm whitespace-pre-line">{result.variants.educational}</p>
                    </button>
                  )}

                  {/* Authority */}
                  {result.variants?.authority && (
                    <button
                      onClick={() => copyToClipboard(result.variants.authority)}
                      className="w-full text-left bg-slate-700/50 border border-slate-600 hover:border-cyan-500/50 rounded-lg p-3 transition"
                    >
                      <div className="text-xs font-semibold text-cyan-400 mb-1">Authority Version (click to copy)</div>
                      <p className="text-slate-300 text-sm whitespace-pre-line">{result.variants.authority}</p>
                    </button>
                  )}
                </div>

                {/* Hashtags */}
                {Array.isArray(result.hashtags) && result.hashtags.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300">Suggested Hashtags</label>
                    <div className="flex flex-wrap gap-2">
                      {result.hashtags.map((tag, idx) => (
                        <span
                          key={`${tag}-${idx}`}
                          className="bg-blue-500/20 border border-blue-500/50 text-blue-300 text-xs font-medium px-3 py-1 rounded-full"
                        >
                          #{String(tag).replace(/^#/, "")}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Best Time to Post */}
                {result.best_time && (
                  <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-400">Best time to post</div>
                      <div className="text-white font-medium">{result.best_time}</div>
                    </div>
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
