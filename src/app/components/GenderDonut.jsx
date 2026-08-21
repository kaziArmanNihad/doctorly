export default function GenderDonut({ counts }) {
  const total = counts.male + counts.female + counts.other;
  const r = 40;
  const c = 2 * Math.PI * r;

  const segments = [
    { label: "Male", value: counts.male, color: "#0F3D3A" },
    { label: "Female", value: counts.female, color: "#E0A94A" },
    { label: "Other / N/A", value: counts.other, color: "#C7CDC5" },
  ].filter((s) => s.value > 0);

  let cumulative = 0;

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-28 w-28 shrink-0">
        <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="#EDEBE1"
            strokeWidth="14"
          />
          {segments.map((s) => {
            const len = (s.value / total) * c;
            const dasharray = `${len} ${c - len}`;
            const dashoffset = -cumulative;
            cumulative += len;
            return (
              <circle
                key={s.label}
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth="14"
                strokeDasharray={dasharray}
                strokeDashoffset={dashoffset}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-[18px] leading-none text-[#0F1F1B]">
            {total}
          </span>
          <span className="text-[9.5px] text-[#8A938D]">total</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {segments.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-2 text-[12px] text-[#3F4A45]"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            {s.label}
            <span className="font-mono text-[11.5px] text-[#8A938D]">
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
