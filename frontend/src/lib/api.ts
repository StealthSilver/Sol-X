import axios from "axios";

/**
 * API host only (no `/api` suffix). Routes call `/api/...` so the final URL is always
 * `{origin}/api/...` even when `VITE_API_URL` is `https://host` or `https://host/api`.
 */
function resolveApiOrigin(): string {
  const raw = String(import.meta.env.VITE_API_URL ?? "").trim() || "http://localhost:8000";
  let base = raw.replace(/\/+$/, "");
  if (base.endsWith("/api")) {
    base = base.slice(0, -4).replace(/\/+$/, "");
  }
  return base;
}

const apiClient = axios.create({
  baseURL: resolveApiOrigin(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("sol-x-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth state
      localStorage.removeItem("sol-x-token");
      localStorage.removeItem("sol-x-user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
