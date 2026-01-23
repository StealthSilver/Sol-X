import { Router } from "express";
import {
  login,
  requestAccess,
  verifyToken,
} from "../controllers/auth.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.post("/login", login);
router.post("/request-access", requestAccess);

// Protected routes
router.get("/verify", authenticateJWT, verifyToken);

export default router;
