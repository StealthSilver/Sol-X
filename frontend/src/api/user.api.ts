import apiClient from "../lib/api";
import type { ApiResponse } from "../types/auth";
import type {
  OrgUser,
  OrgUserListResponse,
  CreateOrgUserRequest,
  UpdateOrgUserRequest,
} from "../types/user";

export const userApi = {
  getUsers: async (): Promise<OrgUserListResponse> => {
    const response = await apiClient.get<ApiResponse<OrgUserListResponse>>(
      "/api/users",
    );
    return response.data.data!;
  },

  createUser: async (data: CreateOrgUserRequest): Promise<OrgUser> => {
    const response = await apiClient.post<ApiResponse<{ user: OrgUser }>>(
      "/api/users",
      data,
    );
    return response.data.data!.user;
  },

  updateUser: async (
    id: string,
    data: UpdateOrgUserRequest,
  ): Promise<OrgUser> => {
    const response = await apiClient.patch<ApiResponse<{ user: OrgUser }>>(
      `/api/users/${id}`,
      data,
    );
    return response.data.data!.user;
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse>(`/api/users/${id}`);
  },
};
