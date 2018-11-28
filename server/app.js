const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const path = require('path')

// 使用ctx.body解析中间件
app.use(bodyParser())

// 配置存储session信息的mysql
let store = new MysqlSession({
  user: 'root',
  password: '123456',
  host: 'localhost',
  database: 'blog'
})

// 存放sessionId的cookie配置
let cookie = {
  maxAge: '', // cookie有效时长
  expires: '',  // cookie失效时间
  path: '', // 写cookie所在的路径
  domain: '', // 写cookie所在的域名
  httpOnly: '', // 是否只用于http请求中获取
  overwrite: '',  // 是否允许重写
  secure: '',
  sameSite: '',
  signed: '',
}

// 使用session中间件
app.use(session({
  key: 'SESSION_IDS',
  store: store,
  cookie: cookie
}))


// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(static(
  path.join( __dirname,  staticPath)
))

const routes = require('./routes')

// 加载路由中间件
app
  .use(routes.routes())
  .use(routes.allowedMethods())

app.listen(2001, () => {
  console.log('app start at port 2001')
})