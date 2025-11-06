"use client";

import ApplicationLetterForm from "@/components/user/application-letter-form";
import { Toaster } from "sonner";

export default function ApplicationLetterPage() {
  return (
    <>
      <Toaster />
      <div className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Buat Surat Lamaran Otomatis</h1>
            <p className="text-slate-300">Upload CV Anda, masukkan job post dari LinkedIn, dan biarkan AI membuat surat lamaran yang sempurna untuk Anda.</p>
          </div>

          {/* Form Component */}
          <ApplicationLetterForm />

          {/* Info Section */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-xs font-bold text-cyan-400">1</span>
                Format CV
              </h3>
              <p className="text-slate-300 text-sm">Pastikan CV Anda dalam format PDF. AI akan membaca dan menganalisis konten CV Anda untuk membuat surat lamaran yang relevan.</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-xs font-bold text-cyan-400">2</span>
                Job Post
              </h3>
              <p className="text-slate-300 text-sm">Anda bisa paste job post langsung dari LinkedIn atau upload screenshot job posting. AI akan menganalisis requirement yang dibutuhkan.</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-xs font-bold text-cyan-400">3</span>
                Generate Surat
              </h3>
              <p className="text-slate-300 text-sm">AI akan membuat surat lamaran yang disesuaikan dengan job post dan profil Anda. Hasilnya siap untuk di-copy dan digunakan.</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-xs font-bold text-cyan-400">4</span>
                Copy & Gunakan
              </h3>
              <p className="text-slate-300 text-sm">Copy surat lamaran yang telah di-generate dan gunakan untuk melamar di LinkedIn atau email langsung ke perusahaan.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
