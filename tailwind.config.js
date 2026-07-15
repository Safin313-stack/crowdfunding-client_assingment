/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6C5CE7',
        secondary: '#00D2A0',
        dark: '#0F0E17',
        surface: '#171622',
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'grid-glow': 'radial-gradient(circle at 20% 20%, rgba(108,92,231,0.25), transparent 40%), radial-gradient(circle at 80% 60%, rgba(0,210,160,0.2), transparent 40%)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 0px rgba(108,92,231,0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(108,92,231,0.7)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        glowPulse: 'glowPulse 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
