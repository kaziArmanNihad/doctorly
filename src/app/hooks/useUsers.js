import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../lib/api";

export const userKeys = {
  all: ["users"],
  list: (params) => ["users", "list", params],
  me: ["users", "me"],
  detail: (id) => ["users", "detail", id],
};

/** GET /users/me — the logged-in user's own record */
export function useCurrentUser(options = {}) {
  return useQuery({
    queryKey: userKeys.me,
    queryFn: async () => {
      const { data } = await api.get("/users/me");
      return data;
    },
    retry: false,
    ...options, // pass { enabled: !!firebaseUser } from the caller
  });
}

// POST /users — create/sync
export function useSyncUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userData) => {
      // userData: { uid, name, email }
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

/** PUT /users/me — update the current user's own profile */
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

/** GET /users?search=&role=&page= — admin-only list of all users */
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

/** PATCH /users/:id/role — admin updates another user's role/permissions */
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

/** DELETE /users/:id — admin removes a user */
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
