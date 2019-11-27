let middleware = [];

middleware.push((next) => {
    console.log(0);
    next();
    console.log(3);
})

middleware.push((next) => {
    console.log(1);
    next();
    console.log(1.1);
})

middleware.push((next) => {
    console.log(2);
})

console.log(middleware);

function compose1(middleware) {
    return function() {
        let f1 = middleware[0];
        f1( function next(){
            let f2 = middleware[1];
            f2( function next() {
                //... 洋葱模型
                let f3 = middleware[2];
                f3(function next() {
                    // ... 洋葱模型本质就是递归
                })
            })
        })
    }
}

function compose2(middleware) {
    return function () {
        dispatch(0);
        function dispatch(i) {
            const fn = middleware[i];
            if(!fn)
                return null;
            else {
                fn(function next() {
                    dispatch(i + 1);
                })
            }
        }
    }
}