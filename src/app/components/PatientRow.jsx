import { Pencil, Stethoscope, Trash2, User } from "lucide-react";
import { memo } from "react";

const PatientRow = memo(function PatientRow({ patient, onEdit, onDelete }) {
  return (
    <tr className="border-b border-[#EDEBE1] last:border-0 hover:bg-[#F6F5F0]/60">
      {/* Patient */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0F3D3A]/[0.06] text-[#0F3D3A]">
            <User size={14} />
          </div>

          <div>
            <div className="text-[14px] text-[#16241F]">{patient.name}</div>

            <div className="text-[12px] text-[#8A938D]">
              Age {patient.age} · {patient.phone}
            </div>
          </div>
        </div>
      </td>

      {/* Condition */}
      <td className="px-5 py-3.5">
        <span className="inline-flex rounded-full bg-[#0F3D3A]/[0.06] px-2.5 py-1 text-[12px] text-[#0F3D3A]">
          {patient.condition}
        </span>
      </td>

      {/* Doctor */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-1.5 text-[13px] text-[#4B564F]">
          <Stethoscope size={13} className="text-[#8A938D]" />

          {patient.doctor}
        </div>
      </td>

      {/* Date */}
      <td className="px-5 py-3.5">
        <span className="font-mono text-[12.5px] text-[#5C6863]">
          {patient.createdAt}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-3.5">
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(patient)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#5C6863] transition-colors hover:bg-[#0F3D3A]/[0.06] hover:text-[#0F3D3A]"
            aria-label={`Edit ${patient.name}`}
          >
            <Pencil size={14} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(patient)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#B3432D] transition-colors hover:bg-[#B3432D]/10"
            aria-label={`Delete ${patient.name}`}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
});

export default PatientRow;
