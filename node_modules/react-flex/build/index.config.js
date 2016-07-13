
var assign = require('object-assign')

module.exports = assign({}, require('./build.config.js'), {
  bail: true,
  entry: './index.jsx',
  output: {
    filename: 'index.js'
  }
})