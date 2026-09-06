/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",           
    "./pages/**/*.html",      
    "./assets/js/**/*.js",
    "./src/**/*.{html,js}"   
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        'brand-blue': '#2C4798', 
      }
    },
  },
  plugins: [],
}