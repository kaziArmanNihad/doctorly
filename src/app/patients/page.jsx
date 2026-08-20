"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Toaster } from "react-hot-toast";

import AddPatientModal from "../components/AddPatientModal";
import EditPatientModal from "../components/EditPatientModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import PatientToolbar from "../components/PatientToolbar";
import PatientTable from "../components/PatientTable";
import Pagination from "../components/Pagination";

import { useDebounce } from "../hooks/useDebounce";
import {
  usePatients,
  useCreatePatient,
  useUpdatePatient,
  useDeletePatient,
} from "../hooks/usePatients";
import { useDoctors } from "../hooks/useDoctors";

const PAGE_SIZE = 7;

function Patients() {
  // Filter / pagination state (sent to the server, not applied client-side)
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState("all");
  const [doctor, setDoctor] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);

  const [addingPatient, setAddingPatient] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [deletingPatient, setDeletingPatient] = useState(null);

  const debouncedSearch = useDebounce(search, 400);

  // Build query params for the backend — it already supports all of this filtering
  const queryParams = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      condition: condition !== "all" ? condition : undefined,
      doctor: doctor !== "all" ? doctor : undefined,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      page,
      limit: PAGE_SIZE,
    }),
    [debouncedSearch, condition, doctor, dateFrom, dateTo, page],
  );

  const { data, isLoading, isError } = usePatients(queryParams);
  const { data: doctorsData } = useDoctors({ limit: 100 });
  const doctors = useMemo(() => doctorsData?.data ?? [], [doctorsData?.data]);

  const createPatient = useCreatePatient();
  const updatePatient = useUpdatePatient();
  const deletePatient = useDeletePatient();

  const patients = useMemo(() => data?.data ?? [], [data?.data]);
  const meta = data?.meta ?? { total: 0, totalPages: 1 };

  // Resolve doctor ObjectId -> readable name for the table and filter dropdown
  const doctorNameById = useMemo(() => {
    const map = new Map();
    doctors.forEach((d) => map.set(d._id, d.name));
    return map;
  }, [doctors]);

  const patientsWithDoctorName = useMemo(
    () =>
      patients.map((p) => ({
        ...p,
        doctorName: doctorNameById.get(p.doctor) || "Unassigned",
      })),
    [patients, doctorNameById],
  );

  const doctorOptions = useMemo(
    () => [
      { value: "all", label: "All doctors" },
      ...doctors.map((d) => ({ value: d._id, label: d.name })),
    ],
    [doctors],
  );

  const conditionOptions = useMemo(() => {
    const conditions = new Set(patients.map((p) => p.condition));
    return ["all", ...conditions];
  }, [patients]);

  const hasActiveFilters =
    Boolean(search) ||
    condition !== "all" ||
    doctor !== "all" ||
    Boolean(dateFrom) ||
    Boolean(dateTo);

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };
  const handleConditionChange = (value) => {
    setCondition(value);
    setPage(1);
  };
  const handleDoctorChange = (value) => {
    setDoctor(value);
    setPage(1);
  };
  const handleDateFromChange = (value) => {
    setDateFrom(value);
    setPage(1);
  };
  const handleDateToChange = (value) => {
    setDateTo(value);
    setPage(1);
  };
  const resetFilters = () => {
    setSearch("");
    setCondition("all");
    setDoctor("all");
    setDateFrom("");
    setDateTo("");
    setPage(1);
  };

  const handleCreatePatient = (patient) => {
    return createPatient.mutateAsync(patient).then(() => {
      setPage(1);
    });
  };

  const handleSavePatient = (patientId, updates) => {
    return updatePatient.mutateAsync({ id: patientId, ...updates });
  };

  const handleDeletePatient = (patientId) => {
    deletePatient.mutate(patientId, {
      onSuccess: () => setDeletingPatient(null),
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#F6F5F0] font-sans text-[#16241F] antialiased">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0F3D3A",
            color: "#F6F5F0",
            fontSize: "13.5px",
            borderRadius: "8px",
          },
          success: { iconTheme: { primary: "#E0A94A", secondary: "#0F3D3A" } },
        }}
      />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <PageHeader onAddPatient={() => setAddingPatient(true)} />

        <PatientToolbar
          search={search}
          condition={condition}
          doctor={doctor}
          conditions={conditionOptions}
          doctors={doctorOptions}
          doctorNameById={doctorNameById}
          dateFrom={dateFrom}
          dateTo={dateTo}
          hasFilters={hasActiveFilters}
          onSearchChange={handleSearchChange}
          onConditionChange={handleConditionChange}
          onDoctorChange={handleDoctorChange}
          onDateFromChange={handleDateFromChange}
          onDateToChange={handleDateToChange}
          onReset={resetFilters}
        />

        {isLoading ? (
          <p className="py-10 text-center text-[13.5px] text-[#5C6863]">
            Loading patients…
          </p>
        ) : isError ? (
          <p className="py-10 text-center text-[13.5px] text-red-600">
            Couldn&#39;t load patients.
          </p>
        ) : (
          <>
            <PatientTable
              patients={patientsWithDoctorName}
              onEdit={setEditingPatient}
              onDelete={setDeletingPatient}
            />

            <Pagination
              currentPage={meta.page ?? page}
              totalPages={meta.totalPages}
              totalItems={meta.total}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </>
        )}
      </main>

      <AddPatientModal
        open={addingPatient}
        onClose={() => setAddingPatient(false)}
        onCreate={handleCreatePatient}
        doctors={doctors}
        condition={condition}
      />

      <EditPatientModal
        patient={editingPatient}
        onClose={() => setEditingPatient(null)}
        onSave={handleSavePatient}
        doctors={doctors}
      />

      <DeleteConfirmModal
        patient={deletingPatient}
        onClose={() => setDeletingPatient(null)}
        onConfirm={handleDeletePatient}
      />
    </div>
  );
}

function PageHeader({ onAddPatient }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <h1 className="font-serif-display text-[28px] font-[560] text-[#0F1F1B]">
          Patients
        </h1>
        <p className="mt-1 text-[14px] text-[#5C6863]">
          Every patient across all doctors, in one searchable list.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddPatient}
        className="flex shrink-0 items-center gap-2 rounded-md bg-[#0F3D3A] px-4 py-2.5 text-[13.5px] font-[500] text-[#F6F5F0] transition-colors hover:bg-[#0C332F]"
      >
        <Plus size={15} />
        Add patient
      </button>
    </div>
  );
}

export default Patients;
