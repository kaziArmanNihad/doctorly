import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../lib/api";

export const patientKeys = {
  all: ["patients"],
  list: (params) => ["patients", "list", params],
  detail: (id) => ["patients", "detail", id],
};

const doctorsAllKey = ["doctors"];

/** GET /patients?search=&condition=&doctor=&dateFrom=&dateTo=&page=&limit= */
export function usePatients(params = {}) {
  return useQuery({
    queryKey: patientKeys.list(params),
    queryFn: async () => {
      const { data } = await api.get("/patients", { params });
      return data;
    },
    placeholderData: (previousData) => previousData,
  });
}

/** POST /patients */
export function useCreatePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (patient) => {
      const { data } = await api.post("/patients", patient);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientKeys.all });
      queryClient.invalidateQueries({ queryKey: doctorsAllKey }); // patientCount changed
      toast.success("Patient added.");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Couldn't add patient.");
    },
  });
}

/** PUT /patients/:id */
export function useUpdatePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }) => {
      const { data } = await api.put(`/patients/${id}`, updates);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientKeys.all });
      queryClient.invalidateQueries({ queryKey: doctorsAllKey }); // doctor may have been reassigned
      toast.success("Patient updated.");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Couldn't update patient.");
    },
  });
}

/** DELETE /patients/:id */
export function useDeletePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/patients/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientKeys.all });
      queryClient.invalidateQueries({ queryKey: doctorsAllKey }); // patientCount changed
      toast.success("Patient deleted.");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Couldn't delete patient.");
    },
  });
}
