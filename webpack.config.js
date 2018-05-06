const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const prod = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs')
  },
  devtool: prod ? 'source-map' : 'inline-source-map',
  devServer: {
    contentBase: './docs',
    compress: true,
    hot: true,
    port: 3000,
    stats: 'errors-only'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.css$/,
        use: 'css-loader'
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  }
}
