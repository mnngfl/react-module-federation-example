const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.bundle.js'
  },
  devServer: {
    port: 3001,
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
    new BundleAnalyzerPlugin(),
    new ModuleFederationPlugin({
      name: 'rmf_container',
      remotes: {
        rmf_child: 'rmf_child@http://localhost:3002/remoteEntry.js'
      }
    }),
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ],
}