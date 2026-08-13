import { Building2, Mail, Phone, Stethoscope, Users } from "lucide-react";
import { memo } from "react";

const DoctorRow = memo(function DoctorRow({ doctor, onViewPatients }) {
  return (
    <tr className="border-b border-[#EDEBE1] last:border-0 hover:bg-[#F6F5F0]/60">
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0F3D3A]/[0.06] text-[#0F3D3A]">
            <Stethoscope size={14} />
          </div>

          <div>
            <div className="text-[14px] text-[#16241F]">{doctor.name}</div>

            <div className="text-[12px] text-[#8A938D]">
              {doctor.specialization}
            </div>
          </div>
        </div>
      </td>

      <td className="px-5 py-3.5">
        <div className="flex items-center gap-1.5 text-[13px] text-[#4B564F]">
          <Building2 size={13} className="text-[#8A938D]" />
          {doctor.hospital}
        </div>
      </td>

      <td className="px-5 py-3.5">
        <div className="flex flex-col gap-1 text-[12.5px] text-[#4B564F]">
          <span className="flex items-center gap-1.5">
            <Phone size={12} className="text-[#8A938D]" />
            {doctor.phone}
          </span>

          <span className="flex items-center gap-1.5">
            <Mail size={12} className="text-[#8A938D]" />
            {doctor.email}
          </span>
        </div>
      </td>

      <td className="px-5 py-3.5">
        <span className="font-mono text-[13px] text-[#0F3D3A]">
          {doctor.patients.length}
        </span>
      </td>

      <td className="px-5 py-3.5 text-right">
        <button
          onClick={() => onViewPatients(doctor.id)}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#DCE3DC] px-3 py-1.5 text-[12.5px] font-[500] text-[#0F3D3A] transition-colors hover:bg-[#0F3D3A] hover:text-[#F6F5F0]"
        >
          <Users size={13} />
          View patients
        </button>
      </td>
    </tr>
  );
});

export default DoctorRow;
