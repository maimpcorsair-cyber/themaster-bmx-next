import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Monochrome palette
        black: "#000000",
        white: "#FFFFFF",
        gray: {
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0A0A0A",
        },
        // Minimal accent
        accent: "#FF3B3B",
      },
      fontFamily: {
        prompt: ["Prompt", "sans-serif"],
      },
      // Clean borders
      borderColor: {
        DEFAULT: "#262626",
      },
    },
  },
  plugins: [],
};
export default config;
