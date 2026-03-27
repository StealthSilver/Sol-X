import axios from "axios";

/**
 * API host only (no `/api` suffix). Routes call `/api/...` so the final URL is always
 * `{origin}/api/...` even when `VITE_API_URL` is `https://host` or `https://host/api`.
 *
 * In Vite dev, if `VITE_API_URL` points at a remote host (not localhost), use same-origin
 * (`""`) so requests hit the dev server; `vite.config.ts` proxies `/api` to that host and
 * avoids browser CORS.
 */
function resolveApiOrigin(): string {
  const raw = String(import.meta.env.VITE_API_URL ?? "").trim();
  const fallback = "http://localhost:8000";

  if (import.meta.env.DEV && raw) {
    let normalized = raw.replace(/\/+$/, "");
    if (normalized.endsWith("/api")) {
      normalized = normalized.slice(0, -4).replace(/\/+$/, "");
    }
    const originCandidate = /^https?:\/\//i.test(normalized)
      ? normalized
      : `http://${normalized}`;
    try {
      const u = new URL(originCandidate);
      const h = u.hostname;
      const isLocal =
        h === "localhost" ||
        h === "127.0.0.1" ||
        h === "[::1]" ||
        h === "::1";
      if (!isLocal) {
        return "";
      }
    } catch {
      /* use default resolution below */
    }
  }

  let base = (raw || fallback).replace(/\/+$/, "");
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
      const path = String(error.config?.url ?? "");
      const isPublicAuth =
        path.includes("/api/auth/login") ||
        path.includes("/api/auth/request-access");
      // Let login / request-access show inline errors; avoid hard redirect to /login
      // (breaks on hosts without SPA fallback, e.g. Vercel without rewrites).
      if (!isPublicAuth) {
        localStorage.removeItem("sol-x-token");
        localStorage.removeItem("sol-x-user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
