import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#fbf8f1",
          100: "#f3ecdc",
          200: "#e6d8b7",
          300: "#d6bf8a",
          400: "#c7a766",
          500: "#b08e4b",
          600: "#8a6e3a",
        },
        cactus: {
          50: "#eef7ee",
          100: "#d4ebd3",
          200: "#a9d6a8",
          300: "#79bd7a",
          400: "#52a256",
          500: "#3b8a3f",
          600: "#2f6e33",
          700: "#264f29",
          800: "#1d3a20",
          900: "#142a17",
        },
        clay: {
          50: "#fbf3ee",
          100: "#f3ddce",
          200: "#e3b89c",
          300: "#cf9069",
          400: "#b56f44",
          500: "#955633",
          600: "#73422a",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        display: ["ui-serif", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 320ms ease-out",
        rise: "rise 420ms cubic-bezier(0.2, 0.7, 0.2, 1)",
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
