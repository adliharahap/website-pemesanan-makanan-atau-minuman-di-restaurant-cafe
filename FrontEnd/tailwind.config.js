/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : theme => ({
          'login_bg' : "url('/src/assets/website_image/login_background.jpg')",
      }),
      fontFamily: {
        'Playwrite': ['Playwrite', 'sans-serif'],
        'Poppins': ['poppins', 'sans-serif'],
      },
      screens: {
        'medium': '800px',
      }
    },
  },
  plugins: [],
}

