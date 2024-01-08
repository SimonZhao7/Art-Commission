/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'slight-gray': '#F9F9F9',
        'light-gray': '#F5F5F5',
        'med-gray': '#D6D6D6',
        'jet': '#292929',
        'jet-hover': '#454545',
        'highlight': '#76ABA8',
        'highlight-hover': '#68A19E',
        'err': '#DA2B2B',
      }
    },
  },
  plugins: [],
}
