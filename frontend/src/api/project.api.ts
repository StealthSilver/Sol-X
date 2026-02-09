import apiClient from "../lib/api";
import type { ApiResponse } from "../types/auth";
import type {
  Project,
  CreateProjectRequest,
  ProjectListResponse,
} from "../types/project";

export const projectApi = {
  // Get all projects
  getProjects: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
  }): Promise<ProjectListResponse> => {
    const response = await apiClient.get<ApiResponse<ProjectListResponse>>(
      "/projects",
      {
        params,
      },
    );
    return response.data.data!;
  },

  // Get single project
  getProject: async (id: string): Promise<Project> => {
    const response = await apiClient.get<ApiResponse<Project>>(
      `/projects/${id}`,
    );
    return response.data.data!;
  },

  // Create project
  createProject: async (data: CreateProjectRequest): Promise<Project> => {
    const response = await apiClient.post<ApiResponse<Project>>(
      "/projects",
      data,
    );
    return response.data.data!;
  },

  // Update project
  updateProject: async (
    id: string,
    data: Partial<CreateProjectRequest>,
  ): Promise<Project> => {
    const response = await apiClient.put<ApiResponse<Project>>(
      `/projects/${id}`,
      data,
    );
    return response.data.data!;
  },

  // Delete project
  deleteProject: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse>(`/projects/${id}`);
  },
};
