/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef4fa',
          100: '#d9e8f5',
          200: '#b3d1eb',
          300: '#8db9e1',
          400: '#679fd7',
          500: '#4186cd',
          600: '#3469a4',
          700: '#274d7b',
          800: '#1a3052',
          900: '#0d1429',
        },
        secondary: {
          50: '#fdf8f0',
          100: '#f9eddc',
          200: '#f3dbb9',
          300: '#edc996',
          400: '#e7b773',
          500: '#e1a550',
          600: '#b48440',
          700: '#876330',
          800: '#5a4220',
          900: '#2d2110',
        },
      },
    },
  },
  plugins: [],
}
