"use client";

import { useMemo, useState } from "react";
import { useDoctors } from "@/app/hooks/useDoctors";
import { usePatients } from "@/app/hooks/usePatients";
import {
  patientsPerDoctor,
  genderSplit,
  topConditions,
} from "@/app/hooks/useDashboard";

import DashboardHeader from "@/app/components/DashboardHeader";
import DashboardSkeleton from "@/app/components/DashboardSkeleton";
import DashboardError from "@/app/components/DashboardError";
import KpiRow from "@/app/components/KpiRow";
import PatientsPerDoctorCard from "@/app/components/PatientsPerDoctorCard";
import GenderSplitCard from "@/app/components/GenderSplitCard";
import TopConditionsCard from "@/app/components/TopConditionsCard";

const RANGE_OPTIONS = [7, 30, 90];
const DAY_MS = 24 * 60 * 60 * 1000;

export default function AdminDashboardPage() {
  const [range, setRange] = useState(30);
  const [nowMs] = useState(() => Date.now());

  const {
    data: doctorsRes,
    isLoading: doctorsLoading,
    isError: doctorsError,
  } = useDoctors({ limit: 100 });

  const {
    data: patientsRes,
    isLoading: patientsLoading,
    isError: patientsError,
  } = usePatients({ limit: 100 });

  const doctors = useMemo(() => doctorsRes?.data ?? [], [doctorsRes]);
  const patients = useMemo(() => patientsRes?.data ?? [], [patientsRes]);

  const isLoading = doctorsLoading || patientsLoading;
  const isError = doctorsError || patientsError;

  const perDoctor = useMemo(
    () => patientsPerDoctor(doctors, patients),
    [doctors, patients],
  );
  const gender = useMemo(() => genderSplit(patients), [patients]);
  const conditions = useMemo(() => topConditions(patients), [patients]);

  const totalDoctors = doctors.length;
  const totalPatients = patients.length;
  const avgPerDoctor =
    totalDoctors > 0 ? (totalPatients / totalDoctors).toFixed(1) : "0";

  const newInRange = useMemo(() => {
    const cutoff = nowMs - range * DAY_MS;
    return patients.filter((p) => new Date(p.createdAt).getTime() >= cutoff)
      .length;
  }, [patients, range, nowMs]);

  if (isError) return <DashboardError />;

  return (
    <div className="w-full min-h-screen bg-[#F6F5F0]">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <DashboardHeader
          range={range}
          onRangeChange={setRange}
          rangeOptions={RANGE_OPTIONS}
        />

        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <KpiRow
              totalDoctors={totalDoctors}
              totalPatients={totalPatients}
              avgPerDoctor={avgPerDoctor}
              newInRange={newInRange}
              range={range}
            />

            <div className="grid gap-6 md:grid-cols-5">
              <PatientsPerDoctorCard perDoctor={perDoctor} />

              <div className="flex flex-col gap-6 md:col-span-2">
                <GenderSplitCard
                  gender={gender}
                  totalPatients={totalPatients}
                />
                <TopConditionsCard conditions={conditions} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
