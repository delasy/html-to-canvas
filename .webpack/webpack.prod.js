const TerserPlugin = require('terser-webpack-plugin')
const { merge } = require('webpack-merge')

const common = require('./webpack.common')
const packageInfo = require('../package.json')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        parallel: true,
        terserOptions: {
          format: {
            comments: false,
            preamble: '/*!\n' +
              ` * Test2134 v${packageInfo.version}\n` +
              ' * Copyright (c) Aaron Delasy\n\n' +
              ' * Unauthorized copying of this file, via any medium is strictly prohibited\n' +
              ' * Proprietary and confidential\n' +
              ' */'
          }
        }
      })
    ]
  }
})
