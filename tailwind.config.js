module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}', './index.js'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#6D2BD9',
        'primary-light': '#8B5CF6',
        accent: '#F59E0B',
        dark: '#111B27',
        muted: '#F3F4F6',
      },
      fontFamily: {
        sans: ['Poppins-Regular'],
        semibold: ['Poppins-SemiBold'],
        bold: ['Poppins-Bold'],
      },
    },
  },
  plugins: [],
};
