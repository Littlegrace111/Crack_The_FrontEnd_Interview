## this 关键字

`this`记录的是 Javascript 中当前函数执行的上下文，是一个变量。
当一个函数被执行时，this 被赋值。一个函数的 this 值是由它的调用位置决定的。

this 指向的是一个**函数被调用时**的上下文;
在 ES6 中的箭头函数则不同，this 指向的是**函数创建时**的上下文。

### this 指向规则

**按优先级排序:**

1. 构造函数中的 this，指向的是新创建的对象。
2. 如果 apply，call 或者 bind 用于调用、创建一个函数，函数中 this 是作为参数传入。
3. 当函数作为对象里的方法被调用时，函数内的 this 是调用该函数的对象。
4. 如果调用函数不符合上述规则，那么 this 的值指向全局对象。在浏览器环境下 this 指向 window，严格模式下 this 指向 undefined。
5. 如果该函数是 ES6 中的箭头函数，将忽略上面所有的规则，this 被设置为它被创建时的上下文。

```js
var obj = {
	method: function () {
		console.log(this); // obj
	},
};
obj.method();
```

```js
const obj = {
	value: "abc",
	createArrowFn: function () {
		return () => console.log(this); // obj
	},
};
const arrowFn = obj.createArrowFn();
arrowFn();
```

### 一些进阶情况下的 this

1. 闭包函数中的 this
   inner 函数并没有明确的调用对象，隐式 this 在严格模式下是 undefined。在宽松模式下是 window 对象。

```js
function outer() {
	"use strict";
	function inner() {
		console.log(this); // this = undefined
	}
	console.log(this); // this = 'outer'
	inner();
}
outer.call("outer");
```

2. 在构造函数中调用外部函数;
   getThis 函数在构造函数调用时没有明确的指向。

```js
"use strict";
function getThis() {
	console.log(this); // this = undefined
}
function Dog(saying) {
	this.saying = saying;
	getThis();
	console.log(this); // Dog {saying: "wang wang"}
}
new Dog("wang wang");
```

3. 通过 this 调用构造函数中的方法；

```js
function Dog(saying) {
	this.saying = saying;
	this.getThis = function () {
		console.log(this); // new Dog
	};
}
new Dog("wang wang");
```

4. 回调函数中的 this

```js
function getThis() {
	console.log(this);
}
function highOrder(callback) {
	console.log(this);
	callback();
}
highOrder(getThis);
highOrder.call({ a: 1 }, getThis);
```
