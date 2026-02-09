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

export interface Project {
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

export interface ProjectListResponse {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
}

export const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: "SOLAR", label: "Solar" },
  { value: "WIND", label: "Wind" },
  { value: "HYDRO", label: "Hydro" },
  { value: "BATTERY_STORAGE", label: "Battery Storage" },
  { value: "HYBRID", label: "Hybrid" },
];

export const PROJECT_STATUSES: {
  value: ProjectStatus;
  label: string;
  color: string;
}[] = [
  { value: "PLANNING", label: "Planning", color: "bg-blue-500" },
  { value: "IN_PROGRESS", label: "In Progress", color: "bg-yellow-500" },
  { value: "ON_HOLD", label: "On Hold", color: "bg-orange-500" },
  { value: "COMPLETED", label: "Completed", color: "bg-green-500" },
  { value: "CANCELLED", label: "Cancelled", color: "bg-red-500" },
];
