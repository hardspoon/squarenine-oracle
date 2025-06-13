/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
      },
      spacing: {
        'touch': '44px',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      fontSize: {
        'touch': ['18px', '1.4'],
      },
      colors: {
        cream: {
          50: '#fefef8',
          100: '#fdfdee',
          200: '#fbfad5',
          300: '#f7f4b3',
          400: '#f1e98a',
          500: '#e7d865',
          600: '#d1c153',
          700: '#b5a546',
          800: '#93833d',
          900: '#786d35',
        },
        'mystic-purple': {
          50: '#f8f6ff',
          100: '#f1ecff',
          200: '#e5dcff',
          300: '#d1c0ff',
          400: '#b798ff',
          500: '#9b6bff',
          600: '#8b42ff',
          700: '#7c2aff',
          800: '#6b1fd9',
          900: '#5a1bb3',
        },
        gold: {
          50: '#fffef7',
          100: '#fffbeb',
          200: '#fef3c7',
          300: '#fde68a',
          400: '#fcd34d',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
