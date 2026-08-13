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

import { seedPatients } from "../utils/patientData";
import { useDebounce } from "../hooks/useDebounce";

const PAGE_SIZE = 7;

function Patients() {
  // State
  const [patients, setPatients] = useState(seedPatients);

  const [search, setSearch] = useState("");

  const [condition, setCondition] = useState("all");

  const [doctor, setDoctor] = useState("all");

  const [dateFrom, setDateFrom] = useState("");

  const [dateTo, setDateTo] = useState("");

  const [page, setPage] = useState(1);

  const [addingPatient, setAddingPatient] = useState(false);

  const [editingPatient, setEditingPatient] = useState(null);

  const [deletingPatient, setDeletingPatient] = useState(null);

  // Debounced Search

  const debouncedSearch = useDebounce(search, 400);

  // Filter Options

  const conditionOptions = useMemo(() => {
    const conditions = new Set(patients.map((patient) => patient.condition));

    return ["all", ...conditions];
  }, [patients]);

  const doctorOptions = useMemo(() => {
    const doctors = new Set(patients.map((patient) => patient.doctor));

    return ["all", ...doctors];
  }, [patients]);

  // Filtering

  const filteredPatients = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    return patients.filter((patient) => {
      const matchesSearch =
        !query ||
        patient.name.toLowerCase().includes(query) ||
        patient.condition.toLowerCase().includes(query) ||
        patient.doctor.toLowerCase().includes(query) ||
        patient.phone.toLowerCase().includes(query);

      const matchesCondition =
        condition === "all" || patient.condition === condition;

      const matchesDoctor = doctor === "all" || patient.doctor === doctor;

      const matchesDateFrom = !dateFrom || patient.createdAt >= dateFrom;

      const matchesDateTo = !dateTo || patient.createdAt <= dateTo;

      return (
        matchesSearch &&
        matchesCondition &&
        matchesDoctor &&
        matchesDateFrom &&
        matchesDateTo
      );
    });
  }, [patients, debouncedSearch, condition, doctor, dateFrom, dateTo]);

  // Pagination

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPatients.length / PAGE_SIZE),
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedPatients = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;

    return filteredPatients.slice(start, start + PAGE_SIZE);
  }, [filteredPatients, currentPage]);

  // Filter State

  const hasActiveFilters =
    Boolean(search) ||
    condition !== "all" ||
    doctor !== "all" ||
    Boolean(dateFrom) ||
    Boolean(dateTo);

  // Filter Handlers

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

  // Add Patient

  const handleCreatePatient = (patient) => {
    setPatients((currentPatients) => [patient, ...currentPatients]);

    setPage(1);
  };

  // Edit Patient

  const handleSavePatient = (patientId, updates) => {
    setPatients((currentPatients) =>
      currentPatients.map((patient) =>
        patient.id === patientId
          ? {
              ...patient,
              ...updates,
            }
          : patient,
      ),
    );

    setEditingPatient(null);
  };

  // Delete Patient

  const handleDeletePatient = (patientId) => {
    setPatients((currentPatients) =>
      currentPatients.filter((patient) => patient.id !== patientId),
    );

    setDeletingPatient(null);

    // Prevent staying on an empty page after deleting the last patient.

    setPage((currentPage) =>
      Math.min(
        currentPage,
        Math.max(1, Math.ceil((patients.length - 1) / PAGE_SIZE)),
      ),
    );
  };

  // Render

  return (
    <div className="w-full bg-[#F6F5F0] font-sans text-[#16241F] antialiased">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0F3D3A",
            color: "#F6F5F0",
            fontSize: "13.5px",
            borderRadius: "8px",
          },

          success: {
            iconTheme: {
              primary: "#E0A94A",
              secondary: "#0F3D3A",
            },
          },
        }}
      />

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* { Header } */}
        <PageHeader onAddPatient={() => setAddingPatient(true)} />

        {/* { Toolbar } */}
        <PatientToolbar
          search={search}
          condition={condition}
          doctor={doctor}
          conditions={conditionOptions}
          doctors={doctorOptions}
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

        {/* { Patient Table } */}
        <PatientTable
          patients={paginatedPatients}
          onEdit={setEditingPatient}
          onDelete={setDeletingPatient}
        />

        {/* { Pagination } */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredPatients.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </main>

      {/* { Add Patient } */}
      <AddPatientModal
        open={addingPatient}
        onClose={() => setAddingPatient(false)}
        onCreate={handleCreatePatient}
        doctors={doctorOptions}
        condition={condition}
      />

      {/* { Edit Patient } */}
      <EditPatientModal
        patient={editingPatient}
        onClose={() => setEditingPatient(null)}
        onSave={handleSavePatient}
      />

      {/* { Delete Patient } */}
      <DeleteConfirmModal
        patient={deletingPatient}
        onClose={() => setDeletingPatient(null)}
        onConfirm={handleDeletePatient}
      />
    </div>
  );
}

//  Page Header

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
