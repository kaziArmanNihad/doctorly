import {
  Stethoscope,
  Users,
  Search,
  BarChart3,
  ClipboardList,
  SlidersHorizontal,
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, body }) => (
  <div className="group rounded-lg border border-[#DCE3DC] bg-white p-6 transition-colors hover:border-[#0F3D3A]/30">
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#0F3D3A]/[0.06] text-[#0F3D3A]">
      <Icon size={19} strokeWidth={1.75} />
    </div>
    <h3 className="mb-1.5 text-[15px] font-[500] text-[#16241F]">{title}</h3>
    <p className="text-[13.5px] leading-relaxed text-[#5C6863]">{body}</p>
  </div>
);

function Feature() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-10 max-w-lg">
        <h2 className="font-serif-display text-[27px] font-[560] text-[#0F1F1B]">
          Built around the way admins actually work
        </h2>
        <p className="mt-3 text-[14.5px] leading-relaxed text-[#5C6863]">
          No clutter, no unnecessary clicks — just the tools needed to keep
          doctor and patient records accurate and easy to find.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon={Stethoscope}
          title="Doctor records"
          body="Add doctors with specialization, hospital, and contact details, then see their full patient list in one view."
        />
        <FeatureCard
          icon={Users}
          title="Patient management"
          body="Edit, filter, and remove patient entries from a dedicated page, with condition and date-based filters."
        />
        <FeatureCard
          icon={Search}
          title="Fast search"
          body="Indexed search across doctors and patients returns results instantly, even as records scale."
        />
        <FeatureCard
          icon={SlidersHorizontal}
          title="Smart filtering"
          body="Narrow doctor and patient lists by date range, condition, or hospital without a full page reload."
        />
        <FeatureCard
          icon={BarChart3}
          title="Live analytics"
          body="A dashboard of totals, patients-per-doctor, and date-based trends, backed by optimized aggregation queries."
        />
        <FeatureCard
          icon={ClipboardList}
          title="Clean pagination"
          body="Doctor and patient tables paginate efficiently, keeping every list quick to scan and quick to load."
        />
      </div>
    </section>
  );
}

export default Feature;
