/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true
    },
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif']
      },
      colors: {
        'grey': '#687684',
        'darkblue': '#2795D9',
        'lightblue': '#4C9EEB',
        'black': '#000000',
        'white': '#FFFFFF',
        'lighter': '#E1E8ED',
        'lightest': '#F5F8FA',
      }
    },
  },
  plugins: [
  ],
}