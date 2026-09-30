import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#062A4D",
        navyDark: "#031C33",
        blue: "#1683D8",
        blueLight: "#EAF5FF",
        green: "#27AE60",
        greenLight: "#EAF8EF",
        yellow: "#F2C94C",
        orange: "#F2994A",
        red: "#EB5757",
        bgmain: "#F4F7FA",
        txt: "#172B4D",
        muted: "#6B7C93",
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        card: "0 2px 14px rgba(6,42,77,0.07)",
        cardHover: "0 8px 28px rgba(6,42,77,0.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
