var loaders = require('./loaders')
var plugins = require('./plugins')
var resolve = require('./resolve')

module.exports = {
  bail: true,
  entry: './src/index.js',
  output: {
    path: __dirname + '/../dist',
    libraryTarget: 'umd',
    library: 'ReactFlex',
    filename: 'index.js'
  },
  plugins: plugins,
  module: {
    loaders: loaders,
  },
  resolve: resolve
}