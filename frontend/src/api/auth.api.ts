import apiClient from "../lib/api";
import type {
  LoginRequest,
  LoginResponse,
  AccessRequestData,
  ApiResponse,
} from "../types/auth";

export const authApi = {
  // Login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      "/auth/login",
      credentials,
    );
    return response.data.data!;
  },

  // Request access
  requestAccess: async (data: AccessRequestData): Promise<void> => {
    await apiClient.post<ApiResponse>("/auth/request-access", data);
  },

  // Verify token
  verifyToken: async () => {
    const response = await apiClient.get<ApiResponse>("/auth/verify");
    return response.data;
  },
};
