const  merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const config = require('../config')

// webpack-hot-middleware的用法
// https://segmentfault.com/a/1190000011761345
Object.keys(common.entry).forEach(function (name) {
  common.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(common.entry[name])
})

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    // webpack4.x干掉
    // new webpack.DefinePlugin({
    //   'process.env': config.dev.env
    // }),
  ]
})