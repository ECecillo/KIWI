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
        'dark-gradient-right': '#FFFFFF',
        'dark-gradient-middle' : '#784BA0',
        'dark-gradient-left' : '#121315',
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
/* background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
 background-blend-mode: multiply,multiply; */