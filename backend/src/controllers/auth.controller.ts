import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import prisma from "../lib/prisma";
import { sendAccessRequestEmail } from "../lib/email";
import { LoginResponse, ApiResponse } from "../types/auth.types";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

const accessRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Login controller
export const login = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      } as ApiResponse);
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        error: "Account is not active. Please contact administrator.",
      } as ApiResponse);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      } as ApiResponse);
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.JWT_EXPIRY || "7d",
      },
    );

    // Return response
    const response: LoginResponse = {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };

    return res.status(200).json({
      success: true,
      data: response,
    } as ApiResponse<LoginResponse>);
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.errors[0].message,
      } as ApiResponse);
    }

    return res.status(500).json({
      success: false,
      error: "An error occurred during login",
    } as ApiResponse);
  }
};

// Request access controller
export const requestAccess = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = accessRequestSchema.parse(req.body);
    const { name, email, company, message } = validatedData;

    // Check if email already exists as a user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "An account with this email already exists",
      } as ApiResponse);
    }

    // Create access request
    const accessRequest = await prisma.accessRequest.create({
      data: {
        name,
        email,
        company,
        message,
      },
    });

    // Send email notification
    try {
      await sendAccessRequestEmail({
        name,
        email,
        company,
        message,
      });
    } catch (emailError) {
      console.error("Email sending failed, but request was saved:", emailError);
      // Continue even if email fails - the request is still saved
    }

    return res.status(201).json({
      success: true,
      data: {
        message: "Access request submitted successfully",
        requestId: accessRequest.id,
      },
    } as ApiResponse);
  } catch (error) {
    console.error("Request access error:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.errors[0].message,
      } as ApiResponse);
    }

    return res.status(500).json({
      success: false,
      error: "An error occurred while processing your request",
    } as ApiResponse);
  }
};

// Verify token (for frontend to check auth status)
export const verifyToken = async (req: Request, res: Response) => {
  try {
    // User is already attached to req by middleware
    const user = (req as any).user;

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.userId,
          email: user.email,
          role: user.role,
        },
      },
    } as ApiResponse);
  } catch (error) {
    console.error("Verify token error:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred during token verification",
    } as ApiResponse);
  }
};
