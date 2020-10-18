module.exports = {
  plugins: [
    require('tailwindcss'),
    require('postcss-import'),
    require('autoprefixer'),
    require('@fullhuman/postcss-purgecss')({
      content: [
          './src/*.jsx',
          './*.js',
          './src/**/*.jsx',
          './public/index.html'
      ],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
    })
  ]
}