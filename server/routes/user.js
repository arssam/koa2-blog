const router = require('koa-router')()
const handleSql = require('../controller/handleSql')

router.get('/getUserList', async ctx => {
  let sql = 'SELECT * FROM USER'
  let dataList = await handleSql( sql )
  ctx.body = dataList
})

router.post('/signup', async ctx => {
  let sql = 'INSERT INTO USER(name,age,sex) VALUES(?,?,?)'
  const { name, age, sex } = ctx.request.body
  const addParams = [name, age, sex]
  await handleSql( sql, addParams )
  ctx.body = {}
})

module.exports = router