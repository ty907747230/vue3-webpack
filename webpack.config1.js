
const path = require('path');
const webpackMerge = require('webpack-merge').default;
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    'index' : path.join(__dirname, 'src/index.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
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
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      { 
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(), 
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),  
  ],
  // externals: {
  //   'vue': 'window.Vue'
  // }
}

if (process.env.NODE_ENV === 'development') {
  config = webpackMerge(baseConfig, {
    devtool: 'inline-cheap-module-source-map', 
    devServer: {
      static: {
        directory: path.join(__dirname),
      },
      port: 6001,
      hot: false,
      compress: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Hello Vue',
        filename: 'index.html',
        template:'./index.html',
        minify: false,
      })
    ]
  })
} else {
  config = webpackMerge(baseConfig, {
    optimization: {
      minimizer: [
        new TerserPlugin({}),
        new CssMinimizerPlugin({}),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Hello Vue',
        filename: 'index.html',
        template:'./index.html',
        minify: false,
      })
    ]
  })
}

module.exports = config;