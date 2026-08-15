import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../lib/api";

export const doctorKeys = {
  all: ["doctors"],
  list: (params) => ["doctors", "list", params],
  detail: (id) => ["doctors", "detail", id],
  patients: (id) => ["doctors", "detail", id, "patients"],
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
    // smooth pagination, no flash of empty state
  });
}

/** GET /doctors/:id */
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

/** GET /doctors/:id/patients */
export function useDoctorPatients(id) {
  return useQuery({
    queryKey: doctorKeys.patients(id),
    queryFn: async () => {
      const { data } = await api.get(`/doctors/${id}/patients`);
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

/** POST /doctors/:id/patients */
export function useAddPatientToDoctor(doctorId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (patientData) => {
      const { data } = await api.post(
        `/doctors/${doctorId}/patients`,
        patientData,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: doctorKeys.patients(doctorId),
      });
      queryClient.invalidateQueries({ queryKey: doctorKeys.detail(doctorId) });
      toast.success("Patient added.");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Couldn't add patient.");
    },
  });
}

/** DELETE /doctors/:id/patients/:patientId */
export function useDeletePatientFromDoctor(doctorId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (patientId) => {
      const { data } = await api.delete(
        `/doctors/${doctorId}/patients/${patientId}`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: doctorKeys.patients(doctorId),
      });
      toast.success("Patient removed.");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Couldn't remove patient.");
    },
  });
}
