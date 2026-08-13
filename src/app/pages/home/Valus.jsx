import { LockKeyhole, Clock, Users, Stethoscope } from "lucide-react";

const ValueCard = ({ icon: Icon, title, body }) => (
  <div className="rounded-lg border border-[#DCE3DC] bg-white p-6">
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-[#0F3D3A]/[0.06] text-[#0F3D3A]">
      <Icon size={19} strokeWidth={1.75} />
    </div>
    <h3 className="mb-1.5 text-[15px] font-[500] text-[#16241F]">{title}</h3>
    <p className="text-[13.5px] leading-relaxed text-[#5C6863]">{body}</p>
  </div>
);

function AboutValus() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-10 max-w-lg">
        <h2 className="font-serif-display text-[27px] font-[560] text-[#0F1F1B]">
          What we hold ourselves to
        </h2>
        <p className="mt-3 text-[14.5px] leading-relaxed text-[#5C6863]">
          These are the standards patients are trusting us to meet every time a
          record is opened.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ValueCard
          icon={LockKeyhole}
          title="Records stay protected"
          body="Every route sits behind authentication. Only the clinic staff a patient sees in person can reach their file."
        />
        <ValueCard
          icon={Clock}
          title="Nothing gets delayed"
          body="Search and filtering are built to stay fast as records grow, so a patient's history is never a bottleneck."
        />
        <ValueCard
          icon={Stethoscope}
          title="Doctors see the full picture"
          body="Every patient record is tied clearly to their doctor and history, not split across disconnected tools."
        />
        <ValueCard
          icon={Users}
          title="Built with clinics, not just for them"
          body="Every feature started as a real request from the admins and doctors who use Doctorly daily."
        />
      </div>
    </section>
  );
}

export default AboutValus;
