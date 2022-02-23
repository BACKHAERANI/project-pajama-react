module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slider: {
          '0%': {
            transform: 'translateX(0px)',
          },
          '100%': {
            transform: 'translateX(-1000px)',
          },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 1s infinite',
        fadeIn: 'fadeIn 2s ease-in forwards',
        slider: 'slider 10s linear infinite',
      },
      flexBasis: {
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
        // '1/7': '14.2857143%',
        // '2/7': '28.5714286%',
        // '3/7': '42.8571429%',
        // '4/7': '57.1428571%',
        // '5/7': '71.4285714%',
        // '6/7': '85.7142857%',
      },
    },
  },
  variants: {
    animation: ['responsive', 'motion-safe', 'motion-reduce'],
  },
  plugins: [],
};
