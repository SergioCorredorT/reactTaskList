/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  "darkMode": "class",
  theme: {
    extend: {
      boxShadow: {
        't-white': '0 -1px 3px white',
        'b-white': '0 1px 3px white',
        't-black': '0 -1px 3px black',
        'b-black': '0 1px 3px black'
      }
    },
  },
  plugins: [],
}

