/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        botanical: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#74c69d',
          400: '#52b788',
          500: '#40916c',
          600: '#2d6a4f',
          700: '#1b4332',
          800: '#143628',
          900: '#081c15',
          950: '#040e0a',
        },
        ivory: {
          50: '#ffffff',
          100: '#fdfbf7',
          200: '#f9f6ef',
          300: '#f2ece0',
          400: '#e8ddc9',
          500: '#dac8ad',
        },
        blush: {
          50: '#fff8f6',
          100: '#fceade',
          200: '#f8d5c4',
          300: '#f2b59d',
          400: '#e88f70',
          500: '#de6f4b',
        },
        terracotta: {
          50: '#fdf4f2',
          100: '#f9e4e0',
          200: '#f3c9c1',
          300: '#e9a396',
          400: '#dd7665',
          500: '#ca523e',
          600: '#b23d2b',
        },
        sage: {
          50: '#f4faf6',
          100: '#e5f5ec',
          200: '#cceadc',
          300: '#a3d8be',
          400: '#72be9b',
          500: '#4c9f7a',
          600: '#387f61',
        },
        petal: {
          50: '#fdf2f7',
          100: '#fce7f2',
          200: '#facfe4',
          300: '#f6a5cd',
          400: '#ee6eab',
          500: '#e0428d',
          600: '#c52872',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(27, 67, 50, 0.07), 0 4px 6px -2px rgba(27, 67, 50, 0.03)',
        'elevated': '0 10px 25px -5px rgba(27, 67, 50, 0.1), 0 8px 10px -6px rgba(27, 67, 50, 0.05)',
        'floating': '0 20px 35px -10px rgba(27, 67, 50, 0.18)',
      }
    },
  },
  plugins: [],
}
