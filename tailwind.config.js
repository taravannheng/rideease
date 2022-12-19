/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      'primary': '#0071ff',
      'neutral-light': '#fff',
      'neutral-grey-1': '#f5f5f5',
      'neutral-grey-2': '#d9d9d9',
      'neutral-grey-3': '#9d9d9d',
      'neutral-grey-4': '#555',
      'neutral-dark': '#262626',
      'status-error': '#ef084e',
      'status-warning': '#ffeb00',
      'status-success': '#00d500',
    },
    extend: {},
  },
  plugins: [],
}
