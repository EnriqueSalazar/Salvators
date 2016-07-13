module.exports = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel'
  },
  {
    test: /\.scss$/,
    exclude: /node_modules/,
    loader: 'style!css!autoprefixer!sass'
  },
  {
    test: /\.css$/,
    exclude: /node_modules/,
    loader: 'style!css!autoprefixer'
  }
]