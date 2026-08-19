import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../lib/api";

export const doctorKeys = {
  all: ["doctors"],
  list: (params) => ["doctors", "list", params],
  detail: (id) => ["doctors", "detail", id],
};

/** GET /doctors?search=&specialization=&dateFrom=&dateTo=&page=&limit= */
export function useDoctors(params = {}) {
  return useQuery({
    queryKey: doctorKeys.list(params),
    queryFn: async () => {
      const { data } = await api.get("/doctors", { params });
      return data;
    },
    placeholderData: (previousData) => previousData,
  });
}

/** GET /doctors/:id — returns { doctor, patients, patientCount } */
export function useDoctor(id) {
  return useQuery({
    queryKey: doctorKeys.detail(id),
    queryFn: async () => {
      const { data } = await api.get(`/doctors/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

/** POST /doctors */
export function useCreateDoctor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (doctorData) => {
      const { data } = await api.post("/doctors", doctorData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: doctorKeys.all });
      toast.success("Doctor added.");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Couldn't add doctor.");
    },
  });
}

/**
 * POST /patients — scoped to a specific doctor's "view patients" modal.
 * There is no nested /doctors/:id/patients route on the backend; patient
 * creation always goes through the real /patients endpoint, with `doctor`
 * defaulted to the doctor currently being viewed.
 */
export function useAddPatientToDoctor(doctorId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (patientData) => {
      const { data } = await api.post("/patients", {
        ...patientData,
        doctor: patientData.doctor || doctorId,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: doctorKeys.all });
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success("Patient added.");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Couldn't add patient.");
    },
  });
}

/** DELETE /patients/:patientId — same reasoning, no nested route exists. */
export function useDeletePatientFromDoctor(doctorId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (patientId) => {
      const { data } = await api.delete(`/patients/${patientId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: doctorKeys.all });
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success("Patient removed.");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Couldn't remove patient.");
    },
  });
}
