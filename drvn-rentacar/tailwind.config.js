/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0E1117",
        surface: "#171B24",
        surface2: "#1E232F",
        ink: "#ECEEF3",
        inkDim: "#8B92A3",
        amber: "#F5B700",
        teal: "#35D0A0",
        line: "#2A3040",
      },
      fontFamily: {
        display: ["'Barlow Condensed'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
