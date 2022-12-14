//const { defineConfig } = require('@vue/cli-service')
let proxyObj = {};
proxyObj["/"] = {
  ws:false, // 关闭 webSocket
  target: "http://localhost:8080", // 后端的地址
  changeOrigin: true,
  pathRewrite: {
    '^/api':'/'
  }
}
//module.exports = defineConfig({transpileDependencies: true})
module.exports = {
  devServer:{
    host: "localhost",
    port: 8081,
    proxy: proxyObj
  }
}