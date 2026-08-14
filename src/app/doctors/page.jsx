"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Toaster } from "react-hot-toast";

import AddDoctorModal from "../components/AddDoctorModal";
import DoctorTable from "../components/DoctorTable";
import DoctorToolbar from "../components/DoctorToolbar";
import Pagination from "../components/Pagination";
import PatientsModal from "../components/PatientsModal";

import { useDebounce } from "../hooks/useDebounce";
import {
  useDoctors,
  useCreateDoctor,
  useDoctorPatients,
  useAddPatientToDoctor,
  useDeletePatientFromDoctor,
} from "../hooks/useDoctors";

const PAGE_SIZE = 6;

export default function Doctors() {
  //  Filters
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [specialization, setSpecialization] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [page, setPage] = useState(1);

  //  Modals
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [viewingDoctorId, setViewingDoctorId] = useState(null);

  //  Get doctors
  const { data, isLoading, isError, error } = useDoctors({
    search: debouncedSearch,
    specialization: specialization === "all" ? "" : specialization,
    dateFrom,
    dateTo,
    page,
    limit: PAGE_SIZE,
  });

  const doctors = useMemo(() => data?.data ?? [], [data?.data]);
  const totalItems = data?.meta?.total ?? 0;
  const totalPages = data?.meta?.totalPages ?? 1;

  //  Create doctor
  const createDoctor = useCreateDoctor();

  const handleCreateDoctor = async (doctorData) => {
    await createDoctor.mutateAsync(doctorData);

    setShowAddDoctor(false);
    setPage(1);
  };

  //  Selected doctor
  const viewingDoctor = useMemo(() => {
    return doctors.find((doctor) => doctor._id === viewingDoctorId);
  }, [doctors, viewingDoctorId]);

  //  Get doctor patients
  const { data: patientsData, isLoading: patientsLoading } =
    useDoctorPatients(viewingDoctorId);

  //  Add patient
  const addPatient = useAddPatientToDoctor(viewingDoctorId);

  const handleAddPatient = async (patientData) => {
    await addPatient.mutateAsync(patientData);
  };

  //  Delete patient
  const deletePatient = useDeletePatientFromDoctor(viewingDoctorId);

  const handleDeletePatient = async (patientId) => {
    await deletePatient.mutateAsync(patientId);
  };

  //  Reset filters
  const handleResetFilters = () => {
    setSearch("");
    setSpecialization("all");
    setDateFrom("");
    setDateTo("");
    setPage(1);
  };

  const hasFilters =
    Boolean(search) ||
    specialization !== "all" ||
    Boolean(dateFrom) ||
    Boolean(dateTo);

  //  Specializations
  const specializations = useMemo(() => {
    return [
      "all",
      ...new Set(
        doctors.map((doctor) => doctor.specialization).filter(Boolean),
      ),
    ];
  }, [doctors]);

  //  Loading
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-[#5C6863]">Loading doctors...</p>
      </div>
    );
  }

  //  Error
  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif-display text-xl font-medium text-[#0F1F1B]">
            Failed to load doctors
          </h2>

          <p className="mt-2 text-sm text-[#5C6863]">
            {error?.response?.data?.message ||
              "Something went wrong while loading doctors."}
          </p>
        </div>
      </div>
    );
  }

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
        }}
      />

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <PageHeader onAddDoctor={() => setShowAddDoctor(true)} />

        {/* Filters */}
        <DoctorToolbar
          search={search}
          specialization={specialization}
          specializations={specializations}
          dateFrom={dateFrom}
          dateTo={dateTo}
          hasFilters={hasFilters}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          onSpecializationChange={(value) => {
            setSpecialization(value);
            setPage(1);
          }}
          onDateFromChange={(value) => {
            setDateFrom(value);
            setPage(1);
          }}
          onDateToChange={(value) => {
            setDateTo(value);
            setPage(1);
          }}
          onReset={handleResetFilters}
        />

        {/* Doctors */}
        <DoctorTable doctors={doctors} onViewPatients={setViewingDoctorId} />

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </main>

      {/* Add Doctor */}
      <AddDoctorModal
        open={showAddDoctor}
        onClose={() => setShowAddDoctor(false)}
        onCreate={handleCreateDoctor}
        loading={createDoctor.isPending}
      />

      {/* Patients */}
      <PatientsModal
        doctor={
          viewingDoctor
            ? {
                ...viewingDoctor,
                patients: patientsData?.patients ?? [],
              }
            : null
        }
        loading={patientsLoading}
        onClose={() => setViewingDoctorId(null)}
        onAddPatient={handleAddPatient}
        onDeletePatient={handleDeletePatient}
      />
    </div>
  );
}

//  Page Header
function PageHeader({ onAddDoctor }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="font-serif-display text-[28px] font-[560] text-[#0F1F1B]">
          Doctors
        </h1>

        <p className="mt-1 text-[14px] text-[#5C6863]">
          Manage doctor records and their patients in one place.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddDoctor}
        className="flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#0F3D3A] px-4 py-2.5 text-sm font-[500] text-[#F6F5F0] transition-colors hover:bg-[#0C332F]"
      >
        <Plus size={15} />
        Add doctor
      </button>
    </div>
  );
}
