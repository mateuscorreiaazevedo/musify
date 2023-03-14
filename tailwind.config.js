/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {}
  },
  plugins: [
    require('tailwind-scrollbar')
  ]
}
