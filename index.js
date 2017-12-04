// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
app.use(async (ctx, next) => {
    console.log(1)
    await next();
    ctx.response.body += '<h1>Hello, koa2!</h1>';
    console.log(4)
});
// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    console.log(2)
    await next();
    console.log(3)
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});


var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}
var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
