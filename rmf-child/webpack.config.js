const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.bundle.js',
    publicPath: 'http://localhost:3002/'
  },
  devServer: {
    port: 3002,
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'rmf_child',
      library: { type: 'var', name: 'rmf_child' },
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button.js',
        './Modal': './src/components/Modal.js',
        './App': './src/App.js'
      }
    }),
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ],
}