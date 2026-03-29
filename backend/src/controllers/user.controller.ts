import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { sendPrismaFailure } from "../lib/prismaErrors";
import { routeStringParam } from "../lib/routeParams";
import { ApiResponse } from "../types/auth.types";
import { Role } from "@prisma/client";

const roleEnum = z.enum([
  "MASTER_ADMIN",
  "ADMIN",
  "PROJECT_MANAGER",
  "SITE_ENGINEER",
  "VIEWER",
]);

const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: roleEnum,
  isActive: z.boolean().optional().default(true),
  destination: z.string().max(200).optional(),
  projectIds: z.array(z.string()).optional().default([]),
});

const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  role: roleEnum.optional(),
  isActive: z.boolean().optional(),
  destination: z.string().max(200).nullable().optional(),
  projectIds: z.array(z.string()).optional(),
});

function canAssignRole(actorRole: string, targetRole: Role): boolean {
  if (targetRole === "MASTER_ADMIN") {
    return actorRole === "MASTER_ADMIN";
  }
  return true;
}

async function replaceUserProjectAssignments(
  userId: string,
  projectIds: string[],
) {
  const uniqueIds = [...new Set(projectIds)];
  if (uniqueIds.length > 0) {
    const projects = await prisma.project.findMany({
      where: { id: { in: uniqueIds } },
      select: { id: true },
    });
    if (projects.length !== uniqueIds.length) {
      throw new Error("INVALID_PROJECT");
    }
  }

  await prisma.projectAssignment.deleteMany({ where: { userId } });
  if (uniqueIds.length === 0) return;

  await prisma.projectAssignment.createMany({
    data: uniqueIds.map((projectId) => ({ userId, projectId })),
    skipDuplicates: true,
  });
}

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        destination: true,
        createdAt: true,
        assignedProjects: {
          select: {
            project: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    const data = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      isActive: u.isActive,
      destination: u.destination,
      createdAt: u.createdAt.toISOString(),
      projects: u.assignedProjects.map((a) => ({
        id: a.project.id,
        name: a.project.name,
      })),
    }));

    return res.status(200).json({
      success: true,
      data: { users: data },
    } as ApiResponse<{ users: typeof data }>);
  } catch (error) {
    return sendPrismaFailure(
      res,
      "listUsers",
      error,
      "Failed to load users",
    );
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const actor = req.user!;
    const validated = createUserSchema.parse(req.body);

    if (!canAssignRole(actor.role, validated.role as Role)) {
      return res.status(403).json({
        success: false,
        error: "Only a master admin can assign the master admin role",
      } as ApiResponse);
    }

    const existing = await prisma.user.findUnique({
      where: { email: validated.email.toLowerCase() },
    });
    if (existing) {
      return res.status(400).json({
        success: false,
        error: "An account with this email already exists",
      } as ApiResponse);
    }

    const passwordHash = await bcrypt.hash(validated.password, 10);
    const dest =
      validated.destination !== undefined
        ? validated.destination.trim() || null
        : null;

    const user = await prisma.user.create({
      data: {
        name: validated.name.trim(),
        email: validated.email.toLowerCase().trim(),
        passwordHash,
        role: validated.role as Role,
        isActive: validated.isActive,
        destination: dest,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    try {
      await replaceUserProjectAssignments(user.id, validated.projectIds);
    } catch (e: unknown) {
      if (e instanceof Error && e.message === "INVALID_PROJECT") {
        await prisma.user.delete({ where: { id: user.id } });
        return res.status(400).json({
          success: false,
          error: "One or more project IDs are invalid",
        } as ApiResponse);
      }
      throw e;
    }

    const full = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        destination: true,
        createdAt: true,
        assignedProjects: {
          select: {
            project: { select: { id: true, name: true } },
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      data: {
        user: {
          id: full!.id,
          name: full!.name,
          email: full!.email,
          role: full!.role,
          isActive: full!.isActive,
          destination: full!.destination,
          createdAt: full!.createdAt.toISOString(),
          projects: full!.assignedProjects.map((a) => ({
            id: a.project.id,
            name: a.project.name,
          })),
        },
      },
    } as ApiResponse);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.errors[0].message,
      } as ApiResponse);
    }
    return sendPrismaFailure(
      res,
      "createUser",
      error,
      "Failed to create user",
    );
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const actor = req.user!;
    const id = routeStringParam(req);
    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Invalid user id",
      } as ApiResponse);
    }
    const validated = updateUserSchema.parse(req.body);

    if (
      validated.password !== undefined &&
      validated.password.length > 0 &&
      validated.password.length < 8
    ) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 8 characters",
      } as ApiResponse);
    }

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      } as ApiResponse);
    }

    if (validated.role !== undefined) {
      if (!canAssignRole(actor.role, validated.role as Role)) {
        return res.status(403).json({
          success: false,
          error: "Only a master admin can assign the master admin role",
        } as ApiResponse);
      }

      if (
        existing.role === "MASTER_ADMIN" &&
        validated.role !== "MASTER_ADMIN"
      ) {
        const masters = await prisma.user.count({
          where: { role: "MASTER_ADMIN" },
        });
        if (masters <= 1) {
          return res.status(400).json({
            success: false,
            error: "Cannot change role of the only master admin",
          } as ApiResponse);
        }
      }
    }

    if (validated.email && validated.email.toLowerCase() !== existing.email) {
      const taken = await prisma.user.findUnique({
        where: { email: validated.email.toLowerCase() },
      });
      if (taken) {
        return res.status(400).json({
          success: false,
          error: "An account with this email already exists",
        } as ApiResponse);
      }
    }

    const data: {
      name?: string;
      email?: string;
      role?: Role;
      isActive?: boolean;
      passwordHash?: string;
      destination?: string | null;
    } = {};

    if (validated.name !== undefined) data.name = validated.name.trim();
    if (validated.email !== undefined)
      data.email = validated.email.toLowerCase().trim();
    if (validated.role !== undefined) data.role = validated.role as Role;
    if (validated.isActive !== undefined) data.isActive = validated.isActive;
    if (validated.password && validated.password.length > 0) {
      data.passwordHash = await bcrypt.hash(validated.password, 10);
    }
    if (validated.destination !== undefined) {
      data.destination =
        validated.destination === null
          ? null
          : validated.destination.trim() || null;
    }

    await prisma.user.update({
      where: { id },
      data,
    });

    if (validated.projectIds !== undefined) {
      try {
        await replaceUserProjectAssignments(id, validated.projectIds);
      } catch (e: unknown) {
        if (e instanceof Error && e.message === "INVALID_PROJECT") {
          return res.status(400).json({
            success: false,
            error: "One or more project IDs are invalid",
          } as ApiResponse);
        }
        throw e;
      }
    }

    const full = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        destination: true,
        createdAt: true,
        assignedProjects: {
          select: {
            project: { select: { id: true, name: true } },
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: full!.id,
          name: full!.name,
          email: full!.email,
          role: full!.role,
          isActive: full!.isActive,
          destination: full!.destination,
          createdAt: full!.createdAt.toISOString(),
          projects: full!.assignedProjects.map((a) => ({
            id: a.project.id,
            name: a.project.name,
          })),
        },
      },
    } as ApiResponse);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.errors[0].message,
      } as ApiResponse);
    }
    return sendPrismaFailure(
      res,
      "updateUser",
      error,
      "Failed to update user",
    );
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const actor = req.user!;
    const id = routeStringParam(req);
    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Invalid user id",
      } as ApiResponse);
    }

    if (id === actor.userId) {
      return res.status(400).json({
        success: false,
        error: "You cannot delete your own account",
      } as ApiResponse);
    }

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      } as ApiResponse);
    }

    if (existing.role === "MASTER_ADMIN") {
      const masters = await prisma.user.count({
        where: { role: "MASTER_ADMIN" },
      });
      if (masters <= 1) {
        return res.status(400).json({
          success: false,
          error: "Cannot delete the only master admin",
        } as ApiResponse);
      }
    }

    await prisma.user.delete({ where: { id } });

    return res.status(200).json({
      success: true,
      data: { message: "User deleted" },
    } as ApiResponse);
  } catch (error) {
    return sendPrismaFailure(
      res,
      "deleteUser",
      error,
      "Failed to delete user",
    );
  }
};
