module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#f4f4f4',
        'dark': 'rgba(0, 0, 0, 0.7)',
      },
      borderRadius: {
        '6': '6px',
        '9': '9px',
        'half': '50%',
      },
      borderWidth: {
        'default': '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      boxShadow: {
        'card': '0 2px 20px 2px rgba(0, 0, 0, 0.15)',
        'left': '2px 0 5px -2px rgba(0, 0, 0, 0.5)',
      },
      colors: {
        'gray': {
          '100': '#f0f0f0',
          '200': '#eaebec',
          '400': '#a2a2a2',
          'dark': '#2e2e2e'
        },
        'green': {
          'honeydew': '#e9ffea',
        },
        'yellow': {
          'cornsilk': '#fff8e1',
        },
      },
      fontFamily: {
        'primary': ['Poppins'],
      },
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'base': '16px',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '1.5xl': '1.3125rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '4.5xl': '2.625rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
      },
      flex: {
        '1': '1 1 0%',
        'auto': '1 1 auto',
        'initial': '0 1 auto',
        'inherit': 'inherit',
        'none': 'none',
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
        '6': '6 6 0%',
        '7': '7 7 0%',
      },
      letterSpacing: {
        'normal': 'normal',
        '0.15': '0.15px',
        '0.28': '0.28px',
        '-0.58px': '-0.58px',
        '-0.67px': '-0.67px',
        '-0.75px': '-0.75px',
        '-1.75': '-1.75px',
      },
      lineHeight: {
        'normal': 'normal',
        '1.33': '1.33',
        '1.75': '1.75',
        '1.83': '1.83',
      },
      minHeight: {
        'content': 'calc(100vh - 327px)',
      },
      spacing: {
        '8.33': '2.08rem',
        '7.5': '1.875rem',
        '10.4': '2.6rem',
        '10.5': '2.625rem',
        '12.5': '3.125rem',
        '50': '12.5rem',
        '59.5': '14.875rem',
        '108': '27rem',
        'pc-62.75': '62.75%',
        'pc-67.53': '67.53%',
        'full': '100%',
      },
      textColor: {
        'primary': '#2e2e2e',
        'blue': {
          'cornflower': '#4588ff',
        },
        'green': {
          'lime': '#21c434',
        },
        'yellow': {
          'broom': '#e9c727',
        },
      },
      textShadow: {
        'default': '0 2px 4px rgba(0, 0, 0, 0.2)',
      },
    },    
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  variants: {},
  plugins: [
    require('tailwindcss-textshadow')
  ],
}