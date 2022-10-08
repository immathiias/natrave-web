/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mx': '336px',
      // => @media (min-width: 336px) { ... }
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'md': '768px',
      // => @media (min-width: 1024px) { ... }
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1280px) { ... }
      'tall': { 'raw': '(min-height: 800px)' },
      // => @media (min-height: 800px) { ... }
    },
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '18px'],
      base: ['16px', '24px'],
      xl: ['20px', '28px'],
      '2xl': ['24px', '32px'],
      '3xl': ['32px', '40px'],
      '4xl': ['48px', '56px'],
    }
    ,
    extend: {
      container: {
        center: true,
      },
      colors: {
        black: '#0B0E16',
        grey: {
          300: '#B1B4BD',
          500: '#91949D',
          700: '#696C74'
        },
        white: '#F4F6FF',
        red: {
          300: '#BB2E57',
          500: '#AF053F',
          700: '#300219'
        },
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
