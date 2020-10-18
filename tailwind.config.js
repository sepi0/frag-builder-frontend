module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: [
      'src/**/*.js',
      'src/**/*.jsx',
      'public/**/*.html',
    ],
  },
  theme: {
    extend: {
      backgroundImage: theme => ({
        'aquaspikes': "url('./media/aquaspikes.svg')",
        'purplespikes': "url('./media/purplespikes.svg')",
        'bublinky-purple-blue': "url('./media/bublinky-purple-blue.svg')",
        'obrazok-zostavy': "url('./media/zostavy.svg')",
        'obrazok-konfigurator': "url('./media/konfigurator.svg')",
        'bubblewave': "url('./media/bublewave.svg')",
        'tetris': "url('./media/tetris.svg')",
        'tetris2': "url('./media/tetris2.svg')"
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
        },
        carbon: {
          '500': '#343434',
          '900': '#101010'
        },
        bubblegumred: {
          '500': '#FF1948'
        },
        babyblue: {
          '500': '#0DBCFF'
        },
        fragblue: {
          '500': '#0F3BD8'
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
      '360p': '360px',
      '720p': '720px',
      '1080p': '1080px',
      '1440p': '1440px'
    },
    width: {
      '360p': '640px',
      '720p': '1280px',
      '1080p': '1920px',
      '1440p': '2560px'
    }
  },
  variants: {},
  plugins: [],
}
