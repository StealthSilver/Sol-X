import { Router } from "express";
import {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { authenticateJWT, requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticateJWT);
router.use(requireAdmin);

router.get("/", listUsers);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
