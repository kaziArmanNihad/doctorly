import axios from "axios";
import auth from "../firebase/firebase.config";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // Session expired or invalid — send the user back to sign in.
      if (typeof window !== "undefined") {
        redirect("/login");
      }
    }
    return Promise.reject(error);
  },
);

export default api;
