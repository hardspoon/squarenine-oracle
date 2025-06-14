/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep space theme inspired by squarenine.xyz
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6ff',
          300: '#a4b8ff',
          400: '#8092ff',
          500: '#6366f1', // Main purple
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b', // Main gold
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b', // Dark surface
          900: '#0f172a', // Darker surface
        },
        // Keep existing colors for compatibility
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
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [],
}
