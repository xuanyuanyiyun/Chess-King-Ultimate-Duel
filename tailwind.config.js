/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '250px 250px' },
        },
      },
    },
  },
  plugins: [],
};
