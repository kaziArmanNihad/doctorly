import GenderDonut from "./GenderDonut";
import EmptyNote from "./EmptyNote";

export default function GenderSplitCard({ gender, totalPatients }) {
  return (
    <div className="rounded-xl border border-[#DCE3DC] bg-white p-6">
      <div className="mb-5 text-[11.5px] uppercase tracking-wide text-[#8A938D]">
        Gender split
      </div>
      {totalPatients === 0 ? (
        <EmptyNote text="No data yet." />
      ) : (
        <GenderDonut counts={gender} />
      )}
    </div>
  );
}
