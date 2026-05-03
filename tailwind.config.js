/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF6B2B',
          saffron: '#FF9933',
          navy: '#1A1A2E',
          navyMid: '#16213E',
          navyDeep: '#0F3460',
          green: '#138808',
          greenDark: '#0F6A06',
        },
        surface: {
          light: '#F8F9FA',
          card: '#FFFFFF',
          dark: '#0D1117',
          darkCard: '#161B22',
          darkHover: '#1C2128',
        },
        ink: {
          primary: '#0D1117',
          secondary: '#4B5563',
          tertiary: '#9CA3AF',
          onDark: '#E2E8F0',
          mutedDark: '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
        telugu: ['Noto Sans Telugu', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 45px -20px rgba(15, 23, 42, 0.18)',
        civic: '0 4px 20px rgba(255,107,43,0.15)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'fade-in': 'fade-in 0.4s ease-out forwards',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
