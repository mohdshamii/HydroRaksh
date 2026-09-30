/**
 * Design Tokens for JalSuraksha — UP Historical & Water Resource Atlas
 * Modeled on BharatRajya.com interactive time-based atlas.
 * Dark-first design, deep slate-navy (#0f172a), saffron/amber accent (#f59e0b),
 * color-blind safe categorical fills, serif display headings, and clean UI sans.
 */

export const tokens = {
  // Theme Palettes
  theme: {
    dark: {
      bg: {
        canvas: "#0f172a",       // Deep Slate-Navy main background
        card: "#1e293b",         // Step lighter surface for cards & sidebars
        elevated: "#273549",     // Tooltips, floating menus, modals
        overlay: "rgba(15, 23, 42, 0.82)", // Glassmorphism backdrop
        input: "#09101d",        // Recessed inputs
      },
      text: {
        primary: "#f8fafc",      // Slate 50 (high contrast)
        secondary: "#cbd5e1",    // Slate 300
        muted: "#94a3b8",        // Slate 400
        faint: "#64748b",        // Slate 500
      },
      border: {
        subtle: "#243248",
        default: "#334155",      // Slate 700
        active: "#f59e0b",       // Saffron accent ring
      },
    },
    light: {
      bg: {
        canvas: "#f8fafc",       // Crisp slate-white
        card: "#ffffff",         // Pure white surfaces
        elevated: "#f1f5f9",     // Subdued panels
        overlay: "rgba(248, 250, 252, 0.85)",
        input: "#f1f5f9",
      },
      text: {
        primary: "#0f172a",      // Slate 900
        secondary: "#334155",    // Slate 700
        muted: "#64748b",        // Slate 500
        faint: "#94a3b8",        // Slate 400
      },
      border: {
        subtle: "#f1f5f9",
        default: "#e2e8f0",      // Slate 200
        active: "#d97706",       // Deep amber accent
      },
    },
  },

  // Interactive Accent - Saffron / Amber
  accent: {
    light: "#fbbf24",          // Amber 400
    primary: "#f59e0b",        // Amber 500 (Primary interactive)
    hover: "#d97706",          // Amber 600
    dark: "#b45309",           // Amber 700
    glow: "rgba(245, 158, 11, 0.25)",
  },

  // Color-Blind Distinguishable Categorical Palette (Okabe-Ito / Tol inspired)
  // Used for distinct polities, empires, and water stress categories across maps
  categorical: {
    orange: "#e69f00",         // Maurya / Delhi Sultanate / Critical Risk
    skyBlue: "#56b4e9",        // Harappan / British Provinces / Abundant Aquifer
    bluishGreen: "#009e73",    // Kushan / Post-1947 India / Safe Water Zone
    yellow: "#f0e442",         // Shunga / Nawabs of Awadh / Semi-Critical
    blue: "#0072b2",           // Gupta Empire / Ken-Betwa Basin / River Network
    vermilion: "#d55e00",      // Mughal Empire / Over-Exploited / Major Battle
    reddishPurple: "#cc79a7",   // Kanauj Gurjara-Pratihara / Bundelkhand Chandelas
    slateGray: "#708090",      // Autonomous Feudatories / Disputed / Transitional
  },

  // Water Stress & Status Palettes (Preserved from JalSuraksha core)
  waterStatus: {
    safe: {
      bg: "#064e3b",
      border: "#059669",
      text: "#34d399",
      badge: "#10b981",
      label: "Safe / Abundant",
    },
    semiCritical: {
      bg: "#78350f",
      border: "#d97706",
      text: "#fde68a",
      badge: "#f59e0b",
      label: "Semi-Critical",
    },
    critical: {
      bg: "#7c2d12",
      border: "#ea580c",
      text: "#fdba74",
      badge: "#f97316",
      label: "Critical",
    },
    overExploited: {
      bg: "#7f1d1d",
      border: "#dc2626",
      text: "#fca5a5",
      badge: "#ef4444",
      label: "Over-Exploited",
    },
  },

  // Typography
  typography: {
    fontDisplay: "var(--font-playfair), 'Playfair Display', 'Merriweather', 'Cinzel', Georgia, serif",
    fontUi: "var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontMono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  },

  // Standard Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // Easing and motion (respects prefers-reduced-motion)
  motion: {
    transitionFast: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
    transitionNormal: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    transitionSlow: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    mapColorTransition: "fill 0.35s ease, stroke 0.2s ease",
  },
} as const;

export type ThemeMode = "dark" | "light";
export type CategoricalColorKey = keyof typeof tokens.categorical;
