/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.jsx",
    "./*.js",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#e0e7ef',
          200: '#c7d5e2',
          300: '#9bbbd4',
          400: '#6a9ac3',
          500: '#4a7fb5',
          600: '#3a6396',
          700: '#2f4f7a',
          800: '#283e63',
          900: '#233354',
          950: '#1a2640',
        },
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [],
}
