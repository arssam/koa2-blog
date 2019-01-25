const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 可以是字符串、数组或者对象
  entry: {
    index: './src/index.tsx'
  },
  output: {
    // 打包后输出文件的名字，如果只有一个文件，你可以直接写死，如果不是的话就需要用到模板了，比如[name]、[hash] 、[id]等等
    filename: '[name].js',
    // path： 存放打包后文件的目录
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  // 配置项，配置查找模块依赖的规则
  resolve: {
    // 在导入的语句没有带后缀的时候，会尝试用这些后缀去匹配文件
    extensions: ['.tsx', '.ts', '.js', '.less'],
    // alias 别名配置，它能够将导入语句里的关键字替换成你需要的路径
    alias: {
      '@': resolve('src'),
    },
    // 配置如何去寻找第三方模块，比如我们自己有一个组件库，相对引入组件时，'./app/component'优于node_modules的搜索
    // 比如import 'button' ,这时候先去查找'./app/component'，找不到才会查找node_modules
    modules: ['./src/component', 'node_modules'],
  },
  // Loader 是一个转换器，他可以帮助我们对模块的源代码进行转换
  module: {
    // rules 是个数组，是一系列的规则
    rules: [
      {
        test: /\.tsx?$/, // 正则表达式，去匹配要使用当前规则的模块
        use: 'babel-loader?cacheDirectory', // 对匹配成功的模块使用 babel-loader 来进行转换，同时传入参数
        exclude: /node_modules/
      },
      {
        // test 表示测试什么文件类型
        test:/\.(css|less)$/,
        // 使用 'style-loader','css-loader'
        // https://segmentfault.com/a/1190000015237322
        use: [
          'css-loader',
          'less-loader'
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
              // 将图片打包到了path目录下，并生成原图片名加8位hash值的图片名
              name: '[path][name][hash:8].[ext]',
              // 将图片打包到该公共目录下
              outputPath: 'images/',
              // 图片引入资源的共路径，发布线上时很有用
              publicPath: 'assets/'
          }
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
            loader: 'url-loader',
            options:{
              // name 同flie-loader
              name:'[path][name][hash:8].[ext]',
              // 小于10000字节的转换为DataUrl格式
              limit:10000,
              // 是否采用file-loader， 默认采用
              // 还可以用responsive-loader等一些其他loader
              fallback: 'file-loader',
              // 设置要处理的MIME类型，
              mimetype:'image/png',
            }
        }
      }
    ]
  },
};