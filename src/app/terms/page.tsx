import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use for Compress Image to 20KB. The free tool provides browser-based image compression to 20KB or less, with results that depend on each source image.",
  alternates: {
    canonical: "/terms"
  }
};

export default function TermsPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl rounded-lg border border-white/70 bg-white/78 p-6 shadow-soft backdrop-blur sm:p-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-berry hover:text-ink">
          ← Back to compressor
        </Link>
        <div className="mt-8 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
            <FileText className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="text-4xl font-black text-ink">Terms of Use</h1>
        </div>
        <p className="mt-4 leading-7 text-slate-700">Last updated: July 5, 2026</p>

        <div className="mt-8 space-y-7 leading-8 text-slate-800">
          <section>
            <h2 className="text-2xl font-black text-ink">Free Tool</h2>
            <p className="mt-2">Compress Image to 20KB is provided as a free browser-based image compression tool for images that need to be 20KB or less.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-ink">Compression Results</h2>
            <p className="mt-2">
              Compression results depend on the original file size, image format, image dimensions, visual complexity, and quality. The
              tool cannot guarantee that every image will compress under 20KB while preserving high visual quality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-ink">User Responsibility</h2>
            <p className="mt-2">
              You are responsible for the images you choose to upload into your browser and for how you use the compressed files after
              download. Do not use the tool for content you do not have the right to process or share.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-ink">Availability</h2>
            <p className="mt-2">
              We aim to keep the tool simple and reliable, but it is provided without warranties. Browser support and compression
              behavior may vary by device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-ink">Contact</h2>
            <p className="mt-2">
              For terms questions, contact us at{" "}
              <a className="font-bold text-berry hover:text-ink" href="mailto:hello@compressimageto20kb.app">
                hello@compressimageto20kb.app
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
