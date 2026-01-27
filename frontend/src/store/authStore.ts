import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/auth";
import { authApi } from "../api/auth.api";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User, token: string) => void;
  updateUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await authApi.login({ email, password });

          // Store token in localStorage
          localStorage.setItem("sol-x-token", response.accessToken);

          set({
            user: response.user,
            token: response.accessToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem("sol-x-token");
        localStorage.removeItem("sol-x-user");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setUser: (user: User, token: string) => {
        localStorage.setItem("sol-x-token", token);
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      updateUser: (user: User) => {
        set({ user });
      },

      clearAuth: () => {
        localStorage.removeItem("sol-x-token");
        localStorage.removeItem("sol-x-user");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "sol-x-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
