import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0a0b",
          900: "#0f1011",
          850: "#141518",
          800: "#1a1b1f",
          700: "#23252a",
          600: "#2f3138",
          500: "#494c55",
          400: "#7a7e88",
          300: "#a8acb5",
          200: "#d4d6dc",
          100: "#ebecef",
        },
        accent: {
          DEFAULT: "#e8e6df",
          muted: "#b9b6ab",
          warm: "#d2c4a2",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        display: ["ui-serif", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 320ms ease-out",
        "rise": "rise 420ms cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
