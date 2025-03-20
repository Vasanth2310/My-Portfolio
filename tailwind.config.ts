import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.5s ease-out 1',
        blink: 'blink 0.8s ease-in-out infinite',
        'fade-up': 'fade-up 0.3s ease-out 1',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'fade-up': {
          '0%': { top: '5px' },
          '100%': { top: '0px' },
        },
      },
      backgroundColor: {
        primary: '#011627',
        secondary: '#011221',
      },
      backgroundImage: {
        'large-glow': "url('../assets/images/bg-lg.svg')",
        'small-glow': "url('../assets/images/bg-sm.svg')",
        'skill-gradient': 'linear-gradient(to right, #011627, #062B48, #011627)', // not in use
      },
      backgroundPosition: {
        'large-glow-position': '110% 30%',
        'small-glow-position': '50% 600%',
      },
      fontFamily: {
        'fira-code': ['Fira Code', 'monospace'],
        inter: ['Inter', 'sans-serif'],
      },
      textColor: {
        primary: '#607B96',
      },
      colors: {
        mint: '#18F2E5',
        indigo: '#5565E8',
      },
    },
  },
  plugins: [],
}
export default config
