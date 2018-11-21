const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

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
  key: 'SESSION_ID',
  store: store,
  cookie: cookie
}))

// 处理跨域 记得一定要await next()
app.use(async (ctx, next) => {
  ctx.response.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
    'Access-Control-Max-Age': '86400'
  })
  await next()
})

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(static(
  path.join( __dirname,  staticPath)
))

const router = require('../routes')

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(2001, () => {
  console.log('app start at port 2001')
})