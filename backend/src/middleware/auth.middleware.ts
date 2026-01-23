import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../types/auth.types";

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Authenticate JWT middleware
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
      } as ApiResponse);
    }

    const token = authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Invalid token format",
      } as ApiResponse);
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT Authentication error:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        error: "Invalid or expired token",
      } as ApiResponse);
    }

    return res.status(500).json({
      success: false,
      error: "Authentication error",
    } as ApiResponse);
  }
};

// Role-based authorization middleware
export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Authentication required",
        } as ApiResponse);
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          error: "Insufficient permissions",
        } as ApiResponse);
      }

      next();
    } catch (error) {
      console.error("Role authorization error:", error);
      return res.status(500).json({
        success: false,
        error: "Authorization error",
      } as ApiResponse);
    }
  };
};

// Master admin only middleware
export const requireMasterAdmin = requireRole(["MASTER_ADMIN"]);

// Admin and above middleware
export const requireAdmin = requireRole(["MASTER_ADMIN", "ADMIN"]);

// Project manager and above middleware
export const requireProjectManager = requireRole([
  "MASTER_ADMIN",
  "ADMIN",
  "PROJECT_MANAGER",
]);
