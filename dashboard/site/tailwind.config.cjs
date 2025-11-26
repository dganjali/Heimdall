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
        accent: '#60A5FA', // muted blue accent for sleeker look
        emerald: '#10B981' // used for subtle green touches
      }
    },
  },
  plugins: [],
}
