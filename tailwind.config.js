/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': 'rgba(128, 191, 191)',
        'custom-hsl': 'hsl(180, 20%, 50%)',
      },
    },
  },
  plugins: [
    require('daisyui'), // DaisyUI for UI components
  ],
}
