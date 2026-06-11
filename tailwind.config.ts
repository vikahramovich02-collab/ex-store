import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-inter)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      colors: {
        black: "#0a0a0a",
        white: "#ffffff",
        gray: {
          50: "#fafafa",
          100: "#f4f4f4",
          200: "#e8e8e8",
          300: "#d0d0d0",
          400: "#a0a0a0",
          500: "#6b6b6b",
          600: "#4a4a4a",
          700: "#333333",
          800: "#1f1f1f",
          900: "#111111",
        },
      },
      letterSpacing: {
        widest: "0.3em",
        wider: "0.15em",
        wide: "0.08em",
      },
      transitionDuration: {
        "400": "400ms",
      },
    },
  },
  plugins: [],
};

export default config;
