const path = require('path')

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    app: ['./src/server.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  },
}
