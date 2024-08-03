/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    // Tambahkan plugin yang Anda butuhkan di sini
  ],
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true, // Mode eksperimental applyComplexClasses
  },
};
