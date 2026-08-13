"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Toaster } from "react-hot-toast";

import AddDoctorModal from "../components/AddDoctorModal";
import DoctorTable from "../components/DoctorTable";
import DoctorToolbar from "../components/DoctorToolbar";
import Pagination from "../components/Pagination";
import PatientsModal from "../components/PatientsModal";

import { seedDoctors } from "../utils/doctorData";
import { useDebounce } from "../hooks/useDebounce";

const PAGE_SIZE = 6;

function Doctors() {
  const [doctors, setDoctors] = useState(seedDoctors);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [specialization, setSpecialization] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [page, setPage] = useState(1);

  const [showAddDoctor, setShowAddDoctor] =
    useState(false);

  const [viewingDoctorId, setViewingDoctorId] =
    useState(null);

  /*
   * Specializations
   */
  const specializations = useMemo(() => {
    return [
      "all",
      ...new Set(
        doctors.map((doctor) => doctor.specialization)
      ),
    ];
  }, [doctors]);

  /*
   * Filter doctors
   */
  const filteredDoctors = useMemo(() => {
    const query = debouncedSearch
      .trim()
      .toLowerCase();

    return doctors.filter((doctor) => {
      const matchesSearch =
        !query ||
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialization
          .toLowerCase()
          .includes(query) ||
        doctor.hospital.toLowerCase().includes(query);

      const matchesSpecialization =
        specialization === "all" ||
        doctor.specialization === specialization;

      const matchesFrom =
        !dateFrom ||
        doctor.createdAt >= dateFrom;

      const matchesTo =
        !dateTo ||
        doctor.createdAt <= dateTo;

      return (
        matchesSearch &&
        matchesSpecialization &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [
    doctors,
    debouncedSearch,
    specialization,
    dateFrom,
    dateTo,
  ]);

  /*
   * Pagination
   */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredDoctors.length / PAGE_SIZE)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedDoctors = useMemo(() => {
    const start =
      (currentPage - 1) * PAGE_SIZE;

    return filteredDoctors.slice(
      start,
      start + PAGE_SIZE
    );
  }, [filteredDoctors, currentPage]);

  /*
   * Currently selected doctor
   */
  const viewingDoctor = useMemo(() => {
    return (
      doctors.find(
        (doctor) => doctor.id === viewingDoctorId
      ) || null
    );
  }, [doctors, viewingDoctorId]);

  /*
   * Actions
   */
  const handleCreateDoctor = (doctor) => {
    setDoctors((current) => [
      doctor,
      ...current,
    ]);

    setPage(1);
  };

  const handleAddPatient = (
    doctorId,
    patient
  ) => {
    setDoctors((current) =>
      current.map((doctor) =>
        doctor.id === doctorId
          ? {
              ...doctor,
              patients: [
                patient,
                ...doctor.patients,
              ],
            }
          : doctor
      )
    );
  };

  const handleDeletePatient = (
    doctorId,
    patientId
  ) => {
    setDoctors((current) =>
      current.map((doctor) =>
        doctor.id === doctorId
          ? {
              ...doctor,
              patients:
                doctor.patients.filter(
                  (patient) =>
                    patient.id !== patientId
                ),
            }
          : doctor
      )
    );
  };

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
        }}
      />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <PageHeader
          onAddDoctor={() =>
            setShowAddDoctor(true)
          }
        />

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

        <DoctorTable
          doctors={paginatedDoctors}
          onViewPatients={setViewingDoctorId}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredDoctors.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </main>

      <AddDoctorModal
        open={showAddDoctor}
        onClose={() =>
          setShowAddDoctor(false)
        }
        onCreate={handleCreateDoctor}
      />

      <PatientsModal
        doctor={viewingDoctor}
        onClose={() =>
          setViewingDoctorId(null)
        }
        onAddPatient={handleAddPatient}
        onDeletePatient={
          handleDeletePatient
        }
      />
    </div>
  );
}

function PageHeader({ onAddDoctor }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="font-serif-display text-[28px] font-[560] text-[#0F1F1B]">
          Doctors
        </h1>

        <p className="mt-1 text-[14px] text-[#5C6863]">
          Manage doctor records and their
          patients in one place.
        </p>
      </div>

      <button
        onClick={onAddDoctor}
        className="flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#0F3D3A] px-4 py-2.5 text-sm font-[500] text-[#F6F5F0] transition-colors hover:bg-[#0C332F]"
      >
        <Plus size={15} />
        Add doctor
      </button>
    </div>
  );
}

export default Doctors;