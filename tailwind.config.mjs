/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Almendra']
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite'
      }
    }
  },
  plugins: []
}
