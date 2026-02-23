import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";

dotenv.config();

const app = express();

console.log("✅ Modules loaded successfully");

// Middleware
app.use(
  cors({
    origin: ["https://sol-x-main.vercel.app", "http://localhost:5173"],
    credentials: true,
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
