/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html", // If you have Tailwind classes in your index.html
      "./src/**/*.{js,ts,jsx,tsx}", // This is the MOST important line!
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }