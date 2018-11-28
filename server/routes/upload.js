/**
 * 接口文件
 */
const router = require('koa-router')()
const { uploadFile } = require('../util/upload')
const path = require('path')

router.post('/uploadImg', async ( ctx ) => {
  let result = { success: false }
  let serverFilePath = path.join( __dirname, 'static/image' )
  
  result = await uploadFile( ctx, {
    fileType: 'album',
    path: serverFilePath
  })
  ctx.body = result
})

module.exports = router