/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: {
          900: "#0F172A",
          700: "#1E293B",
          500: "#334155",
        },
        solarAmber: {
          500: "#F59E0B",
          300: "#FCD34D",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        float: "float 8s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translate(-50%, -50%) translateY(0px)" },
          "50%": { transform: "translate(-50%, -50%) translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
