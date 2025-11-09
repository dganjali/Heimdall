/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0C10',
        neon: '#FF00D0',
        lime: '#A8FF00'
      }
    },
  },
  plugins: [],
}
