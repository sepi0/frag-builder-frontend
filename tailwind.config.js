module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'spikeAquamarineBlue': "url('https://i.ibb.co/ngCzdxv/obrazok.png')" 
      })
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
