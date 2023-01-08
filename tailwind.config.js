/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns:
      {
        '20/80': '20% 80%',
        'fixed': '40px 260px',
      },
      width: 
      {
        '700': '700px',
      },
      colors: 
      {
        'redshay': '#E5C9C9'
      }
    },
  },
  plugins: [],
};
