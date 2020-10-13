module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'spikeAquamarineBlue': "url('https://i.ibb.co/ngCzdxv/obrazok.png')",
        'spikeRedLime': "url('https://i.ibb.co/bRHZxgW/Group-2.png')"
      }),
      colors: {
        aquamarine: {
          '100': '#BEFFED',
          '300': '#74FFD9',
          '500': '#00FFBA',
        },
        aqua: {
          '100': '#AEFFF6',
          '300': '#74FFF8',
          '500': '#00FFF8',
        }
      }
    },
    fontFamily: {
      'open-sans': ['Open Sans', 'sans-serif'],
      'pacifico': ['Pacifico', 'cursive'],
      'archivo': ['Archivo Black', 'sans-serif'],
      'cairo': ['Cairo', 'sans-serif'],
      'mulish': ['Mulish', 'sans-serif']
    },
    height: {
      'big': '600px',
      'big-2': '1200px',
      'big-3': '1600px'
    },
  },
  variants: {},
  plugins: [],
}
