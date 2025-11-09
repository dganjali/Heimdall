/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B0C10',
          surface: '#1A1B26',
        },
        accent: {
          magenta: '#FF00FF',
          'lime-green': '#00FF00',
          blue: '#0B1AAE',
        },
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 0, 255, 0.5), 0 0 10px rgba(255, 0, 255, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 0, 255, 0.8), 0 0 30px rgba(255, 0, 255, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

