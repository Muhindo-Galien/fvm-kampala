module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display:  ["Poppins", "sans-serif"],
      body:  ["Poppins", "sans-serif"],
    },
    extend: {
      screens: {
        mf: '990px',
        cr: '500px'
      },
      keyframes: {
        'slide-in': {
          '0%': {
            '-webkit-transform': 'translateX(120%)',
            transform: 'translateX(120%)',
          },
          '100%': {
            '-webkit-transform': 'translateX(0%)',
            transform: 'translateX(0%)',
          },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
      },
    },
  },
   fontFamily: {
      globalFont: ["Poppins", "sans-serif"],
    },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
