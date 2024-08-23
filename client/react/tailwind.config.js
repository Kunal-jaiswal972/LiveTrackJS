/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontWeight: {
        extralight: 200,
        regular: 400,
        medium: 500,
        bold: 700,
        extrabold: 800,
      },
      fontStyle: {
        italic: "italic",
      },
    },
  },
  plugins: [],
};
