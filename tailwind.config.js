/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/components/**/*.{html,css,tsx,jsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CF2CE7",
        gray: "#5C7285",
      },
      width: {
        xs: "16rem",
        sm: "20rem",
        md: "32rem",
        xl: "36rem",
      },
      fontSize: {
        md: "12px",
      },
      listStyleType: {
        decimal: "decimal",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
