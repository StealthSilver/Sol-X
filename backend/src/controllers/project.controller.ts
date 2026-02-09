import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma";
import { ApiResponse } from "../types/auth.types";
import { ProjectResponse, ProjectListResponse } from "../types/project.types";

// Validation schemas
const createProjectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  description: z.string().optional(),
  type: z.enum(["SOLAR", "WIND", "HYDRO", "BATTERY_STORAGE", "HYBRID"]),
  location: z.string().min(2, "Location must be at least 2 characters"),
  capacity: z.number().positive().optional(),
  budget: z.number().positive().optional(),
  startDate: z.string().datetime({ message: "Invalid start date format" }),
  endDate: z
    .string()
    .datetime({ message: "Invalid end date format" })
    .optional(),
  managerId: z.string().optional(),
});

const updateProjectSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  type: z
    .enum(["SOLAR", "WIND", "HYDRO", "BATTERY_STORAGE", "HYBRID"])
    .optional(),
  status: z
    .enum(["PLANNING", "IN_PROGRESS", "ON_HOLD", "COMPLETED", "CANCELLED"])
    .optional(),
  location: z.string().min(2).optional(),
  capacity: z.number().positive().optional(),
  budget: z.number().positive().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  managerId: z.string().optional(),
});

// Create project
export const createProject = async (req: Request, res: Response) => {
  try {
    const validatedData = createProjectSchema.parse(req.body);
    const userId = req.user!.userId;

    // Use the provided managerId or default to the current user
    const managerId = validatedData.managerId || userId;

    // Verify manager exists and has appropriate role
    const manager = await prisma.user.findUnique({
      where: { id: managerId },
    });

    if (!manager) {
      return res.status(400).json({
        success: false,
        error: "Invalid manager ID",
      } as ApiResponse);
    }

    const project = await prisma.project.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        type: validatedData.type,
        location: validatedData.location,
        capacity: validatedData.capacity,
        budget: validatedData.budget,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        managerId,
      },
      include: {
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const response: ProjectResponse = {
      id: project.id,
      name: project.name,
      description: project.description,
      type: project.type,
      status: project.status,
      location: project.location,
      capacity: project.capacity,
      budget: project.budget,
      startDate: project.startDate.toISOString(),
      endDate: project.endDate?.toISOString() || null,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      manager: project.manager,
    };

    return res.status(201).json({
      success: true,
      data: response,
    } as ApiResponse<ProjectResponse>);
  } catch (error) {
    console.error("Create project error:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.errors[0].message,
      } as ApiResponse);
    }

    return res.status(500).json({
      success: false,
      error: "An error occurred while creating the project",
    } as ApiResponse);
  }
};

// Get all projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const type = req.query.type as string;

    const where: any = {};
    if (status) where.status = status;
    if (type) where.type = type;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          manager: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.project.count({ where }),
    ]);

    const response: ProjectListResponse = {
      projects: projects.map((project) => ({
        id: project.id,
        name: project.name,
        description: project.description,
        type: project.type,
        status: project.status,
        location: project.location,
        capacity: project.capacity,
        budget: project.budget,
        startDate: project.startDate.toISOString(),
        endDate: project.endDate?.toISOString() || null,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
        manager: project.manager,
      })),
      total,
      page,
      limit,
    };

    return res.status(200).json({
      success: true,
      data: response,
    } as ApiResponse<ProjectListResponse>);
  } catch (error) {
    console.error("Get projects error:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while fetching projects",
    } as ApiResponse);
  }
};

// Get single project
export const getProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      } as ApiResponse);
    }

    const response: ProjectResponse = {
      id: project.id,
      name: project.name,
      description: project.description,
      type: project.type,
      status: project.status,
      location: project.location,
      capacity: project.capacity,
      budget: project.budget,
      startDate: project.startDate.toISOString(),
      endDate: project.endDate?.toISOString() || null,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      manager: project.manager,
    };

    return res.status(200).json({
      success: true,
      data: response,
    } as ApiResponse<ProjectResponse>);
  } catch (error) {
    console.error("Get project error:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while fetching the project",
    } as ApiResponse);
  }
};

// Update project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const validatedData = updateProjectSchema.parse(req.body);

    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      } as ApiResponse);
    }

    const updateData: any = { ...validatedData };
    if (validatedData.startDate) {
      updateData.startDate = new Date(validatedData.startDate);
    }
    if (validatedData.endDate) {
      updateData.endDate = new Date(validatedData.endDate);
    }

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
      include: {
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const response: ProjectResponse = {
      id: project.id,
      name: project.name,
      description: project.description,
      type: project.type,
      status: project.status,
      location: project.location,
      capacity: project.capacity,
      budget: project.budget,
      startDate: project.startDate.toISOString(),
      endDate: project.endDate?.toISOString() || null,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      manager: project.manager,
    };

    return res.status(200).json({
      success: true,
      data: response,
    } as ApiResponse<ProjectResponse>);
  } catch (error) {
    console.error("Update project error:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.errors[0].message,
      } as ApiResponse);
    }

    return res.status(500).json({
      success: false,
      error: "An error occurred while updating the project",
    } as ApiResponse);
  }
};

// Delete project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      } as ApiResponse);
    }

    await prisma.project.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      data: { message: "Project deleted successfully" },
    } as ApiResponse);
  } catch (error) {
    console.error("Delete project error:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while deleting the project",
    } as ApiResponse);
  }
};
