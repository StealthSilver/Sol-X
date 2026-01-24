/**
 * Sol-X Design System
 * Enterprise color palette and typography constants
 */

export const colors = {
  // Primary / Background
  charcoal: {
    900: "#0f0f0f",
    700: "#1a1a1a",
    500: "#404040",
  },
  // Accent
  solarAmber: {
    500: "#F59E0B",
    300: "#FCD34D",
  },
  // Secondary Accent (Success only)
  green: {
    500: "#10B981",
  },
  // Neutral
  gray: {
    50: "#FAFAFA",
    200: "#E5E7EB",
    600: "#4B5563",
  },
  // Semantic
  red: {
    500: "#EF4444",
    600: "#DC2626",
  },
} as const;

export const typography = {
  fontFamily: {
    base: '"Inter", system-ui, -apple-system, sans-serif',
  },
  fontWeight: {
    regular: 400,
    semibold: 600,
  },
} as const;

export const spacing = {
  sidebarWidth: "260px",
  topbarHeight: "64px",
  pagePadding: "24px",
  cardPadding: "24px",
} as const;

export const borderRadius = {
  card: "12px",
  button: "8px",
  input: "8px",
} as const;
