const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    index: './src/index.tsx'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
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
      }
    ]
  },
};