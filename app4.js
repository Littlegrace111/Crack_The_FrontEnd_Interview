const Koa = require('koa');
const app = new Koa();

app.use((ctx, next) => {
    console.log(1);
    next();
    console.log(2);
})

app.use((ctx, next) => {
    console.log(3);
    next();
    console.log(4);
})

let middleware = [];
middleware.push((next) => {
    console.log(0);
    next()
    console.log(1);
})

middleware.push((next) => {
    console.log(2);
    next()
    console.log(3);
})

middleware.push(() => {
    console.log(4);
})

const compose = (middleware) => {
    // some code here
}



app.listen(3000);

