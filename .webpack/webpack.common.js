const path = require('path')
const ForkTSCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    environment: {
      arrowFunction: false,
      const: false,
      destructuring: false,
      forOf: false
    },
    filename: 'index.min.js',
    globalObject: 'this',
    library: {
      amd: 'test2134',
      commonjs: 'test2134',
      root: 'Test2134'
    },
    libraryExport: 'default',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../dist/')
  },
  plugins: [
    new CleanPlugin(),
    new ForkTSCheckerPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
}
