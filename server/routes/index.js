// node服务器只渲染index.html，路由功能在前端编写
const router = require('koa-router')()

const upload = require('./upload')
const user = require('./user')

router.use('/upload', upload.routes(), upload.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())

module.exports = router