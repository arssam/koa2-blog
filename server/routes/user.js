const router = require('koa-router')()
const handleSql = require('../controller/handleSql')

router.get('/getUserList', async ctx => {
  let sql = 'SELECT * FROM USER'
  let dataList = await handleSql( sql )
  ctx.body = dataList
})

router.post('/signup', async ctx => {
  let sql = 'INSERT INTO USER(name,age,sex) VALUES(?,?,?)'
  const postData = ctx.request.body
  const addParams = [postData.name, postData.age, postData.sex]
  let dataList = await handleSql( sql, addParams )
  ctx.body = dataList
})

module.exports = router