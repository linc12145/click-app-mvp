/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A', // Dark background
        accent: '#8B5CF6',  // Purple neon
        neon: '#22D3EE',    // Cyan/Blue neon
      }
    },
  },
  plugins: [],
}
