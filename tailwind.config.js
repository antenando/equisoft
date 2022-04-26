module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      screens: {
        xxs: { max: '320px' },
        xsmax: { max: '639px' },
      }
    },
  },
  plugins: [],
}
