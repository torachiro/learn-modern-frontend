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
      colors: {
        primary: '#6EC1E4',
        secondary: '#54595F',
        text: '#7A7A7A',
        accent: '#61CE70',
        'dark-green': '#06bbbc',
      },
    },
  },
  variants: {
    extend: { opacity: ['disabled'] },
  },
  plugins: [],
}
