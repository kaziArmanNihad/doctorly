import { ShieldCheck } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F6F5F0]">
      {/* faint grid texture, echoes the dashboard preview card */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(#0F3D3A08 1px, transparent 1px), linear-gradient(90deg, #0F3D3A08 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative flex flex-col items-center">
        {/* mark */}
        <div className="relative mb-7 flex h-16 w-16 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-[#0F3D3A]/15" />
          <span className="absolute inset-0 animate-[spin_1.6s_linear_infinite] rounded-full border-2 border-transparent border-t-[#0F3D3A] border-r-[#0F3D3A]/40" />
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F3D3A]">
            <ShieldCheck
              size={19}
              className="text-[#F6F5F0]"
              strokeWidth={2.1}
            />
          </div>
        </div>

        <div className="mb-1 font-serif-display text-[19px] font-[560] tracking-tight text-[#0F1F1B]">
          Doctorly
        </div>
        <div className="mb-8 text-[12.5px] text-[#8A938D]">
          Preparing your workspace
        </div>
      </div>

      {/* footer chip, matches hero's pill */}
      <div className="absolute bottom-10 inline-flex items-center gap-2 rounded-full border border-[#0F3D3A]/15 bg-white px-3 py-1 text-[11.5px] text-[#3F4A45]">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0F3D3A]/50" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0F3D3A]" />
        </span>
        Secure clinic connection
      </div>
    </div>
  );
}
