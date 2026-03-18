/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sand: '#f4efe8',
        ink: '#1f2937',
        slateblue: '#355c7d',
        clay: '#d9c2ad',
        pine: '#223127'
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        serif: ['Instrument Serif', 'serif']
      },
      boxShadow: {
        panel: '0 18px 45px -28px rgba(31, 41, 55, 0.35)'
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        rise: 'rise 0.7s ease-out forwards'
      }
    }
  },
  plugins: []
};
