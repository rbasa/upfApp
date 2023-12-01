/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ['./src/views/*.ejs', "./src/views/**/*.{html,js,ejs}", './src/***/**/*.ejs',],
  // content: ["./src/**/*.{html,js,ejs}", './src/views/*.ejs', "./src/views/**/*.{html,js,ejs}", './src/***/**/*.ejs',],
  content: ["./src/views/**/*.ejs"],
  theme: {
    extend: {
      backgroundImage: {
        cart: "url('/cart.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'upfc-lime' : '#2BFF00',
        'upfc-blue': '#262432',
        'upfc-blue2': '#38b6ff',
        'upfc-gray': '#5a5863',
        'upfc-red': '#F24822',
        'upfc-yellow': '#FBFF47',
        'input-gray': '#8b8b8f'
      }
    },
    fontFamily: {
      sans: ['Barlow Semi Condensed', 'Helvetica', 'Arial', 'sans-serif'],
    },
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};