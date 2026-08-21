export default function BarRow({ label, value, max }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span
        className="w-32 shrink-0 truncate text-[12.5px] text-[#3F4A45]"
        title={label}
      >
        {label}
      </span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#EDEBE1]">
        <div
          className="h-full rounded-full bg-[#0F3D3A]"
          style={{ width: `${pct}%`, opacity: 0.4 + (pct / 100) * 0.6 }}
        />
      </div>
      <span className="w-6 shrink-0 text-right font-mono text-[12px] text-[#0F3D3A]">
        {value}
      </span>
    </div>
  );
}
