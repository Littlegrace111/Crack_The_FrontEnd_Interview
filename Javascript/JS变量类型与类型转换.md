# JavaScript变量类型与类型转换

## Javascript变量类型

### 原始类型Primitive Type
五种基本类型：number，string，boolean，undefined，null， symbol(ES6定义)；
五种基本类型保存在内存的栈中，大小固定，复制其变量时会创建这个值的副本。使用typeof区分，这些值是在底层上直接实现的，不是Object，没有原型，没有构造函数。

### 对象类型Object Type
Function, Array, Object都是对象。
Date, RegExp, Error也是JS语言标准定义的对象。

### 包装类
#### 数字Number
JS不区分整数值和浮点数值，所有数字均用浮点数值表示。
ES5标准，支持十进制和十六进制，不支持八进制。ES6标准开始支持八进制。
`isNaN() // 参数是一个NaN或者是一个非数字值，比如字符串或对象，则返回true`

#### 字符串 - Unicode字符集
JavaScript是用Unicode字符集，Unicode是ASCII和Latin-1的超集。
Unicode转义序列：6个ASCII字符来代表任意16位Unicode内码。
这些Unicode转义序列均以\u为前缀，其后跟随4个十六进制数。
Unicode转义写法可以用在JavaScript字符串，正则表达式和标志符中。
```js
"cafe" === "cafe\u00e9" // true
```    

### JS类型总结
JS语言的类型可以分为原始类型和对象类型；分为拥有方法和不能拥有方法的类型，同样可分为可变（mutable）和不可变（immutable）类型。
对象和数组属于可变类型，number，boolean，null和undefined属于不可变类型。
言下之意，对象和数组是默认浅拷贝，原始类型默认是深拷贝。

### null 和 undefined
`typeof null === 'object' // true`
`null == undefined // true`
`null === undefined // false`

#### JS的一些全局定义
全局属性：`undefined`, `Infinity`, `NaN`；
全局方法：`isNaN()`, `parseInt()`, `eval()`；
构造函数：`Date()`, `RegExp()`, `String()`,`Object()`, `Array()`；
全局对象：`Math`和`JSON`；

#### 包装对象
new Number(), new String(), new Boolean() 等

#### 不可变的原始值和可变的对象引用
JS的原始类型是不可更改的，浅拷贝进行的是值拷贝，会创建新的副本。
对象类型的值是可修改的，浅拷贝是引用拷贝，创建的是对象的地址。
引用对象类型的值是对象，保存在堆内存中。引用类型的变量实际上是一个指针，它保存在栈中，指向堆内存中的对象，复制引用类型变量实际是复制该指针，用instanceof区分。

## 类型检查
**typeof 返回值**
用来检测一个对象是否已经定义或者是否已经赋值。
在`JS`里使用`typeof`判断数据类型，只能区分基本类型。
`typeof`实际返回类型只有六种：`string`, `number`, `boolean`, `undefined`, `object`, `function`;
对于`null`, `array`, `object`来说，`typeof`都会统一返回`object`。

**Object.prototype.toString：**
`typeof`适用于检测基本类型primitive types。
`array`, `object`, `null`可以通过`Object.prototype.toString.call()`方法区分。

**instanceof**
`instanceof`用在JS继承对象中，用来判断某个实例对象是否是某个原型对象的实例。

#### JavaScript中的undefined和not define的区别：
JS中，未声明的变量会直接抛出异常 var {name} is not defined，如果没有处理异常，代码就会停止运行。
声明未赋值的变量会是undefined，但是不会抛出异常。

## 类型转换
### 显式类型转换
`Number()`, `String()`, `Boolean()`;
1. Number函数： 
   1. 字符串：如果可以被解析成数值，则转换为相应数值，否则得到NaN，空字符串转换为0；
   2. 布尔值： true->1, false -> 0;
   3. undefined： 转换成NaN;
   4. null: 转成0。
   5. 对象类型转换：先调用对象自身的 `valueOf` 方法，如果该方法返回原始类型的值（数值、字符串和布尔值），则直接对该值使用`Number()`方法，不再进行后续步骤；如果 `valueOf` 返回复合类型的值，再调用对象自身的 `toString` 方法, 如果`toString`方法返回原始类型的值，则对该值使用`Number()`方法，不再进行后续步骤；如果`toString`返回的是复合类型的值，则报错；
2. String 函数
   1. 数值：转换为相应的字符串；
   2. 字符串：转换后还是原来的值；
   3. 布尔值：true -> 'true' false -> 'false'；
   4. undefined -> 'undefined'；
   5. null -> 'null'；
   6. 对象类型转换：先调用对象自身的`toString()`方法，如果该方法返回原始类型的值（数值，字符串和布尔），则直接对该值使用`String()`方法，不再进行后续步骤；如果`toString()`返回复合类型的值，再调用对象自身的 `valueOf()`方法，如果`valueOf()`方法返回原始类型的值，则对该值使用`String()`方法，不再进行后续步骤，如果`valueOf()`返回的是复合类型的值，则报错；
   
#### 隐式类型转换 
- 四则运算；
- 判断语句；
- Native调用，如`console.log()`