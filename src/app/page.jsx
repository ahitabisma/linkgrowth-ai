import ClientHomePage from "@/components/client/home"
import { Linkedin, TrendingUp, MessageSquare } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "LinkedIn Growth AI - Optimize Your LinkedIn Profile with AI",
  description: "Analyze and optimize your LinkedIn profile, posts, and content with AI. Get personalized suggestions for headlines, summaries, and keywords to boost your professional presence.",
  keywords: [
    "LinkedIn optimization",
    "AI profile analyzer",
    "LinkedIn growth",
    "professional branding",
    "LinkedIn SEO",
    "career development",
    "LinkedIn marketing",
    "profile optimization",
    "LinkedIn analytics",
    "personal branding AI"
  ],
  authors: [{ name: "LinkedIn Growth AI" }],
  creator: "LinkedIn Growth AI",
  publisher: "LinkedIn Growth AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "LinkedIn Growth AI - Optimize Your LinkedIn Profile with AI",
    description: "Analyze and optimize your LinkedIn profile, posts, and content with AI. Get personalized suggestions for headlines, summaries, and keywords to boost your professional presence.",
    url: 'https://your-domain.com',
    siteName: 'LinkedIn Growth AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LinkedIn Growth AI - Profile Optimization Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "LinkedIn Growth AI - Optimize Your LinkedIn Profile with AI",
    description: "Analyze and optimize your LinkedIn profile, posts, and content with AI. Get personalized suggestions for headlines, summaries, and keywords.",
    images: ['/twitter-image.jpg'],
    creator: '@linkedingrowthai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "LinkedIn Growth AI",
            "description": "AI-powered LinkedIn profile and content optimization tool",
            "url": "https://your-domain.com",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "AI Profile Analysis",
              "LinkedIn Post Optimization",
              "Keyword Gap Analysis",
              "Personal Brand Scoring"
            ],
            "screenshot": "https://your-domain.com/screenshot.jpg",
            "author": {
              "@type": "Organization",
              "name": "LinkedIn Growth AI"
            }
          })
        }}
      />

      <div className="min-h-screen bg-linear-to-b from-slate-900 via-blue-900 to-slate-900">
        {/* Navigation */}
        <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Linkedin className="w-5 h-5 text-slate-900" />
              </div>
              <span className="font-bold text-white">LinkedIn Growth AI</span>
            </div>
            <ClientHomePage />
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  Optimize your <span className="text-cyan-400">LinkedIn</span> in seconds.
                </h1>
                <p className="text-xl text-slate-300">
                  Analyze your headline, summary, and skills. Get AI suggestions instantly to boost your professional presence and attract more opportunities.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3 text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                  </div>
                  <span>AI Personal Brand Score</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                  </div>
                  <span>Headline & Summary suggestions</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                  </div>
                  <span>Keyword gap vs recruiter search</span>
                </div>
              </div>
            </div>

            {/* Right Column - Analysis Preview Card */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-white mb-6">Analysis result preview</h2>

              <div className="space-y-6">
                {/* Score Badge */}
                <div className="bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-cyan-400">82</div>
                  <div className="text-sm text-slate-300 mt-2">Personal Brand Score</div>
                </div>

                {/* Suggested Headline */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Suggested Headline</label>
                  <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                    <p className="text-white font-medium">Fullstack Developer | Laravel + Next.js | Building AI SaaS</p>
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
        </section>

        {/* What You Can Analyze Section */}
        <section className="max-w-6xl mx-auto px-4 py-20 border-t border-slate-800">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">What you can analyze</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile Analyzer Card */}
            <article className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-cyan-500/50 transition">
              <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <Linkedin className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Profile Analyzer</h3>
              <p className="text-slate-400 mb-6">
                Get AI-powered insights on your headline, summary, and skills optimization for maximum visibility.
              </p>
              <Link href="/profile-analyzer" className="text-cyan-400 hover:text-cyan-300 font-medium text-sm">
                Analyze Profile →
              </Link>
            </article>

            {/* Post Analyzer Card */}
            <article className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-cyan-500/50 transition">
              <div className="w-12 h-12 bg-blue-500/20 border border-blue-500 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Post Analyzer</h3>
              <p className="text-slate-400 mb-6">
                Analyze your LinkedIn posts for engagement, hooks, and optimal posting times to maximize reach.
              </p>
              <Link href="/post-analyzer" className="text-cyan-400 hover:text-cyan-300 font-medium text-sm">
                Analyze Posts →
              </Link>
            </article>

            {/* Activity Insights Card */}
            <article className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-cyan-500/50 transition opacity-60">
              <div className="w-12 h-12 bg-purple-500/20 border border-purple-500 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Activity Insights</h3>
              <p className="text-slate-400 mb-6">Track your LinkedIn activity and growth metrics over time with detailed analytics.</p>
              <span className="text-slate-500 font-medium text-sm">Coming soon</span>
            </article>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to optimize your LinkedIn?</h2>
            <p className="text-slate-300 mb-8 text-lg">
              Join thousands of professionals who have improved their LinkedIn presence with AI.
            </p>
            <ClientHomePage showCTA={true} />
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 bg-slate-900/50 mt-20">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-cyan-500 rounded-lg" />
                  <span className="font-bold text-white">LinkedIn Growth AI</span>
                </div>
                <p className="text-slate-400 text-sm">Optimize your LinkedIn presence with AI-powered insights and recommendations.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>
                    <Link href="/profile-analyzer" className="hover:text-white transition">
                      Profile Analyzer
                    </Link>
                  </li>
                  <li>
                    <Link href="/post-analyzer" className="hover:text-white transition">
                      Post Analyzer
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>
                    <Link href="/about" className="hover:text-white transition">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white transition">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>
                    <Link href="/privacy" className="hover:text-white transition">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-white transition">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 flex items-center justify-between">
              <p className="text-slate-500 text-sm">© 2025 LinkedIn Growth AI. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="#" className="text-slate-400 hover:text-white transition" aria-label="Follow us on Twitter">
                  Twitter
                </Link>
                <Link href="#" className="text-slate-400 hover:text-white transition" aria-label="Connect on LinkedIn">
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}