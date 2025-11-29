/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
         primary:"#3B2F2F",
         secondary: "#FFF8F1",
         success: "#7BC47F",
         brand:"#C85A2B",
         input:'#FFF5EA',
      },
      borderColor: {
        primary: "#E7DACE",
      }
    },
  },
  plugins: [],
}