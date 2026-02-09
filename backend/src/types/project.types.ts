export type ProjectStatus =
  | "PLANNING"
  | "IN_PROGRESS"
  | "ON_HOLD"
  | "COMPLETED"
  | "CANCELLED";
export type ProjectType =
  | "SOLAR"
  | "WIND"
  | "HYDRO"
  | "BATTERY_STORAGE"
  | "HYBRID";

export interface CreateProjectRequest {
  name: string;
  description?: string;
  type: ProjectType;
  location: string;
  capacity?: number;
  budget?: number;
  startDate: string;
  endDate?: string;
  managerId?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  type?: ProjectType;
  status?: ProjectStatus;
  location?: string;
  capacity?: number;
  budget?: number;
  startDate?: string;
  endDate?: string;
  managerId?: string;
}

export interface ProjectResponse {
  id: string;
  name: string;
  description: string | null;
  type: ProjectType;
  status: ProjectStatus;
  location: string;
  capacity: number | null;
  budget: number | null;
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
  manager: {
    id: string;
    name: string;
    email: string;
  };
}

export interface ProjectListResponse {
  projects: ProjectResponse[];
  total: number;
  page: number;
  limit: number;
}
