import BarRow from "./BarRow";
import EmptyNote from "./EmptyNote";

export default function TopConditionsCard({ conditions }) {
  const max = Math.max(1, ...conditions.map((c) => c.count));

  return (
    <div className="rounded-xl border border-[#DCE3DC] bg-white p-6">
      <div className="mb-4 text-[11.5px] uppercase tracking-wide text-[#8A938D]">
        Top conditions
      </div>
      {conditions.length === 0 ? (
        <EmptyNote text="No conditions recorded yet." />
      ) : (
        <div className="space-y-3">
          {conditions.map((c) => (
            <BarRow
              key={c.condition}
              label={c.condition}
              value={c.count}
              max={max}
            />
          ))}
        </div>
      )}
    </div>
  );
}
