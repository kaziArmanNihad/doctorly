import { Quote } from "lucide-react";

function AboutStory() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <span className="text-[12px] font-[500] tracking-wide text-[#0F3D3A] uppercase">
            Why we built this
          </span>
          <h2 className="font-serif-display mt-3 text-[26px] font-[560] text-[#0F1F1B]">
            A patient&#39;s history shouldn&#39;t depend on who&#39;s on shift
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-[#5C6863]">
            Clinics were tracking patients across notebooks, shared
            spreadsheets, and memory. A condition noted in one visit would
            quietly disappear by the next. Doctorly started as a simple
            question: what would it take for every doctor in a clinic to see a
            patient&#39;s full, accurate picture in seconds — and for every
            patient to trust that picture was being kept safe?
          </p>
          <p className="mt-4 text-[14.5px] leading-relaxed text-[#5C6863]">
            That question became a single, secure system where doctor records
            and patient records live side by side, searchable, current, and
            protected behind proper authentication — not scattered across tools
            that were never built for care.
          </p>
        </div>

        <div className="rounded-xl border border-[#DCE3DC] bg-white p-7">
          <Quote size={22} className="text-[#E0A94A]" />
          <p className="font-serif-display mt-4 text-[19px] leading-snug text-[#16241F]">
            A patient shouldn&#39;t have to repeat their own history because the
            last clinic&#39;s notes never made it to this one.
          </p>
          <p className="mt-4 text-[13px] text-[#8A938D]">
            The idea that shaped Doctorly&#39;s first version
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutStory;
