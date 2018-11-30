const express = require('express')
const webpack = require('webpack')
const webpackDebMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const opn = require('opn')
const config = require('../config')

const app = express()
const webpackConfig = require('./webpack.dev')
const compiler = webpack(webpackConfig)

app.use(webpackHotMiddleware(compiler, {
  log: false,
  heartbeat: 2000
}))

app.use(webpackDebMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  // quiet: true
}))

const uri = 'http://localhost:' + config.dev.port

app.listen(5000, () => {
  console.log('app listening on port 5000')
  opn(uri)
})

// TypeScript-Babel-Starter
// https://github.com/Microsoft/TypeScript-Babel-Starter#readme