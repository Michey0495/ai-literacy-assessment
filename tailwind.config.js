/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ink-black': '#0a0a0a',
        'paper-white': '#fafafa',
        'accent-red': '#c41e3a',
        'gray-900': '#171717',
        'gray-800': '#262626',
        'gray-700': '#404040',
        'gray-400': '#a3a3a3',
        'gray-200': '#e5e5e5',
      },
      fontFamily: {
        sans: ['Zen Kaku Gothic New', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'sans-serif'],
        display: ['Zen Kaku Gothic New', 'sans-serif'],
        serif: ['Noto Serif JP', 'serif'],
      },
      fontSize: {
        'editorial-xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        'editorial-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.03em' }],
        'editorial-base': ['1rem', { lineHeight: '1.7', letterSpacing: '0.01em' }],
        'editorial-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0.01em' }],
        'editorial-xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'editorial-2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        'editorial-3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'editorial-4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.03em' }],
        'editorial-5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
        'editorial-6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
      },
      spacing: {
        'editorial': '6rem',
        'editorial-lg': '8rem',
        'editorial-xl': '12rem',
      },
    },
  },
  plugins: [],
}

