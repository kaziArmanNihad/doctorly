import { ArrowRight } from "lucide-react";

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col items-start justify-between gap-6 rounded-xl bg-[#0F3D3A] px-8 py-10 text-[#F6F5F0] md:flex-row md:items-center">
        <div>
          <h3 className="font-serif-display text-[24px] font-[560]">
            Sign in to your Doctorly portal
          </h3>
          <p className="mt-2 max-w-md text-[14px] text-[#DCE7E3]">
            Authenticated access only. Reach out to your administrator if you
            need an account.
          </p>
        </div>
        <button className="flex shrink-0 items-center gap-2 rounded-md bg-[#E0A94A] px-5 py-3 text-sm font-[500] text-[#3A2A08] transition-colors hover:bg-[#D49B36]">
          Go to login
          <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}

export default CTA;
