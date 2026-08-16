import { Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import AddPatientModal from "./AddPatientModal";

function PatientsModal({
  doctor,
  patients = [],
  doctors = [],
  loading = false,
  onClose,
  onAddPatient,
  onDeletePatient,
}) {
  const [showAddPatient, setShowAddPatient] = useState(false);

  if (!doctor) return null;

  // Use patients prop if available.
  // Otherwise use patients from the selected doctor.
  const doctorPatients = doctor.patients || [];

  const patientList = patients.length > 0 ? patients : doctorPatients;

  const handleDelete = async (patient) => {
    try {
      await onDeletePatient(patient._id);

      toast.success(`${patient.name} removed from patient list.`);
    } catch (error) {
      toast.error("Failed to remove patient.");
      console.error(error);
    }
  };

  const handlePatientCreated = async (patient) => {
    try {
      await onAddPatient(patient);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add patient.");
    }
  };

  const handleClose = () => {
    setShowAddPatient(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#0F1F1B]/40 px-4">
        <div className="max-h-[85vh] w-full max-w-lg overflow-hidden rounded-xl bg-[#F6F5F0] shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E2E0D6] px-6 py-5">
            <div>
              <h2 className="font-serif-display text-[19px] font-[560] text-[#0F1F1B]">
                {doctor.name}&apos;s patients
              </h2>

              <p className="text-[12.5px] text-[#8A938D]">
                {patientList.length}{" "}
                {patientList.length === 1 ? "patient" : "patients"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="text-[#8A938D] transition-colors hover:text-[#0F3D3A]"
              aria-label="Close patients modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Patient List */}
          <div className="max-h-[50vh] overflow-y-auto px-6 py-4">
            {loading ? (
              <p className="py-8 text-center text-sm text-[#8A938D]">
                Loading patients...
              </p>
            ) : patientList.length === 0 ? (
              <EmptyPatients />
            ) : (
              <PatientList patients={patientList} onDelete={handleDelete} />
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-[#E2E0D6] px-6 py-4">
            <button
              type="button"
              onClick={() => setShowAddPatient(true)}
              className="flex items-center gap-2 rounded-md bg-[#0F3D3A] px-4 py-2.5 text-sm font-[500] text-[#F6F5F0] transition-colors hover:bg-[#0C332F]"
            >
              <Plus size={15} />
              Add patient
            </button>
          </div>
        </div>
      </div>

      <AddPatientModal
        open={showAddPatient}
        onClose={() => setShowAddPatient(false)}
        onCreate={handlePatientCreated}
        doctors={doctors}
        defaultDoctorId={doctor._id}
      />
    </>
  );
}

function PatientList({ patients, onDelete }) {
  return (
    <div className="flex flex-col divide-y divide-[#E2E0D6]">
      {patients.map((patient) => (
        <PatientRow key={patient._id} patient={patient} onDelete={onDelete} />
      ))}
    </div>
  );
}

function PatientRow({ patient, onDelete }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <div className="truncate text-[14px] text-[#16241F]">
          {patient.name}
        </div>

        <div className="text-[12.5px] text-[#8A938D]">
          Age {patient.age}
          {" · "}
          {patient.condition}
          {" · "}
          Added{" "}
          {patient.createdAt
            ? new Date(patient.createdAt).toLocaleDateString()
            : "—"}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onDelete(patient)}
        className="shrink-0 rounded-md p-2 text-[#B3432D] transition-colors hover:bg-[#B3432D]/10"
        aria-label={`Remove ${patient.name}`}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

function EmptyPatients() {
  return (
    <div className="py-8 text-center">
      <p className="text-[13.5px] text-[#8A938D]">
        No patients under this doctor yet.
      </p>

      <p className="mt-1 text-[12px] text-[#A6AEA8]">
        Add a patient to get started.
      </p>
    </div>
  );
}

export default PatientsModal;
