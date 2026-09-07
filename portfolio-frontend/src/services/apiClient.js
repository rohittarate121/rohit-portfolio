import axios from "axios";
import { getStoredToken } from "../utils/authStorage.js";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Every service file built since Step 10 already imports this instance —
// so every one of them gets an authenticated request automatically from
// here on, with zero changes needed to any of those files.
apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
