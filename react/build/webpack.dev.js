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
  //开发环境下默认启用cache，在内存中对已经构建的部分进行缓存
  //避免其他模块修改，但是该模块未修改时候，重新构建，能够更快的进行增量构建
  //属于空间换时间的做法
  cache: true, 
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