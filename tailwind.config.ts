import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors - Very dark gray + Dark green accent
        background: {
          DEFAULT: '#0A0A0A',
          secondary: '#0E0E0E',
          elevated: '#1A1A1A',
        },
        foreground: {
          DEFAULT: '#E6E6E6',
          muted: '#B7B7B7',
          subtle: '#8A8A8A',
        },
        accent: {
          DEFAULT: '#22c55e',
          light: '#4ade80',
          dark: '#16a34a',
          glow: 'rgba(34, 197, 94, 0.3)',
        },
        border: {
          DEFAULT: '#2A2A2A',
          hover: '#3A3A3A',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['var(--font-poppins)', 'Poppins', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'tilt': 'tilt 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 122, 24, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(255, 122, 24, 0.6)' },
        },
        tilt: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '160': '160ms',
        '200': '200ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

export default config
