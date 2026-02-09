import { Router } from "express";
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller";
import {
  authenticateJWT,
  requireProjectManager,
  requireAdmin,
} from "../middleware/auth.middleware";

const router = Router();

// All routes require authentication
router.use(authenticateJWT);

// Get all projects (all authenticated users)
router.get("/", getProjects);

// Get single project (all authenticated users)
router.get("/:id", getProject);

// Create project (Project Manager and above)
router.post("/", requireProjectManager, createProject);

// Update project (Project Manager and above)
router.put("/:id", requireProjectManager, updateProject);

// Delete project (Admin and above)
router.delete("/:id", requireAdmin, deleteProject);

export default router;
