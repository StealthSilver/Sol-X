import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";

dotenv.config();

const app = express();

console.log("✅ Modules loaded successfully");

const defaultAllowedOrigins = [
  "https://sol-x-main.vercel.app",
  "https://www.sol-x-main.vercel.app",
  "https://sol-x-1.onrender.com",
  "https://sol-x.onrender.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const envOrigins =
  process.env.ALLOWED_ORIGINS?.split(",")
    .map((o) => o.trim())
    .filter(Boolean) ?? [];

const staticAllowed = new Set([...defaultAllowedOrigins, ...envOrigins]);

function isLocalDevOrigin(origin: string): boolean {
  try {
    const u = new URL(origin);
    return u.protocol === "http:" && (u.hostname === "localhost" || u.hostname === "127.0.0.1");
  } catch {
    return false;
  }
}

/** Vercel production + preview URLs (e.g. sol-x-main.vercel.app, sol-x-lrsk.vercel.app). */
function isSolXVercelOrigin(origin: string): boolean {
  try {
    const u = new URL(origin);
    if (u.protocol !== "https:") return false;
    const { hostname } = u;
    return hostname.endsWith(".vercel.app") && hostname.startsWith("sol-x");
  } catch {
    return false;
  }
}

// Middleware — allow local frontends (localhost / 127.0.0.1, any port) against deployed API
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (
        staticAllowed.has(origin) ||
        isLocalDevOrigin(origin) ||
        isSolXVercelOrigin(origin)
      ) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(" Middleware configured");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

console.log(" Routes configured");

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/", (req, res) => {
  res.send("Welcome to the Sol-X API");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// Global error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("Global error handler:", err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  },
);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
});
