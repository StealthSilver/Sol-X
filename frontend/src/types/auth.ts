export type Role =
  | "MASTER_ADMIN"
  | "ADMIN"
  | "PROJECT_MANAGER"
  | "SITE_ENGINEER"
  | "VIEWER";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export type AccessRequestData = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};
