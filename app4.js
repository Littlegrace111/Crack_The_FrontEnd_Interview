const Koa = require('koa');
const Router = require('loa-router');

const app = new Koa();
const router = new router();

router.get('/latest', (ctx, next) => {

});

// router.post
// router.put
// router.delete

app.use(async (ctx, next) => {
    console.log(1);
    const a = await next(); // next里面返回的是一个promise
    console.log(ctx.path);
    console.log(a);
    console.log(2);
})

app.use((ctx, next) => {
    console.log(3);
    next();
    console.log(4);
    return 'hello!';
})

app.listen(3006);

