/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/preset");

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [nativewind],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        accent: '#3B82F6',
        neon: '#39FF14',
      },
    },
  },
  plugins: [],
}
