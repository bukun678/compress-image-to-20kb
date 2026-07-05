import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Compress Image to 20KB. Images are processed locally in your browser and are not uploaded or stored.",
  alternates: {
    canonical: "/privacy"
  }
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl rounded-lg border border-white/70 bg-white/78 p-6 shadow-soft backdrop-blur sm:p-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-berry hover:text-ink">
          ← Back to compressor
        </Link>
        <div className="mt-8 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
            <ShieldCheck className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="text-4xl font-black text-ink">Privacy Policy</h1>
        </div>
        <p className="mt-4 leading-7 text-slate-700">Last updated: July 5, 2026</p>

        <div className="mt-8 space-y-7 leading-8 text-slate-800">
          <section>
            <h2 className="text-2xl font-black text-ink">Local Image Processing</h2>
            <p className="mt-2">
              Images are processed locally in your browser. When you use the compressor, your image file stays on your device and is
              handled by browser-based canvas tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-ink">No Image Uploads or Storage</h2>
            <p className="mt-2">
              We do not upload, save, review, or store user images. The compressed output is created in your browser for you to
              download directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-ink">No Account Required</h2>
            <p className="mt-2">
              You do not need to create an account, sign in, or provide personal information to compress an image to 20KB or less.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-ink">Analytics</h2>
            <p className="mt-2">
              Basic analytics may be used in the future to understand page performance and usage patterns. No personal image data is
              collected through analytics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-ink">Contact</h2>
            <p className="mt-2">
              For privacy questions, contact us at{" "}
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
