import { Activity } from "lucide-react";

export default function DashboardHeader({
  range,
  onRangeChange,
  rangeOptions,
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#0F3D3A]/15 bg-white px-3 py-1 text-[12px] text-[#3F4A45]">
          <Activity size={13} className="text-[#0F3D3A]" />
          Live overview
        </div>
        <h1 className="font-serif-display text-[28px] font-[560] tracking-tight text-[#0F1F1B] md:text-[32px]">
          Dashboard
        </h1>
      </div>

      <div className="inline-flex rounded-full border border-[#DCE3DC] bg-white p-1">
        {rangeOptions.map((r) => (
          <button
            key={r}
            onClick={() => onRangeChange(r)}
            className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-[500] transition-colors ${
              range === r
                ? "bg-[#0F3D3A] text-[#F6F5F0]"
                : "text-[#4B564F] hover:text-[#0F3D3A]"
            }`}
          >
            {r}D
          </button>
        ))}
      </div>
    </div>
  );
}
