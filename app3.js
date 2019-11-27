const Koa = require('koa');
const app = new Koa();

// 注册中间件： 在koa中，只会自动执行第一个中间件，其他的中间件必须开发者自己调用
app.use((ctx, next) => {
    console.log('hello, 7yue');
    // 调用第二个中间件函数
    next();
})

app.use((ctx, next) => {
    console.log('hello, 8yue');
    next();
})

app.listen(3000);