/*
 * @Author: asherytang asherytang@tencent.com
 * @Date: 2023-04-18 18:53:12
 * @LastEditors: asherytang asherytang@tencent.com
 * @LastEditTime: 2023-04-25 10:56:14
 * @FilePath: /vue3-webpack/webpack.pro.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //将css单独打包，分离css
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //每次运行打包命令前清理文件

// 基础库不打包，直接CDN引入
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
        ],
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",

          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer", {}]],
              },
            },
          },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75, //rem转换单位,1rem为75px
              remPrecision: 8, //px转换为rem时保留的小数点位数
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    // 分离css
    new MiniCssExtractPlugin({
      // 分离文件路径,并给打包之后文件名加上chunkhash
      filename: "./static/css/[name].[chunkhash:8].css",
    }),

    // 压缩css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorOptions: require("cssnano"),
      // cssProcessorOptions: {
      //   map: {
      //     // 不生成内联映射,这样配置就会生成一个source-map文件
      //     inline: false,
      //     // 向css文件添加source-map路径注释
      //     // 如果没有此项压缩后的css会去除source-map路径注释
      //     annotation: true,
      //   },
      // },
    }),
    new CleanWebpackPlugin(),
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: "react",
    //       entry: "https://11.url.cn/now/lib/16.2.0/react.min.js",
    //       global: "React",
    //     },
    //     {
    //       module: "react-dom",
    //       entry: "https://11.url.cn/now/lib/16.2.0/react-dom.min.js",
    //       global: "ReactDOM",
    //     },
    //   ],
    // }),
  ],
};