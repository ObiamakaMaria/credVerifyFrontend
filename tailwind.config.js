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
        beVietnamPro: ['Be Vietnam Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}