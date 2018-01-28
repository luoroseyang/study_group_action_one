## 快速开始
- 需要Node.js 6+版本
- 需要安装mongodb,并且运行mongodb服务,在`server/configs/index.js`中默认连接`mongodb://localhost:27017/vue-blog`
- 配置`server/configs/index.js`,配置admin用户名、密码等,或者新建`server/configs/private.js`


``` bash
# install dependencies 
# 安装依赖，可以使用yarn/npm
npm install # or yarn install

# serve in dev mode, with hot reload at localhost:8889
# 开发环境，带有HMR，监听8889端口
npm run dev

# build for production
# 生产环境打包
npm run build

# serve in production mode (with building)
# 生产环境服务，不带有打包
npm start

# serve in production mode (without building)
# 生产环境服务,带有打包
npm run prod

# pm2
# need `npm install pm2 -g`
npm run pm2
```

## 自定义配置
server端配置文件位于`server/configs`目录下

``` javascript
// 可新建private.js定义自己私有的配置
module.exports = {
  mongodbSecret: { // 如果mongodb设置用户名／密码可在此配置
    user: '', 
    pass: ''
  },
  jwt: { // 配置jwt secret
    secret: ''
  },
  admin: { // 配置用户名／密码
     user: '',
     pwd: ''
  }
}
```