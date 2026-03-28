import type { Role } from "./auth";

export type OrgUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  destination: string | null;
  createdAt: string;
  projects: { id: string; name: string }[];
};

export type OrgUserListResponse = {
  users: OrgUser[];
};

export type CreateOrgUserRequest = {
  name: string;
  email: string;
  password: string;
  role: Role;
  isActive?: boolean;
  destination?: string;
  projectIds?: string[];
};

export type UpdateOrgUserRequest = {
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
  isActive?: boolean;
  destination?: string | null;
  projectIds?: string[];
};
