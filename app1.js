const Koa = require('koa')

const app = new Koa();

// 中间件：函数
function test() {
    console.log('fighting!');
}

// 注册中间件
app.use(test);

app.listen(3000);