import { cwd } from "node:process";
import { URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function proxyTargetFromViteEnv(env: Record<string, string>): string {
  const explicit = env.VITE_DEV_PROXY_TARGET?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const api = env.VITE_API_URL?.trim() ?? "";
  if (!api) return "https://sol-x.onrender.com";

  try {
    const withProto = /^https?:\/\//i.test(api) ? api : `https://${api}`;
    const u = new URL(withProto);
    return `${u.protocol}//${u.host}`.replace(/\/+$/, "");
  } catch {
    return "https://sol-x.onrender.com";
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), "");
  const proxyTarget = proxyTargetFromViteEnv(env);

  return {
    plugins: [react(), tailwindcss()],
    server:
      mode === "development"
        ? {
            proxy: {
              "/api": {
                target: proxyTarget,
                changeOrigin: true,
                secure: true,
              },
            },
          }
        : undefined,
  };
});
