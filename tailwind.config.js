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
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['"Public Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
