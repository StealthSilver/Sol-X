import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "dark" | "light";

interface PreferencesState {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  theme: ThemeMode;
  setEmailNotifications: (on: boolean) => void;
  setPushNotifications: (on: boolean) => void;
  setSmsNotifications: (on: boolean) => void;
  setTheme: (mode: ThemeMode) => void;
}

function applyThemeClass(mode: ThemeMode) {
  const root = document.documentElement;
  if (mode === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      theme: "dark",

      setEmailNotifications: (on) => set({ emailNotifications: on }),
      setPushNotifications: (on) => set({ pushNotifications: on }),
      setSmsNotifications: (on) => set({ smsNotifications: on }),
      setTheme: (mode) => {
        applyThemeClass(mode);
        set({ theme: mode });
      },
    }),
    {
      name: "sol-x-preferences",
      partialize: (state) => ({
        emailNotifications: state.emailNotifications,
        pushNotifications: state.pushNotifications,
        smsNotifications: state.smsNotifications,
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.theme) applyThemeClass(state.theme);
      },
    },
  ),
);
