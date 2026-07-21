/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FBFAF7',
        'paper-dim': '#F2EFE7',
        ink: '#1B2430',
        'ink-soft': '#5B6472',
        'seal-blue': '#1F3A5F',
        'dry-seal-red': '#A8322D',
        bronze: '#9C7A34',
        hairline: '#DAD5C9',
        // Semantic surface tokens (replaces scattered hardcoded hex)
        'amber-tint': '#FEF7E6',
        'amber-line': '#F5D485',
        'sky-tint': '#E8F4F8',
        'sky-line': '#B8DCE8',
        'green-tint': '#E8F4E8',
        'green-line': '#B8DCB8',
        'red-tint': '#FEE8E6',
        'red-line': '#F5B8B8',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['"Public Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}
