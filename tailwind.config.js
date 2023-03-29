/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        noto: ['Noto Sans JP', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: { opacity: ['disabled'] },
  },
  plugins: [],
}
