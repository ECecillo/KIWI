const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx}",
    "./components/**/*.{js,ts,jsx}",
  ], 
  theme: {
    extend: {
      colors: { 
        'dark-black': '#121315', //
        'dark-transparent-black': '#1e1f20b7',
        'dark-soft-black': '#292B2F', 
        'dark-light-gray': '#36393F',
        'dark-gradient-right': '#04043e',
        'dark-gradient-middle' : '#3e13398f',
        'dark-gradient-left' : '#58121d',
        'dark-white' : '#F1F0F4'
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
      )
    })
  ],
}