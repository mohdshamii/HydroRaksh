import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Slate-Navy Base with CSS variables for dynamic Dark/Light Theme
        atlas: {
          canvas: "rgb(var(--bg-canvas-rgb) / <alpha-value>)",
          card: "rgb(var(--bg-card-rgb) / <alpha-value>)",
          elevated: "rgb(var(--bg-elevated-rgb) / <alpha-value>)",
          border: "rgb(var(--border-color-rgb) / <alpha-value>)",
          subtle: "rgb(var(--bg-subtle-rgb) / <alpha-value>)",
          text: "rgb(var(--text-primary-rgb) / <alpha-value>)",
          muted: "rgb(var(--text-muted-rgb) / <alpha-value>)",
          faint: "rgb(var(--text-faint-rgb) / <alpha-value>)",
          secondary: "rgb(var(--text-muted-rgb) / <alpha-value>)",
        },
        // Warm Saffron / Amber Accent
        saffron: {
          light: "#fbbf24",
          DEFAULT: "#f59e0b",
          hover: "#d97706",
          dark: "#b45309",
        },
        // Color-blind friendly categorical map palette (Okabe-Ito / Tol)
        categorical: {
          orange: "#e69f00",
          skyBlue: "#56b4e9",
          bluishGreen: "#009e73",
          yellow: "#f0e442",
          blue: "#0072b2",
          vermilion: "#d55e00",
          reddishPurple: "#cc79a7",
          slateGray: "#708090",
        },
        // Water stress semantic colors
        water: {
          safe: "#10b981",
          semiCritical: "#f59e0b",
          critical: "#f97316",
          overExploited: "#ef4444",
        },
        // Legacy palette support
        navy: "#062A4D",
        navyDark: "#031C33",
        blue: "#1683D8",
        blueLight: "#EAF5FF",
        green: "#27AE60",
        greenLight: "#EAF8EF",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "'Playfair Display'", "'Merriweather'", "Georgia", "serif"],
        sans: ["var(--font-inter)", "'Inter'", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Fira Code'", "Courier New", "monospace"],
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(245, 158, 11, 0.2)",
        cardDark: "0 4px 20px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
