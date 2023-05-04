/*
 * @Author: asherytang asherytang@tencent.com
 * @Date: 2023-04-18 18:52:57
 * @LastEditors: asherytang asherytang@tencent.com
 * @LastEditTime: 2023-04-23 17:15:23
 * @FilePath: /vue3-webpack/webpack.dev.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//代码分析插件
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  devtool: 'inline-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
};