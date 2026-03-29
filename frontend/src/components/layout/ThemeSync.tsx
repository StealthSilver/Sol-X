import React, { useEffect } from "react";
import { usePreferencesStore } from "../../store/preferencesStore";

/** Keeps document.documentElement in sync with persisted theme (default dark). */
export const ThemeSync: React.FC = () => {
  const theme = usePreferencesStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta)
      meta.setAttribute(
        "content",
        theme === "dark" ? "#0F0F0F" : "#f5f2ed",
      );
  }, [theme]);

  return null;
};
