/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Master Brand Identity Palette
        brand: {
          ivory: '#FAF8F3',
          white: '#FFFFFF',
          forest: '#234536',
          botanical: '#17392C',
          sage: '#DCE5D8',
          blush: '#F3E2E3',
          rose: '#C7838B',
          text: '#242822',
          muted: '#747970',
          border: '#E8E5DE',
        },
        botanical: {
          50: '#f4f7f5',
          100: '#e5eee9',
          200: '#cce0d5',
          300: '#a3c7b4',
          400: '#73a78d',
          500: '#4f896d',
          600: '#3c6e56',
          700: '#234536', // Deep forest green
          800: '#17392c', // Dark botanical green
          900: '#10281f',
          950: '#071510',
        },
        ivory: {
          50: '#ffffff',
          100: '#faf8f3', // Warm ivory
          200: '#f5f0e6',
          300: '#ebe3d3',
          400: '#ded3be',
          500: '#c7b89f',
        },
        blush: {
          50: '#fdf8f8',
          100: '#f9f0f1',
          200: '#f3e2e3', // Muted blush pink
          300: '#e7c5c7',
          400: '#d79fa3',
          500: '#c7838b', // Rose accent
          600: '#b0676f',
        },
        terracotta: {
          50: '#fdf5f2',
          100: '#fbe8e2',
          200: '#f6d3c8',
          300: '#eeaea0',
          400: '#df7c67',
          500: '#c75941',
          600: '#aa422c',
        },
        sage: {
          50: '#f7f9f6',
          100: '#eff3ed',
          200: '#dce5d8', // Soft sage
          300: '#bed0b7',
          400: '#9cb593',
          500: '#7c9973',
          600: '#5f7957',
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
        'subtle': '0 1px 3px 0 rgba(35, 69, 54, 0.05), 0 1px 2px -1px rgba(35, 69, 54, 0.03)',
        'soft': '0 4px 20px -2px rgba(35, 69, 54, 0.06), 0 2px 6px -1px rgba(35, 69, 54, 0.03)',
        'elevated': '0 12px 30px -4px rgba(35, 69, 54, 0.09), 0 4px 10px -2px rgba(35, 69, 54, 0.04)',
        'floating': '0 20px 40px -8px rgba(23, 57, 44, 0.14)',
      }
    },
  },
  plugins: [],
}
