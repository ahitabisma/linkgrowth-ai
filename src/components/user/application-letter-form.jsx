"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Copy, Check, Loader, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ApplicationLetterForm() {
  // Job Post & CV inputs
  const [jobPostInput, setJobPostInput] = useState("");
  const [jobPostInputMethod, setJobPostInputMethod] = useState("text"); // "text" or "image"
  const [jobPostImage, setJobPostImage] = useState(null);
  const [jobPostImagePreview, setJobPostImagePreview] = useState(null);

  const [cvInput, setCvInput] = useState("");
  const [cvInputMethod, setCvInputMethod] = useState("text"); // "text" (copy-paste) or "file" (PDF upload)
  const [cvFile, setCvFile] = useState(null);
  const [cvFileName, setCvFileName] = useState("");

  // Options
  const [outputLanguage, setOutputLanguage] = useState("indonesia");
  const [companyName, setCompanyName] = useState(""); // Nama perusahaan (opsional)
  const [sourceJob, setSourceJob] = useState("linkedin"); // Text input, default "linkedin"

  // Generated results
  const [generatedSubject, setGeneratedSubject] = useState("");
  const [generatedBody, setGeneratedBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedField, setCopiedField] = useState(null);

  const jobPostImageInputRef = useRef(null);
  const cvFileInputRef = useRef(null);

  // Job Post Image Upload Handler
  const handleJobPostImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setJobPostImage(file);
        const reader = new FileReader();
        reader.onload = (event) => {
          setJobPostImagePreview(event.target.result);
        };
        reader.readAsDataURL(file);
        setError("");
      } else {
        setError("Hanya file gambar yang diterima");
      }
    }
  };

  // CV File Upload Handler
  const handleCVFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        setCvFile(file);
        setCvFileName(file.name);
        setError("");
      } else {
        setError("Hanya file PDF yang diterima untuk CV");
      }
    }
  };

  // Generate Letter Handler
  const handleGenerateLetter = async () => {
    setError("");
    setGeneratedSubject("");
    setGeneratedBody("");

    // Validasi job post
    let jobPostContent = "";
    if (jobPostInputMethod === "text") {
      jobPostContent = jobPostInput.trim();
      if (!jobPostContent) {
        setError("Silakan masukkan job post atau deskripsi pekerjaan");
        return;
      }
    } else {
      if (!jobPostImage) {
        setError("Silakan upload gambar job post");
        return;
      }
    }

    // Validasi CV
    let cvContent = "";
    if (cvInputMethod === "text") {
      cvContent = cvInput.trim();
      if (!cvContent) {
        setError("Silakan masukkan atau upload CV");
        return;
      }
    } else {
      if (!cvFile) {
        setError("Silakan upload file CV (PDF)");
        return;
      }
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("outputLanguage", outputLanguage);

      // Use default "linkedin" if sourceJob is empty
      const finalSourceJob = sourceJob.trim() || "linkedin";
      formData.append("sourceJob", finalSourceJob);

      // Add company name if provided
      formData.append("companyName", companyName.trim());

      // Add job post
      if (jobPostInputMethod === "text") {
        formData.append("jobPost", jobPostContent);
      } else {
        formData.append("jobPostImage", jobPostImage);
      }

      // Add CV
      if (cvInputMethod === "text") {
        formData.append("cvText", cvContent);
      } else {
        formData.append("cv", cvFile);
      }

      const response = await fetch("/api/ai/application-letter", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal generate surat lamaran");
      }

      const data = await response.json();
      setGeneratedSubject(data.subject || "");
      setGeneratedBody(data.body || "");
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat generate surat lamaran");
    } finally {
      setLoading(false);
    }
  };

  // Copy to Clipboard Handler
  const handleCopyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field.toUpperCase()} Berhasil di-copy!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Grid Layout 2 Columns */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN - Input Section */}
        <div className="space-y-6">
          {/* Job Post Input Section */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Job Post</h3>

            {/* Input Method Toggle */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setJobPostInputMethod("text")}
                className={cn("px-3 py-2 rounded-lg font-medium transition text-sm", jobPostInputMethod === "text" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600")}>
                Copy Paste
              </button>
              <button
                onClick={() => setJobPostInputMethod("image")}
                className={cn("px-3 py-2 rounded-lg font-medium transition text-sm", jobPostInputMethod === "image" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600")}>
                Upload Gambar
              </button>
            </div>

            {/* Text Input */}
            {jobPostInputMethod === "text" && (
              <textarea
                value={jobPostInput}
                onChange={(e) => setJobPostInput(e.target.value)}
                placeholder="Paste job post dari LinkedIn di sini..."
                className="w-full h-32 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none text-sm"
              />
            )}

            {/* Image Input */}
            {jobPostInputMethod === "image" && (
              <div className="space-y-3">
                <div onClick={() => jobPostImageInputRef.current?.click()} className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center cursor-pointer hover:border-cyan-500 transition group">
                  <input ref={jobPostImageInputRef} type="file" accept="image/*" onChange={handleJobPostImageUpload} className="hidden" />
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2 group-hover:text-cyan-400 transition" />
                  <p className="text-slate-300 font-medium text-sm">Upload gambar job post</p>
                  <p className="text-xs text-slate-500 mt-1">JPG, PNG, WebP, dll</p>
                </div>
                {jobPostImagePreview && (
                  <div className="relative rounded-lg overflow-hidden border border-slate-600 max-h-40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={jobPostImagePreview} alt="Job Post Preview" className="w-full h-auto max-h-40 object-cover" />
                    <button
                      onClick={() => {
                        setJobPostImage(null);
                        setJobPostImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600 transition">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* CV Input Section */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">CV</h3>

            {/* CV Input Method Toggle */}
            <div className="flex gap-2 mb-4">
              <button onClick={() => setCvInputMethod("text")} className={cn("px-3 py-2 rounded-lg font-medium transition text-sm", cvInputMethod === "text" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600")}>
                Copy Paste
              </button>
              <button onClick={() => setCvInputMethod("file")} className={cn("px-3 py-2 rounded-lg font-medium transition text-sm", cvInputMethod === "file" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600")}>
                Upload PDF
              </button>
            </div>

            {/* CV Text Input */}
            {cvInputMethod === "text" && (
              <textarea
                value={cvInput}
                onChange={(e) => setCvInput(e.target.value)}
                placeholder="Copy paste isi CV Anda di sini..."
                className="w-full h-32 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none text-sm"
              />
            )}

            {/* CV File Upload */}
            {cvInputMethod === "file" && (
              <div className="space-y-3">
                <div onClick={() => cvFileInputRef.current?.click()} className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center cursor-pointer hover:border-cyan-500 transition group">
                  <input ref={cvFileInputRef} type="file" accept=".pdf" onChange={handleCVFileUpload} className="hidden" />
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2 group-hover:text-cyan-400 transition" />
                  <p className="text-slate-300 font-medium text-sm">{cvFileName || "Upload CV (PDF)"}</p>
                  <p className="text-xs text-slate-500 mt-1">Format PDF saja</p>
                </div>
                {cvFileName && (
                  <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <FileText className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-300">{cvFileName}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Options Section */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Opsi</h3>

            {/* Output Language */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Bahasa Output</label>
              <select
                value={outputLanguage}
                onChange={(e) => setOutputLanguage(e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm">
                <option value="indonesia">Bahasa Indonesia</option>
                <option value="english">English</option>
              </select>
            </div>

            {/* Company Name - Optional */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nama Perusahaan <span className="text-xs text-slate-400">(Opsional)</span>
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Contoh: PT. Mitra Teknologi"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
              />
              <p className="text-xs text-slate-400 mt-1">Jika kosong, akan mencari di job post. Jika tetap tidak ada, Anda dapat menggantinya di hasil surat.</p>
            </div>

            {/* Source Job - Text Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Sumber Lowongan</label>
              <input
                type="text"
                value={sourceJob}
                onChange={(e) => setSourceJob(e.target.value || "linkedin")} // Default to linkedin if empty
                placeholder="Contoh: LinkedIn, Job Portal, Website Perusahaan"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm"
              />
              <p className="text-xs text-slate-400 mt-1">Default: LinkedIn jika tidak ada input</p>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateLetter}
            disabled={loading}
            className={cn("w-full py-3 rounded-lg font-medium transition flex items-center justify-center gap-2", loading ? "bg-slate-700 text-slate-400 cursor-not-allowed" : "bg-cyan-500 text-white hover:bg-cyan-600")}>
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Sedang generate...
              </>
            ) : (
              "Generate Surat Lamaran"
            )}
          </button>
        </div>

        {/* RIGHT COLUMN - Output Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">Hasil</h3>

          {generatedSubject || generatedBody ? (
            <div className="space-y-4">
              {/* Subject Section */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">Subject</label>
                <div className="relative">
                  <textarea readOnly value={generatedSubject} className="w-full h-20 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white text-sm resize-none focus:outline-none focus:border-cyan-500" />
                  {generatedSubject && (
                    <button
                      onClick={() => handleCopyToClipboard(generatedSubject, "subject")}
                      className={cn(
                        "absolute top-2 right-2 p-2 rounded-lg transition",
                        copiedField === "subject" ? "bg-green-500/20 border border-green-500/50 text-green-300" : "bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/30"
                      )}>
                      {copiedField === "subject" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Body Section */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">Body</label>
                <div className="relative">
                  <textarea readOnly value={generatedBody} className="w-full h-64 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white text-sm resize-none focus:outline-none focus:border-cyan-500 overflow-y-auto" />
                  {generatedBody && (
                    <button
                      onClick={() => handleCopyToClipboard(generatedBody, "body")}
                      className={cn(
                        "absolute top-2 right-2 p-2 rounded-lg transition",
                        copiedField === "body" ? "bg-green-500/20 border border-green-500/50 text-green-300" : "bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/30"
                      )}>
                      {copiedField === "body" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center text-slate-400">
              <p className="text-center text-sm">
                Hasil generate akan tampil di sini.
                <br />
                Isi form di kolom kiri dan klik Generate.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
