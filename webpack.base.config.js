/*
 * @Author: asherytang asherytang@tencent.com
 * @Date: 2023-04-18 18:53:12
 * @LastEditors: asherytang asherytang@tencent.com
 * @LastEditTime: 2023-04-23 17:55:36
 * @FilePath: /vue3-webpack/webpack.pro.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const path = require('path');
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack')


module.exports = {
  entry: {
    'index' : path.join(__dirname, 'src/index.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[chunkhash:8].js',//命名占位符对应规则：名字+chunkhash值后8位+文件后缀
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /.js$/,
        exclude: /node_modules/, //排除
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, //缓存
          },
        },
      },
      {  
        test: /\.(css|less)$/,
        use: [
          'css-loader',
        ]
      },
      {
        // 小于10k的图片在img下不会有图片文件，而是直接把图片的base64值写到html引入图片的地方
        // 大于10k的图片会放在img下，需要的时候通过http请求下载
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: 'img/[name].[hash:8].[ext]'
        }
    },
    {
        test: /(\.(eot|ttf|woff|woff2|otf)|font)$/,
        loader: 'file-loader',
        options: { outputPath: 'fonts/' }
    }

    ]
  },
  plugins: [
    new VueLoaderPlugin(), 
    // new MiniCssExtractPlugin({
    //   filename: '[name]-[hash:8].css'
    // }),
    new webpack.HotModuleReplacementPlugin(), //更新修改的模块，但是不要刷新页面。这个时候就需要用到模块热替换
    new HtmlWebpackPlugin(
      { 
        title: 'Hello Vue',  //用来生成页面的 title 元素
        filename: 'index.html', //输出的 HTML 文件名，默认是 index.html, 也可以直接配置带有子目录。
        template:'/public/index.html', //模板文件路径，支持加载器，比如 html!./index.html
        hash: false, //如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用。
        compile: true,
        favicon: false,
        //压缩
        minify: {
          html5: true,
          collapseWhitespace: true, //是否去掉空格
          preserveLineBreaks: false,
          minifyCSS: true, //是否压缩html里的css（使用clean-css进行的压缩）
          minifyJS: true, //是否压缩html里的js（使用uglify-js进行的压缩）
          removeComments: false, //是否去掉注释
        },
        cache: true, //如果为 true, 这是默认值，仅仅在文件修改之后才会发布文件。
        showErrors: true, //如果为 true, 这是默认值，错误信息会写入到 HTML 页面中
        chunks: ["index",'commons'], //允许只添加某些块
        excludeChunks: [], //排除只添加某些块
 
        xhtml: false,  
        inject: true, //注入所有的资源到特定的 template 或者 templateContent 中，* * 如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
        // templateParameters: { 
        //   publicPath: path.join(__dirname), 
        //   js: [ './node_modules/vue/dist/vue.runtime.global.js'], 
        // }, 
    }),
    new CleanWebpackPlugin()
  ],
  // externals: {
  //   'vue': 'window.Vue'
  // }, //指定不打包的模块。通常用于首屏加载优化时排除某些模块，打包分析模块插件webpack-bundle-analyzer
  // 其它 Webpack配置代码 
  devServer: { 
    static: { directory: path.join(__dirname), }, //静态资源服务地址
    port: 8080, 
    hot: true, 
    compress: false
  },
  // devServer: {
  //   contentBase: path.join(__dirname, 'static'),    // 告诉服务器从哪里提供内容(默认当前工作目录)
  //   openPage: 'views/index.html',  // 指定默认启动浏览器时打开的页面
  //   index: 'views/index.html',  // 指定首页位置
  //   watchContentBase: true, // contentBase下文件变动将reload页面(默认false)
  //   host: 'localhost', // 默认localhost,想外部可访问用'0.0.0.0'
  //   port: 8080, // 默认8080
  //   inline: true, // 可以监控js变化
  //   hot: true, // 热启动
  //   open: true, // 启动时自动打开浏览器（指定打开chrome，open: 'Google Chrome'）
  //   compress: true, // 一切服务都启用gzip 压缩
  //   disableHostCheck: true, // true：不进行host检查
  //   quiet: false,
  //   https: false,
  //   clientLogLevel: 'none',
  //   stats: { // 设置控制台的提示信息
  //     chunks: false,
  //     children: false,
  //     modules: false,
  //     entrypoints: false, // 是否输出入口信息
  //     warnings: false,
  //     performance: false, // 是否输出webpack建议（如文件体积大小）
  //   },
  //   historyApiFallback: {
  //     disableDotRule: true,
  //   },
  //   watchOptions: {
  //     ignored: /node_modules/, // 略过node_modules目录
  //   },
  //   proxy: { // 接口代理（这段配置更推荐：写到package.json，再引入到这里）
  //     "/api-dev": {
  //       "target": "http://api.test.xxx.com",
  //       "secure": false,
  //       "changeOrigin": true,
  //       "pathRewrite": { // 将url上的某段重写（例如此处是将 api-dev 替换成了空）
  //         "^/api-dev": ""
  //       }
  //     }
  //   },
  //   before(app) { },
  // }
}