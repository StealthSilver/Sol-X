import apiClient from "../lib/api";
import type {
  LoginRequest,
  LoginResponse,
  AccessRequestData,
  ApiResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  User,
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

  // Get profile
  getProfile: async (): Promise<User> => {
    const response =
      await apiClient.get<ApiResponse<{ user: User }>>("/auth/profile");
    return response.data.data!.user;
  },

  // Update profile
  updateProfile: async (
    data: UpdateProfileRequest,
  ): Promise<UpdateProfileResponse> => {
    const response = await apiClient.put<ApiResponse<UpdateProfileResponse>>(
      "/auth/profile",
      data,
    );
    return response.data.data!;
  },
};
