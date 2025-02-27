/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins: ["Poppins", "serif"],
        outfit: ["Outfit", "serif"],
        lexend: ["Lexend", "serif"],
        cursive: ["Rouge Script", "serif"]
      }
    },
  },
  plugins: [],
}