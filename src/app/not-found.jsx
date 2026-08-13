import { Activity, ArrowRight, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-[#F6F5F0] font-sans text-[#16241F] antialiased">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(15,61,58,0.08)]">
          {/* BRAND PANEL */}
          <section className="relative hidden min-h-[560px] w-[42%] flex-col justify-between overflow-hidden bg-[#0F3D3A] px-10 py-12 text-[#F6F5F0] lg:flex" />

          {/* Logo */}
          <Link
            href="/"
            className="relative flex w-fit items-center gap-2"
            aria-label="Doctorly home"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F6F5F0]/10">
              <Activity size={15} strokeWidth={2} />
            </div>

            <span className="font-serif-display text-[19px] font-[560] tracking-tight">
              Doctorly
            </span>
          </Link>

          {/* Message */}
          <div className="relative max-w-sm">
            <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-[#9FB3AC]">
              Error 404
            </p>

            <h2 className="font-serif-display text-[30px] font-[560] leading-tight">
              Looks like this record doesn&apos;t exist.
            </h2>

            <p className="mt-4 text-[14px] leading-relaxed text-[#DCE7E3]">
              The page you&apos;re looking for may have been moved, removed, or
              the address might be incorrect.
            </p>
          </div>

          {/* Copyright */}
          <p className="relative text-[12px] text-[#9FB3AC]">
            © {new Date().getFullYear()} Doctorly. All rights reserved.
          </p>

          {/* CONTENT PANEL  */}
          <section className="flex min-h-[560px] flex-1 items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
            <div className="w-full max-w-md text-center">
              {/* 404 */}
              <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-[#F6F5F0]">
                <div className="absolute inset-3 rounded-full border border-[#DCE3DC]" />

                <span className="font-serif-display text-[52px] font-[560] tracking-tight text-[#0F3D3A]">
                  404
                </span>
              </div>

              {/* Label */}
              <p className="mb-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[#8A938D]">
                Page not found
              </p>

              {/* Heading */}
              <h1 className="font-serif-display text-[32px] font-[560] leading-tight text-[#0F1F1B] sm:text-[36px]">
                We couldn&apos;t find that page
              </h1>

              {/* Description */}
              <p className="mx-auto mt-4 max-w-sm text-[14px] leading-relaxed text-[#5C6863]">
                The page may no longer exist or the URL may be incorrect.
                Let&apos;s get you back to somewhere useful.
              </p>

              {/* Actions */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-[#0F3D3A] px-5 py-3 text-sm font-medium text-[#F6F5F0] transition-all hover:bg-[#0C332F] active:scale-[0.99] sm:w-auto"
                >
                  <Home size={16} />
                  Go to Home
                </Link>

                <Link
                  href="/"
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DCE3DC] bg-white px-5 py-3 text-sm font-medium text-[#16241F] transition-all hover:bg-[#F6F5F0] active:scale-[0.99] sm:w-auto"
                >
                  <ArrowRight size={16} />
                  Back to Dashboard
                </Link>
              </div>

              {/* Help text */}
              <p className="mt-8 text-[12px] text-[#8A938D]">
                If you believe this is an error, please contact your
                administrator.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
