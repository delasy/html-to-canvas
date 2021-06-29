const HtmlPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')

const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    injectClient: false,
    port: 8080
  },
  plugins: [
    new HtmlPlugin({
      inject: false,
      scriptLoading: 'blocking',
      templateContent: ({ htmlWebpackPlugin: htmlPlugin }) => {
        return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Test2134</title>
    ${htmlPlugin.tags.headTags}
  </head>
  <body style="margin: 0;">
    <div id="root" style="height: 100vh; left: 0; position: fixed; top: 0; width: 100vw;"></div>
    ${htmlPlugin.tags.bodyTags}
    <script>
      new Test2134().init('#root')
    </script>
  </body>
</html>`
      }
    })
  ]
})
