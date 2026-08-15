import PatientRow from "./PatientRow";

function PatientTable({ patients, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#DCE3DC] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b border-[#E2E0D6] bg-[#F6F5F0]">
              <TableHeader>Patient</TableHeader>

              <TableHeader>Condition</TableHeader>

              <TableHeader>Doctor</TableHeader>

              <TableHeader>Added</TableHeader>

              <TableHeader />
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <PatientRow
                key={patient._id}
                patient={patient}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

            {patients.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-[13.5px] text-[#8A938D]"
                >
                  No patients match your filters.
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

export default PatientTable;
