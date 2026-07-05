"use client";

import { ChangeEvent, DragEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  Download,
  FileImage,
  Image as ImageIcon,
  Loader2,
  LockKeyhole,
  RefreshCw,
  Sparkles,
  UploadCloud,
  X,
  XCircle
} from "lucide-react";
import {
  CompressionOutcome,
  FIXED_TARGET_KB,
  UNDER_20KB_ERROR,
  compressImageToTarget,
  formatBytes,
  getSavedPercentage,
  isWithinMaxSize,
  isSupportedImage
} from "@/lib/compress-image";

type ResultState = CompressionOutcome & {
  previewUrl: string;
};

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [result, setResult] = useState<ResultState | null>(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDownloadFeedbackActive, setIsDownloadFeedbackActive] = useState(false);
  const [downloadSucceeded, setDownloadSucceeded] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toastTimerRef = useRef<number | null>(null);

  const originalSize = useMemo(() => (file ? formatBytes(file.size) : "Not selected"), [file]);
  const originalFormat = useMemo(() => (file ? getFormatLabel(file) : "None"), [file]);
  const reduction = result ? getSavedPercentage(result.originalBytes, result.compressedBytes) : 0;

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
    };
  }, [originalUrl]);

  useEffect(() => {
    return () => {
      if (result?.previewUrl) URL.revokeObjectURL(result.previewUrl);
    };
  }, [result?.previewUrl]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  function resetResult() {
    setResult(null);
    setProgress(0);
    setStatusText("");
    setError("");
    setToast(null);
    setDownloadSucceeded(false);
    setIsDownloadFeedbackActive(false);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
  }

  function selectFile(nextFile: File | undefined) {
    if (!nextFile) return;

    if (!isSupportedImage(nextFile)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      setFile(null);
      setOriginalUrl(null);
      setResult(null);
      return;
    }

    resetResult();
    setFile(nextFile);
    setOriginalUrl(URL.createObjectURL(nextFile));
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    selectFile(event.target.files?.[0]);
  }

  function clearFile() {
    resetResult();
    setFile(null);
    setOriginalUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function showToast(message: string, type: "success" | "error") {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setToast({ message, type });
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      setDownloadSucceeded(false);
      setIsDownloadFeedbackActive(false);
    }, 2000);
  }

  function handleDownload() {
    if (!result || isDownloadFeedbackActive) return;
    if (!isWithinMaxSize(result.blob.size) || !isWithinMaxSize(result.compressedBytes)) {
      setResult(null);
      setError(UNDER_20KB_ERROR);
      showToast("Download failed. Please try again.", "error");
      return;
    }

    setIsDownloadFeedbackActive(true);

    try {
      const link = document.createElement("a");
      link.href = result.previewUrl;
      link.download = `compressed-image-20kb.${result.extension}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setDownloadSucceeded(true);
      showToast("Your compressed image has been downloaded.", "success");
    } catch {
      setDownloadSucceeded(false);
      showToast("Download failed. Please try again.", "error");
    }
  }

  function handleChooseAnother(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    inputRef.current?.click();
  }

  function handleClear(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    clearFile();
  }

  function handleUploadAreaClick() {
    if (!file) inputRef.current?.click();
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files?.[0]);
  }

  async function handleCompress() {
    if (!file) {
      setError("Choose an image first.");
      return;
    }

    setIsCompressing(true);
    setError("");
    setResult(null);
    setProgress(2);
    setStatusText("Starting local compression");

    try {
      const outcome = await compressImageToTarget(file, FIXED_TARGET_KB, (nextProgress, message) => {
        setProgress(nextProgress);
        setStatusText(message);
      });

      const verifiedCompressedBytes = outcome.blob.size;
      if (!isWithinMaxSize(verifiedCompressedBytes)) {
        throw new Error(UNDER_20KB_ERROR);
      }

      setResult({
        ...outcome,
        compressedBytes: verifiedCompressedBytes,
        previewUrl: URL.createObjectURL(outcome.blob)
      });
    } catch (caughtError) {
      setError(caughtError instanceof Error && caughtError.message === UNDER_20KB_ERROR ? caughtError.message : UNDER_20KB_ERROR);
      setProgress(0);
      setStatusText("");
    } finally {
      setIsCompressing(false);
    }
  }

  return (
    <section
      aria-label="20KB image compressor"
      className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/80 p-4 shadow-[0_28px_90px_rgba(88,65,135,0.18)] backdrop-blur-2xl sm:p-5"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#ff6fb1,#ffc95f,#82ec7a,#48d9ff,#9d7bff)]" />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 pt-2">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f4cc5]">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Local 20KB max compressor
          </p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-normal text-[#241b4b] sm:text-3xl">Make a tiny image in seconds</h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/90 px-3 py-1.5 text-sm font-semibold text-emerald-800">
          <LockKeyhole className="h-4 w-4" aria-hidden="true" />
          Browser only
        </span>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadAreaClick}
        className={`group rounded-[24px] border border-dashed p-4 transition ${
          isDragging
            ? "border-[#ff6fb1] bg-pink-50/90"
            : file
              ? "border-emerald-200 bg-white/80"
              : "cursor-pointer border-[#8edff1] bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(255,246,184,0.48),rgba(207,246,255,0.58))] hover:border-[#ff6fb1]"
        }`}
      >
        <input
          ref={inputRef}
          className="sr-only"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
        />

        {file ? (
          <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 shadow-sm">
              <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
            </span>
            <div>
              <p className="text-lg font-extrabold text-[#241b4b]">Ready to compress</p>
              <p className="mt-1 break-all text-sm font-semibold text-slate-700">{file.name}</p>
              <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <InfoPill label="Original size" value={originalSize} />
                <InfoPill label="Original format" value={originalFormat} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleChooseAnother}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-bold text-violet-800 transition hover:-translate-y-0.5 hover:bg-violet-100"
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  Choose another image
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  Clear
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[148px] flex-col items-center justify-center text-center">
            <span className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#d84898] shadow-soft transition group-hover:-translate-y-0.5">
              <UploadCloud className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="text-lg font-extrabold text-[#241b4b]">Drop your image here</p>
            <p className="mt-2 max-w-sm text-sm font-semibold leading-6 text-slate-700">or click to choose a JPG, PNG, or WebP file</p>
          </div>
        )}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm font-bold text-slate-700 shadow-sm">
          <span className="text-[#8f4cc5]">Target:</span> 20KB max
        </div>
        <button
          type="button"
          onClick={handleCompress}
          disabled={!file || isCompressing}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(90deg,#f04e98,#ff9b51,#7c63ff)] px-5 py-3 text-base font-extrabold text-white shadow-[0_16px_34px_rgba(155,92,246,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(155,92,246,0.4)] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
        >
          {isCompressing ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Sparkles className="h-5 w-5" aria-hidden="true" />}
          Compress Image to 20KB or Less
        </button>
      </div>

      {isCompressing ? (
        <div className="mt-4 rounded-2xl border border-violet-100 bg-violet-50/80 p-4" role="status" aria-live="polite">
          <div className="mb-2 flex items-center justify-between gap-3 text-sm font-bold text-violet-900">
            <span>{statusText || "Compressing image"}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#ff6fb1,#ffc95f,#48d9ff)] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="mt-4 flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-800" role="alert">
          <XCircle className="mt-0.5 h-5 w-5 flex-none" aria-hidden="true" />
          <p>{error}</p>
        </div>
      ) : null}

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <PreviewPanel title="Before" imageUrl={originalUrl} placeholder="Original image preview" />
        <PreviewPanel title="After" imageUrl={result?.previewUrl ?? null} placeholder="Compressed image preview" />
      </div>

      {result ? (
        <div className="relative mt-5 rounded-[24px] border border-emerald-200/80 bg-[linear-gradient(135deg,rgba(236,253,245,0.96),rgba(255,255,255,0.9),rgba(238,242,255,0.86))] p-4 shadow-soft sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-2 text-sm font-bold leading-6 text-emerald-900">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none" aria-hidden="true" />
              Your image is now under 20KB.
            </p>
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloadFeedbackActive}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#241b4b] px-4 py-2.5 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(36,27,75,0.22)] transition hover:-translate-y-0.5 hover:bg-[#32256b] disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:translate-y-0"
            >
              {downloadSucceeded ? <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> : <Download className="h-5 w-5" aria-hidden="true" />}
              {downloadSucceeded ? "Downloaded!" : "Download 20KB Image"}
            </button>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard label="Original size" value={originalSize} tone="bg-pink-50/90 text-pink-900" />
            <StatCard label="Compressed size" value={formatBytes(result.compressedBytes)} tone="bg-cyan-50/90 text-cyan-900" />
            <StatCard label="Saved percentage" value={`${reduction.toFixed(1)}%`} tone="bg-lime-50/90 text-lime-900" />
            <StatCard label="Target" value="20KB max" tone="bg-violet-50/90 text-violet-900" />
            <StatCard label="Output format" value={result.formatLabel} tone="bg-amber-50/90 text-amber-900" />
          </div>
        </div>
      ) : null}

      {toast ? (
        <div
          className={`fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border px-4 py-3 text-sm font-bold shadow-candy sm:bottom-6 ${
            toast.type === "success" ? "border-emerald-200 bg-white text-emerald-900" : "border-red-200 bg-white text-red-800"
          }`}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      ) : null}
    </section>
  );
}

function PreviewPanel({
  title,
  imageUrl,
  placeholder
}: {
  title: string;
  imageUrl: string | null;
  placeholder: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/70 bg-white/72 p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-slate-600">{title}</h3>
        <ImageIcon className="h-4 w-4 text-slate-500" aria-hidden="true" />
      </div>
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#fff8c8,#d7f7ff,#ffe1f1)]">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={`${title} image preview`} className="h-full w-full object-contain" />
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 text-center text-sm font-semibold text-slate-700">
            <FileImage className="h-7 w-7 text-slate-500" aria-hidden="true" />
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className={`rounded-2xl border border-white/80 p-4 shadow-sm ${tone}`}>
      <p className="text-xs font-extrabold uppercase tracking-[0.12em] opacity-70">{label}</p>
      <p className="mt-1 text-xl font-extrabold">{value}</p>
    </div>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-3 py-2">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <p className="mt-0.5 font-bold text-slate-800">{value}</p>
    </div>
  );
}

function getFormatLabel(file: File) {
  if (file.type === "image/webp") return "WebP";
  if (file.type === "image/png") return "PNG";
  return "JPG";
}
