const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'production',
  target: 'node',
  entry: {
    app: ['./src/server.mjs']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  },
  externals: [nodeExternals()],
}
