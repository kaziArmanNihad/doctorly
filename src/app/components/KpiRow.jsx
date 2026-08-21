import { Stethoscope, Users, Activity, CalendarPlus } from "lucide-react";
import KpiCard from "./KpiCard";

export default function KpiRow({
  totalDoctors,
  totalPatients,
  avgPerDoctor,
  newInRange,
  range,
}) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      <KpiCard icon={Stethoscope} label="Total doctors" value={totalDoctors} />
      <KpiCard icon={Users} label="Total patients" value={totalPatients} />
      <KpiCard icon={Activity} label="Avg. per doctor" value={avgPerDoctor} />
      <KpiCard
        icon={CalendarPlus}
        label={`New, last ${range}d`}
        value={newInRange}
      />
    </div>
  );
}
