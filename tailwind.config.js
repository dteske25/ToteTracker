/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-color': 'var(--accent-color)',
        'accent-color-dark': 'var(--accent-color-dark)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}