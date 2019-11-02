## this 关键字
`this`记录的是Javascript中当前函数执行的上下文，是一个变量。
当一个函数被执行时，this被赋值。一个函数的this值是由它的调用位置决定的。
this指向的是一个函数被调用时的上下文，在ES6中的箭头函数则不同，this指向的是函数创建时的上下文。

### this指向规则
按优先级排序
1. 构造函数中的this，指向的是新创建的对象。
2. 如果apply，call或者bind用于调用、创建一个函数，函数中this是作为参数传入。
3. 当函数作为对象里的方法被调用时，函数内的this是调用该函数的对象。
```js
    var obj = {
        method: function() {
            console.log(this) // obj
        }
    }
    obj.method()
```
4. 如果调用函数不符合上述规则，那么this的值指向全局对象。在浏览器环境下this指向window，严格模式下this指向undefined。
5. 如果该函数是ES6中的箭头函数，将忽略上面所有的规则，this被设置为它被创建时的上下文。
```js
const obj = {
    value: 'abc',
    createArrowFn: function() {
        return () => console.log(this) // obj
    }
}
const arrowFn = obj.createArrowFn()
arrowFn()
```

### 一些进阶情况下的this
1. 闭包函数中的this
   inner函数并没有明确的调用对象，隐式this在严格模式下是undefined。在宽松模式下是window对象。
```js
    function outer() {
        'use strict'
        function inner() {
            console.log(this)  // this = undefined
        }
        console.log(this) // this = 'outer'
        inner();
    }
    outer.call('outer')
```
2. 在构造函数中调用外部函数;
    getThis函数在构造函数调用时没有明确的指向。
```js
    'use strict'
    function getThis() {
        console.log(this) // this = undefined
    }
    function Dog(saying) {
        this.saying = saying
        getThis()
        console.log(this) // Dog {saying: "wang wang"}
    }
    new Dog('wang wang')
```
3. 通过this调用构造函数中的方法；
```js
function Dog(saying) {
    this.saying = saying;
    this.getThis = function() {
        console.log(this) // new Dog
    }
}
new Dog('wang wang')
```
4. 回调函数中的this
```js
function getThis() {
    console.log(this)
}
function highOrder(callback) {
    console.log(this)
    callback()
}
highOrder(getThis)
highOrder.call({a:1}, getThis)
```