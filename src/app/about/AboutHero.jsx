import { HeartHandshake } from "lucide-react";

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

function AboutHero() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-16 pb-14 text-center md:pt-24">
      <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[#0F3D3A]/15 bg-white px-3 py-1 text-[12px] text-[#3F4A45]">
        <HeartHandshake size={13} className="text-[#0F3D3A]" />
        About Doctorly
      </div>
      <h1 className="font-serif-display text-[38px] leading-[1.12] font-[560] tracking-tight text-[#0F1F1B] md:text-[48px]">
        Behind every record
        <br className="hidden md:block" /> is a patient we take seriously
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-[#4B564F]">
        Doctorly exists so the details a doctor needs about a patient — and the
        details a patient trusts a clinic to keep safe — never get lost between
        a spreadsheet, a sticky note, and a filing cabinet.
      </p>

      <div className="mt-12 flex justify-center gap-10 border-t border-[#E2E0D6] pt-6">
        <StatChip label="Patients tracked" value="18.6k" />
        <StatChip label="Partner clinics" value="64" />
        <StatChip label="Avg. lookup time" value="42ms" />
      </div>
    </section>
  );
}

export default AboutHero;
