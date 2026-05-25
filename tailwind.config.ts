import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#fdfaf3",
          100: "#f7f0e1",
          200: "#ece0c5",
          300: "#dcc89a",
          400: "#c8ac6c",
          500: "#a98c4d",
          600: "#85703e",
        },
        cactus: {
          50: "#f1f7f0",
          100: "#dceeda",
          200: "#bbdbb8",
          300: "#8fc28d",
          400: "#65a466",
          500: "#4b894e",
          600: "#3b6e3e",
          700: "#305631",
          800: "#244223",
          900: "#162e18",
        },
        clay: {
          50: "#fbf2eb",
          100: "#f4dcc9",
          200: "#e6bb9a",
          300: "#d39668",
          400: "#bb7444",
          500: "#985933",
          600: "#724328",
        },
        bone: {
          50: "#fffdf8",
          100: "#fbf6ea",
          200: "#f0e7d2",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -16px rgba(46, 67, 41, 0.15), 0 4px 10px -6px rgba(46, 67, 41, 0.06)",
        glow: "0 18px 40px -22px rgba(75, 137, 78, 0.35)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 420ms ease-out",
        rise: "rise 520ms cubic-bezier(0.2, 0.7, 0.2, 1)",
        sway: "sway 7s ease-in-out infinite",
        float: "float 9s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-1.5deg)" },
          "50%": { transform: "rotate(1.5deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "soft-grain":
          "radial-gradient(rgba(46, 67, 41, 0.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
