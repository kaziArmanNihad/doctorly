import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../lib/api";

export const userKeys = {
  all: ["users"],
  list: (params) => ["users", "list", params],
  me: ["users", "me"],
  detail: (id) => ["users", "detail", id],
};

export function useCurrentUser(options = {}) {
  return useQuery({
    queryKey: userKeys.me,
    queryFn: async () => {
      const { data } = await api.get("/users/me");
      return data;
    },
    retry: false,
    ...options,
  });
}

export function useSyncUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userData) => {
      const { data } = await api.post("/users", userData);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(userKeys.me, data);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Couldn't set up your account.",
      );
    },
  });
}

export function useUpdateCurrentUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updates) => {
      const { data } = await api.put("/users/me", updates);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(userKeys.me, data);
      toast.success("Profile updated.");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Couldn't update profile.");
    },
  });
}

export function useUsers(params = {}) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: async () => {
      const { data } = await api.get("/users", { params });
      return data; // expect { users, total, page, totalPages }
    },
    placeholderData: (previousData) => previousData,
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, role }) => {
      const { data } = await api.patch(`/users/${id}/role`, { role });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success("User role updated.");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Couldn't update user role.",
      );
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/users/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success("User removed.");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Couldn't remove user.");
    },
  });
}
