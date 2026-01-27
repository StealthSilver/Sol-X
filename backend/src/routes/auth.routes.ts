import { Router } from "express";
import {
  login,
  requestAccess,
  verifyToken,
  updateProfile,
  getProfile,
} from "../controllers/auth.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.post("/login", login);
router.post("/request-access", requestAccess);

// Protected routes
router.get("/verify", authenticateJWT, verifyToken);
router.get("/profile", authenticateJWT, getProfile);
router.put("/profile", authenticateJWT, updateProfile);

export default router;
