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
    css: ['./src/tailwind.css'],
  },
  theme: {
    extend: {
      backgroundImage: theme => ({
        'aquaspikes': "url('./media/aquaspikes.svg')",
        'purplespikes': "url('./media/purplespikes.svg')",
        'bublinky-purple-blue': "url('./media/bublinky-purple-blue.svg')",
        'spikeRedLime': "url('https://i.ibb.co/bRHZxgW/Group-2.png')",
        'pcCaseBackground': "url('https://i.ibb.co/f0kPJFS/OBR2.png')",
        'pcComponentsBackground': "url('https://i.ibb.co/fnhDvHG/OBR1.png')",
        'obrazok-zostavy': "url('./media/zostavy.svg')",
        'obrazok-konfigurator': "url('./media/konfigurator.svg')"
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
          '500': '#343434'
        },
        bubblegumRed: {
          '500': '#FF1948'
        },
        babyBlue: {
          '500': '#0DBCFF'
        },
        fragBlue: {
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
