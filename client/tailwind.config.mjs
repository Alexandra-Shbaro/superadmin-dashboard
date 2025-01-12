/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        softBlack:'#2C3333',
        offWhite:'#FAFAFA',
        lightGrey:'#E7E7E7', 
        mediumGrey:'#5C5C5C',
        logoOrange:'#FF8A00',
        logoYellow:'#FFD700',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
