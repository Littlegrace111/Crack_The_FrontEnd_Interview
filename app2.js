const Koa = require('koa');
const app = new Koa();

// 中间件：函数
app.use(() => {
    // 上下文
    console.log('hello, 7yue');
    
});

// 这种方式：中间件只能调用一个函数，无法调用其他中间件
app.use(() => {
    console.log('hello, 8yue!');
});

app.listen(3000);