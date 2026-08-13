import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const StatChip = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="font-mono text-[22px] leading-none text-[#0F3D3A]">
      {value}
    </span>
    <span className="text-[11.5px] tracking-wide text-[#8A938D] uppercase">
      {label}
    </span>
  </div>
);

function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-16 md:pt-24">
      <div className="grid items-center gap-14 md:grid-cols-2">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0F3D3A]/15 bg-white px-3 py-1 text-[12px] text-[#3F4A45]">
            <ShieldCheck size={13} className="text-[#0F3D3A]" />
            Built for clinic administrators
          </div>
          <h1 className="font-serif-display text-[42px] leading-[1.08] font-[560] tracking-tight text-[#0F1F1B] md:text-[52px]">
            Every doctor. Every patient.
            <br />
            One clear record.
          </h1>
          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-[#4B564F]">
            Doctorly gives clinic admins a single, fast place to manage doctors
            and their patients — with search, filtering, and analytics that stay
            quick no matter how the records grow.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/login">
              <button className="flex items-center gap-2 rounded-md bg-[#0F3D3A] px-5 py-3 text-sm font-[500] text-[#F6F5F0] transition-colors hover:bg-[#0C332F]">
                Sign in to portal
                <ArrowRight size={15} />
              </button>
            </Link>
            <Link href="/about">
              <button className="text-sm font-[500] text-[#0F3D3A] underline decoration-[#0F3D3A]/25 underline-offset-4 hover:decoration-[#0F3D3A]">
                See how it works
              </button>
            </Link>
          </div>

          <div className="mt-12 flex gap-10 border-t border-[#E2E0D6] pt-6">
            <StatChip label="Doctors tracked" value="1,240" />
            <StatChip label="Active patients" value="18.6k" />
            <StatChip label="Avg. query time" value="42ms" />
          </div>
        </div>

        {/* Product preview card */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl border border-[#DCE3DC] bg-white shadow-[0_1px_2px_rgba(15,61,58,0.04)]">
            <div className="flex items-center gap-1.5 border-b border-[#EDEBE1] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E0A94A]/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#0F3D3A]/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#0F3D3A]/20" />
              <span className="ml-3 text-[11.5px] text-[#8A938D]">
                doctorly.app/dashboard
              </span>
            </div>
            <div className="p-5">
              <div className="mb-5 grid grid-cols-3 gap-3">
                {[
                  ["Doctors", "1,240"],
                  ["Patients", "18,600"],
                  ["This week", "+312"],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    className="rounded-md bg-[#F6F5F0] px-3 py-2.5"
                  >
                    <div className="font-mono text-[15px] text-[#0F3D3A]">
                      {val}
                    </div>
                    <div className="text-[10.5px] text-[#8A938D]">{label}</div>
                  </div>
                ))}
              </div>

              <div className="mb-4 flex items-end gap-1.5">
                {[38, 52, 44, 61, 49, 70, 58, 64, 45, 73, 55, 40].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-[#0F3D3A]/80"
                      style={{
                        height: `${h}px`,
                        opacity: 0.35 + (h / 73) * 0.55,
                      }}
                    />
                  ),
                )}
              </div>

              {[
                ["Dr. Amina Rahman", "Cardiology · Green Valley Hospital"],
                ["Dr. Samuel Osei", "Pediatrics · Riverside Clinic"],
              ].map(([name, meta]) => (
                <div
                  key={name}
                  className="flex items-center justify-between border-t border-[#EDEBE1] py-2.5 text-[13px]"
                >
                  <span className="text-[#16241F]">{name}</span>
                  <span className="text-[#8A938D]">{meta}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -top-4 -right-4 -z-10 hidden h-full w-full rounded-xl bg-[#0F3D3A]/[0.04] md:block" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
