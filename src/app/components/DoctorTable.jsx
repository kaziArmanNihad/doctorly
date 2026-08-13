import DoctorRow from "./DoctorRow";

function DoctorTable({ doctors, onViewPatients }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#DCE3DC] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-[#E2E0D6] bg-[#F6F5F0]">
              <TableHeader>Doctor</TableHeader>
              <TableHeader>Hospital</TableHeader>
              <TableHeader>Contact</TableHeader>
              <TableHeader>Patients</TableHeader>
              <TableHeader />
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => (
              <DoctorRow
                key={doctor.id}
                doctor={doctor}
                onViewPatients={onViewPatients}
              />
            ))}

            {doctors.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-[13.5px] text-[#8A938D]"
                >
                  No doctors match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableHeader({ children }) {
  return (
    <th className="px-5 py-3 text-[11.5px] font-[500] uppercase tracking-wide text-[#8A938D]">
      {children}
    </th>
  );
}

export default DoctorTable;