/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B1B2F',
        secondary: '#D6D6D6',
      },
      fontFamily:{
        heading: ['poppins', 'serif'], // For headings
        body: ['sono', 'sans-serif'], // For body text
      }
    },
  },
  plugins: [],
}

