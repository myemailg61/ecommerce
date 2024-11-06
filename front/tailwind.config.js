/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        font1: ['Font1', 'poppins'],

      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(135deg, #4a90e2, #003366)',
      },
    },
  },
  plugins: [],
}
