/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        amarante: ['Amarante', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'be-vietnam-pro': ['Be Vietnam Pro', 'sans-serif'],
      },
      colors: {
        'brand-purple': '#9333EA',
      },
      backgroundImage: {
        'label-gradient': 'linear-gradient(94.36deg, #9333EA -27.25%, #2D2D4B 118.45%)',
      },
      boxShadow: {
        'label-shadow': '0 32px 24px -16px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}