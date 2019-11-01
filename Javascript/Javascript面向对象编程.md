# JavaScript 面向对象编程

## JS面向对象的基石 - 原型链
在JS的世界里，除了内置基础类型，其他都是对象，函数也是对象。
普通对象有__proto__，标识此对象是从什么原型生成的。
只有函数有prototype，标识这个函数的原型。
可以理解函数是一个抽象对象，普通对象可以通过函数对象创建出来（new）出来。
JS世界里的祖先对象就是Object，所有对象都根据Object派生出来。

### 创建对象
创建对象有三种方法：
1. 通过对象字面量定义 `var o1 = {x:0, y:0}`
2. 通过`new`运算符创建对象, new 后面跟随一个函数调用，此函数叫构造函数。
   `var o2 = new Object()`
   `var o2 = new Array()`
   `var o2 = new Date()`
3. 通过祖先对象Object.create(func.prototype or object.__proto__) 创建出来；
4. Object.create 创建的对象本身是个空对象，是用原型链来连接的，不会执行函数的构造函数。`var o1 = Object.create(f.prototype)` 实际上等价于`o1.__proto__ === f.prototype // => ture`。

```js
// 第一种方式：字面量
var o1 = { name: 'o1'} // 字面量对象
var o2 = new Object({ name: 'o2'})

// 第二种方式：通过函数 + new运算符创建
var M = function() { this.name='o3'}  //函数在声明的时候，JS引擎会给这个函数自动加上prototype.
console.log(M.prototype.constructor === M) // true
var o3 = new M() // 任何一个函数，只要被new使用了，这个函数就会变成创建对象的构造函数
console.log(o3.__proto__ === M.prototype) // true
console.log(o3 instanceof M) //true
console.log(o3 instanceof Object) //true
console.log(o3.__proto__ === M.prototype)
// 第三种方式：通过Object.create()创建
var p = {name: 'o3'}
var o4 = Object.create(p) // o4.__proto__ === p.__proto__ => true
```

### 对象的属性
查询和设置属性：`.` 和 `[]`
删除属性：delete window.xxxxx;
检测属性：`in` 运算符， `hasOwnProperty()`, `propertyIsEnumerable()`

```js
__proto__:
constructor: ƒ Object() // 构造函数
hasOwnProperty: ƒ hasOwnProperty() // 判断是否是对象自身的可枚举属性
isPrototypeOf: ƒ isPrototypeOf() // 判断对象是否是某对象的原型，与instanceof 类似，但不同
propertyIsEnumerable: ƒ propertyIsEnumerable()
toLocaleString: ƒ toLocaleString()
toString: ƒ toString()
valueOf: ƒ valueOf()
__defineGetter__: ƒ __defineGetter__()
__defineSetter__: ƒ __defineSetter__()
__lookupGetter__: ƒ __lookupGetter__()
__lookupSetter__: ƒ __lookupSetter__()
get __proto__: ƒ __proto__() 
set __proto__: ƒ __proto__()
```

#### 属性的特性
对象的属性包含一个名字和四个特性，（他的值）value, （可写性）writable, （可枚举）enumerable, （可配置）configurable。

#### 属性的遍历
`for/in` 循环可以遍历对象中所有可枚举的属性，包括自有属性和继承的属性。对象继承的内置方法，如`toString()`等，不可枚举，但在代码中给对象添加的属性都是可枚举的，除非强制设定成不可枚举的属性。

```js
for(let p in o) {
    !o.hasOwnProperty(p) && continue; // 跳过继承属性
}
for(let p in o) {
    if(typeof o[p] === 'function') continue; //跳过方法
}
```
`Object.keys()`返回可枚举的自有属性，不包含继承的属性。
`JSON.stringify()`返回的是自身可枚举属性的字符串。

#### 属性的getter和setter

********************************************************************

### 原型与原型链
1. 原型是一个抽象对象，可以类比为Java语言里面的class;
2. 函数在声明的时候，JS引擎会给这个函数自动加上原型prototype;
3. 原型包含构造函数和它自己所继承的原型对象`__proto__`;
4. 函数的原型的构造函数就是函数本身。`F.prototype.constructor === F`;
5. 通过函数new出来的实例，实例对象的原型为函数的原型 `o.__proto__ === F.prototype`；
6. 多个实例对象想共享某些方法，可以把方法定义到原型上；

![原型链_chain](./images/prototype_chain.jpg)

#### 函数与构造函数
在JS中，函数也是一个对象。
但是，只有函数对象有prototype, 实例对象没有。
实例对象有__proto__，同理函数对象也有__proto__。

#### instanceof 原理
实例对象.`__proto__` === 构造函数.prototype。
`instanceof`缺点：无法区分对象是由哪个原型直接派生的。因为只要是原型链上的原型，都会返回true。
可以通过实例对象的`o.__proto__.constructor === F`来判断是否由哪个函数直接创建。

![原型链_instanceof](./images/prototype_instanceof.jpg)

```js
console.log(o3 instanceof Object) //true
// instanceof 等价于下面
console.log(o3.__proto__ === M.prototype) // true
console.log(o3.__proto__ === Object.prototype) // true
console.log(o3.__proto__.constructor === M) // true
console.log(o3.__proto__.constructor === Object) // false
```

#### new运算符
new foo() 执行过程：
1. 一个新实例对象被创建，继承自foo.prototype。
2. foo.constructor() 构造函数foo被执行，传入参数，上下文this会被指定为这个新的实例对象。
3. 如果构造函数返回了一个对象，那么这个对象会取代整个new出来的结果，如果构造函数没有返回对象，则new出来的实例对象为步骤1创建的对象。

```js
// 模拟new运算符的操作
var new2 = function(func) {
    // 根据函数的原型创建一个对象
    var o = Object.create(func.prototype)
    // 执行func.prototype的构造函数func
    var k = func.call(o) 
    if(typeof k === 'object') {
        return k
    } else {
        return o
    }
}
```
********************************************************************

### JS实现继承
继承的本质就是实现代码重用和数据共享。
在JS语言，继承的意义是，子类要共享父类的属性和方法。无非是，共享的方式不同。
如果一个实例对象是由一个函数通过new运算符创建的，则对象的__proto__指向此函数的原型。
函数的原型如果不做任何更改的话，其__proto__指向的是Object。

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