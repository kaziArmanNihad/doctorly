export default function KpiCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-[#DCE3DC] bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11.5px] uppercase tracking-wide text-[#8A938D]">
          {label}
        </span>
        <Icon size={15} className="text-[#0F3D3A]/50" />
      </div>
      <div className="font-mono text-[28px] leading-none text-[#0F1F1B]">
        {value}
      </div>
    </div>
  );
}
