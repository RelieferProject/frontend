const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', ...defaultTheme.fontFamily.sans],
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
      6: '6px',
      8: '8px',
    },
    extend: {
      gridTemplateColumns: {
        20: 'repeat(20, minmax(0,1fr))',
      },
      scale: {
        102: '1.02',
      },
      animation: {
        flyab: 'flyab 3s cubic-bezier(.45,-.36,.72,1.03) infinite',
        fly: 'fly 3s cubic-bezier(.45,-.36,.72,1.03) infinite',
      },
      keyframes: {
        flyab: {
          '0%, 100%': { transform: 'translateY(-50%)' },
          '50%': { transform: 'translateY(-45%)' },
        },
        fly: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(-10%)' },
        },
      },
      transitionTimingFunction: {
        'shrink-and-pop': 'cubic-bezier(0.38, -0.36, 0.56, 1.38)',
      },
      gradientColorStops: (theme) => ({
        primaryl: theme('colors.primary1'),
        primaryr: theme('colors.primary2'),
        secondaryl: theme('colors.secondary1'),
        secondaryr: theme('colors.secondary2'),
      }),
      screens: ({ screens }) => ({
        max2xl: { max: '1535px' },
        maxxl: { max: '1279px' },
        maxlg: { max: '1023px' },
        maxmd: { max: '767px' },
        maxsm: { max: '639px' },
        ...screens,
      }),

      colors: ({ colors }) => ({
        'bg-dark': {
          100: '#32333a',
          dark: '#001321',
          medium: '#011e30',
          light: '#ffffff1e',
          DEFAULT: '#1d1e21',
        },
        'bg-light': {
          dark: '#ffffff4d',
          medium: '#ffffff26',
          light: '#ebf0ff',
          blue: '#829aa6',
        },
        'bg-purple': {
          default: '#120338',
          card: '#20003b',
        },
        text: {
          main: '#ffffff',
          main2: '#ebf0ff',
          blue: '#00a1fa',
          gray: '#829aa6',
          red: '#ff5757',
          black: '#000000',
          dark1: '#001321',
          dark2: '#212529',
          purple: '#363062',
        },
        primary1: '#a200ff',
        primary2: '#ff7c6e',
        secondary1: '#5364c9',
        secondary2: '#64479c',
        ...colors,
        subText: '#ce02c7',
        leftBorder: '#420270',
        textBackground: '#2a004c',
        hoverCard: '#3e0170',
        martingaleHl: '#9e036d',
        historyBg: {
          500: '#3d71f4',
          400: '#7ea0f7',
        },
      }),
    },
  },
  variants: {},
  plugins: [],
};
