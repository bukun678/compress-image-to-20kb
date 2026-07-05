import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Landmark,
  Mail,
  ShieldCheck,
  UserRound,
  WandSparkles,
  Zap
} from "lucide-react";
import ImageCompressor from "@/components/ImageCompressor";

const siteUrl = "https://compressimageto20kb.app";

export const metadata: Metadata = {
  title: "Compress Image to 20KB Online - Free 20KB Image Compressor",
  description:
    "Compress image to 20KB online for free. Reduce JPG, PNG, and WebP image size to 20KB or less directly in your browser. Fast, private, colorful, and no signup required.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Compress Image to 20KB Online - Free 20KB Image Compressor",
    description:
      "Compress JPG, PNG, and WebP images to 20KB or less directly in your browser. Fast, private, colorful, and no signup required.",
    url: siteUrl,
    siteName: "Compress Image to 20KB",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Image to 20KB Online",
    description:
      "Reduce JPG, PNG, and WebP image size to 20KB or less directly in your browser."
  }
};

const useCases = [
  {
    icon: BriefcaseBusiness,
    title: "Job application photo",
    description: "Compress your profile photo to 20KB or less for online job forms.",
    color: "from-pink-50 to-rose-50 text-pink-950 border-pink-100"
  },
  {
    icon: GraduationCap,
    title: "School admission form",
    description: "Reduce student photos for school or college upload limits.",
    color: "from-sky-50 to-cyan-50 text-sky-950 border-sky-100"
  },
  {
    icon: Landmark,
    title: "Government document upload",
    description: "Make passport-style images smaller for online application portals.",
    color: "from-emerald-50 to-teal-50 text-emerald-950 border-emerald-100"
  },
  {
    icon: ClipboardCheck,
    title: "Exam registration photo",
    description: "Compress exam photos to meet strict file size requirements.",
    color: "from-amber-50 to-yellow-50 text-amber-950 border-amber-100"
  },
  {
    icon: UserRound,
    title: "Website avatar",
    description: "Create a lightweight profile image for websites and dashboards.",
    color: "from-violet-50 to-fuchsia-50 text-violet-950 border-violet-100"
  },
  {
    icon: Mail,
    title: "Email attachment",
    description: "Make images smaller before sending them by email.",
    color: "from-lime-50 to-green-50 text-lime-950 border-lime-100"
  }
];

const faqItems = [
  {
    question: "How do I compress an image to 20KB?",
    answer:
      "Upload a JPG, PNG, or WebP image, click Compress Image to 20KB or Less, and download the result when the compressed file is ready."
  },
  {
    question: "Can I compress a JPG to 20KB?",
    answer:
      "Yes. This tool can compress JPG and JPEG images to 20KB or less by adjusting image quality and, when needed, reducing dimensions."
  },
  {
    question: "Can I compress a PNG to 20KB?",
    answer:
      "Yes. You can upload PNG images. The compressor may export a WebP or JPEG result because those formats usually reach small limits like 20KB more efficiently."
  },
  {
    question: "Is my image uploaded to a server?",
    answer:
      "No. Images are processed locally in your browser. The tool does not upload or store your images on a server."
  },
  {
    question: "Why does the image quality change after compression?",
    answer:
      "A 20KB max file limit is very small, so the compressor may need to lower quality or reduce image dimensions. The goal is to stay under 20KB while keeping the result as clear as possible."
  },
  {
    question: "What if my image cannot be compressed to 20KB?",
    answer:
      "If the image cannot reach 20KB without becoming extremely small or low quality, the tool will show a clear message instead of pretending the compression worked."
  },
  {
    question: "Can I use this for job application photos?",
    answer:
      "Yes. Many job application portals ask for small profile photos, and this photo size reducer to 20KB is designed for those strict form upload limits."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="overflow-hidden">
        <section className="relative px-4 pb-16 pt-5 sm:px-6 lg:px-8">
          <div className="soft-grid pointer-events-none absolute inset-x-0 top-0 h-72" />
          <span className="confetti-piece left-[7%] top-28 bg-berry [--rotate:-14deg]" />
          <span className="confetti-piece right-[13%] top-24 bg-limepop [--rotate:12deg]" />
          <span className="confetti-piece left-[48%] top-12 bg-pool [--rotate:25deg]" />

          <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4 py-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#241b4b]">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#241b4b] text-white shadow-soft">
                <Zap className="h-5 w-5" aria-hidden="true" />
              </span>
              20KB Compressor
            </Link>
            <nav className="flex items-center gap-3 text-sm font-bold text-slate-600">
              <Link className="transition hover:text-[#d84898]" href="/privacy">
                Privacy
              </Link>
              <Link className="transition hover:text-[#d84898]" href="/terms">
                Terms
              </Link>
            </nav>
          </header>

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-9 py-8 lg:grid-cols-[0.88fr_1.12fr] lg:py-12">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/75 bg-white/72 px-4 py-2 text-sm font-extrabold text-[#5d3a8c] shadow-sm backdrop-blur">
                <WandSparkles className="h-4 w-4 text-[#d84898]" aria-hidden="true" />
                A colorful little tool for tiny image size limits.
              </p>
              <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-normal text-[#241b4b] sm:text-5xl lg:text-[4.9rem]">
                Compress Image to{" "}
                <span className="bg-[linear-gradient(90deg,#f04e98,#ff9b51,#7c63ff)] bg-clip-text text-transparent">
                  20KB
                </span>{" "}
                Online
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
                Reduce JPG, PNG, and WebP images to 20KB or less in your browser. Fast, private, colorful, and easy to use.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <HeroPill icon={ShieldCheck} label="Browser-only" />
                <HeroPill icon={BadgeCheck} label="No signup" />
                <HeroPill icon={Zap} label="Fast compression" />
              </div>
            </div>

            <ImageCompressor />
          </div>
        </section>

        <SectionShell
          eyebrow="Popular use cases"
          title="Popular Ways to Use a 20KB Image Compressor"
          description="Real upload forms can be strict. These common cases are where a focused 20KB max image compressor is useful."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {useCases.map((item) => (
              <article
                key={item.title}
                className={`rounded-[24px] border bg-gradient-to-br p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft ${item.color}`}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 shadow-sm">
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-xl font-extrabold">{item.title}</h3>
                <p className="mt-2 leading-7 opacity-80">{item.description}</p>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          eyebrow="Before and after"
          title="See How Image Compression Works"
          description="Example result. Actual output depends on your image."
        >
          <div className="rounded-[28px] border border-white/70 bg-white/72 p-4 shadow-soft backdrop-blur sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
              <ExamplePanel label="Before" value="2.4 MB" detail="original image" accent="bg-[#f04e98]" />
              <GradientArrow />
              <ExamplePanel label="After" value="19.8KB" detail="compressed image" accent="bg-[#48d9ff]" />
              <GradientArrow />
              <ExamplePanel label="Saved" value="99%" detail="smaller" accent="bg-[#82ec7a]" />
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[99%] rounded-full bg-[linear-gradient(90deg,#f04e98,#ffc95f,#48d9ff,#82ec7a)]" />
            </div>
          </div>
        </SectionShell>

        <SectionShell eyebrow="Three steps" title="How to Compress Image to 20KB or Less">
          <div className="grid gap-4 md:grid-cols-3">
            <StepCard number="1" title="Upload your image" description="Choose a JPG, PNG, or WebP image from your device." />
            <StepCard number="2" title="Click Compress Image to 20KB or Less" description="The browser adjusts quality and size locally for the 20KB max limit." />
            <StepCard number="3" title="Download the compressed image" description="Save the smaller file for forms, applications, avatars, or email." />
          </div>
        </SectionShell>

        <SectionShell
          eyebrow="Why it works"
          title="Why Use This 20KB Image Compressor"
          description="The tool is built for strict upload limits without making the workflow feel dull or confusing."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Free to use",
              "No signup required",
              "Works in your browser",
              "Supports JPG, PNG, and WebP",
              "Colorful and easy to use",
              "Useful for forms, applications, profile photos, and document uploads"
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/72 p-4 shadow-sm backdrop-blur">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" aria-hidden="true" />
                <p className="font-bold leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </SectionShell>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[28px] border border-white/70 bg-white/76 p-6 shadow-soft backdrop-blur sm:p-8">
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#d84898]">Format support</p>
            <h2 className="mt-3 text-3xl font-extrabold text-[#241b4b] sm:text-4xl">Compress JPG, PNG, and WebP to 20KB or Less</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              Many online forms require images under a strict file limit, such as 20KB. This tool helps you reduce image size to
              20KB or less directly in your browser. It is designed to be simple, colorful, and easy to use, whether you need to
              compress JPG to 20KB or less, compress PNG to 20KB or less, or create a small WebP image for a profile or document upload.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              The soft dopamine website style makes the page feel friendly, while the compressor keeps the important path clear:
              upload, compress, preview, and download.
            </p>
          </div>
        </section>

        <SectionShell eyebrow="Questions" title="FAQ">
          <div className="grid gap-3">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-white/70 bg-white/78 p-5 shadow-sm backdrop-blur">
                <summary className="cursor-pointer list-none text-lg font-extrabold text-[#241b4b] marker:hidden">
                  <span className="inline-flex w-full items-center justify-between gap-4">
                    {item.question}
                    <span className="text-2xl leading-none text-[#d84898] transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 leading-7 text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </SectionShell>
      </main>

      <footer className="border-t border-white/70 bg-white/70 px-4 py-8 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm font-semibold text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} compressimageto20kb.app</p>
          <div className="flex flex-wrap gap-4">
            <Link className="hover:text-[#d84898]" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="hover:text-[#d84898]" href="/terms">
              Terms of Use
            </Link>
            <a className="hover:text-[#d84898]" href="mailto:hello@compressimageto20kb.app">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

function HeroPill({ icon: Icon, label }: { icon: typeof ShieldCheck; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/70 px-3 py-2 font-bold text-slate-700 shadow-sm backdrop-blur">
      <Icon className="h-5 w-5 text-[#d84898]" aria-hidden="true" />
      {label}
    </div>
  );
}

function SectionShell({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 max-w-3xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#d84898]">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold text-[#241b4b] sm:text-4xl">{title}</h2>
          {description ? <p className="mt-3 text-lg leading-8 text-slate-600">{description}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function ExamplePanel({ label, value, detail, accent }: { label: string; value: string; detail: string; accent: string }) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-white/80 bg-white/80 shadow-sm backdrop-blur">
      <div className={`h-1.5 ${accent}`} />
      <div className="p-5">
        <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-slate-500">{label}</p>
        <p className="mt-3 text-4xl font-extrabold text-[#241b4b]">{value}</p>
        <p className="mt-2 font-semibold text-slate-600">{detail}</p>
      </div>
    </article>
  );
}

function GradientArrow() {
  return (
    <div className="hidden h-1 w-14 rounded-full bg-[linear-gradient(90deg,#f04e98,#ffc95f,#48d9ff)] lg:block" aria-hidden="true" />
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <article className="rounded-[24px] border border-white/70 bg-white/78 p-5 shadow-sm backdrop-blur">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#241b4b] text-lg font-extrabold text-white">{number}</span>
      <h3 className="mt-4 text-xl font-extrabold text-[#241b4b]">{title}</h3>
      <p className="mt-2 leading-7 text-slate-600">{description}</p>
    </article>
  );
}
