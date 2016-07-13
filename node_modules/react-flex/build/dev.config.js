
var loaders = require('./loaders')
var resolve = require('./resolve')

module.exports = {
  entry: './index.jsx',
  watchPoll: true,
  module: {
    loaders: loaders
  },
  resolve: resolve,
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    publicPath: '/assets',
    port: 8181,
    host: '0.0.0.0',
    // hot: true,
    historyApiFallback: true
  }
}