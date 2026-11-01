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
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        chai: {
          50: "#FAF7F2",
          100: "#F3ECE1",
          200: "#E6D6C3",
          300: "#D4B99D",
          400: "#BC9671",
          500: "#9E6F45",
          600: "#805434",
          700: "#633F28",
          800: "#492E1E",
          900: "#2F1E14",
          950: "#1A0F0A",
        },
        cream: {
          50: "#FFFDF9",
          100: "#FDFBF5",
          200: "#FAF6EB",
          300: "#F5EFE0",
          400: "#ECE2CD",
        },
        warmAmber: {
          500: "#D97706",
          600: "#B45309",
        }
      },
    },
  },
  plugins: [],
};
export default config;
