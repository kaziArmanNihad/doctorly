import BarRow from "@/app/components/BarRow";
import EmptyNote from "@/app/components/EmptyNote";

export default function PatientsPerDoctorCard({ perDoctor }) {
  const max = Math.max(1, ...perDoctor.map((d) => d.count));

  return (
    <div className="rounded-xl border border-[#DCE3DC] bg-white p-6 md:col-span-3">
      <div className="mb-5 text-[11.5px] uppercase tracking-wide text-[#8A938D]">
        Patients per doctor
      </div>
      {perDoctor.length === 0 ? (
        <EmptyNote text="Add a doctor to see this breakdown." />
      ) : (
        <div className="space-y-3.5">
          {perDoctor.slice(0, 10).map((d) => (
            <BarRow key={d.id} label={d.name} value={d.count} max={max} />
          ))}
        </div>
      )}
    </div>
  );
}
