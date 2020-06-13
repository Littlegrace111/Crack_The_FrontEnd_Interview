/**
 * 数组新特性
 * 1. Array.from(): 把 array like 和可遍历（iterable）的对象转成为真正的数组；实例应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的 arguments 对象。`Array.from()`都可以将它们转为真正的数组；
 * 2. Array.of(): Array.of()可以将一组值，转换为数组，这个函数主要是为了弥补数组构造函数 Array()的不足；
 * 3. 数组实例的find()和findIndex()方法，它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为`true`的成员，然后返回该成员，没有符合条件的成员，则返回`undefined`，`findIndex()`和`find()`方法类似，返回的是成员的下标或者`-1`；
 * 4. 数组实例的`fill()`方法使用给定值，填充一个数组；
 * 5. 数组实例的`entries()`，`keys()`和`values()` 用于遍历数组，它们都返回一个遍历器对象，可以使用`for...of`循环进行遍历；
 * 6. 数组实例的`includes()`方法：返回一个 boolean，表示某个数组是否包含给定的值，与字符串的`includes()`方法类似；
 */

/**
 * 函数新特性：
 * 1. 参数默认值；
 * 2. rest参数： 把离散的函数参数聚合成一个数组
 * 3. 扩展运算符(...)：rest 的逆运算， 把一个数组分散展开成单个的变量
 * 4. 箭头函数
 * 5. 尾调用： 存在于函数式编程，通俗理解，就是函数的最后一句话是不是一个函数。尾调用：提升性能
 */
{
	let x = "test";
	function test(x, y = x, z) {
		// 默认参数
		console.log("作用域", x, y, z);
	}
	test("hello");

	// rest 参数： 把离散的参数聚合成一个数组
	function rest(...args) {
		// rest 参数， 比arguments 更好用
		// ES5 arguments 需要被强制转换成数组才能使用，rest参数可以直接使用数组的方法
		for (let rest of args) {
			console.log(rest);
		}
	}
	rest(1, 2, 3, "2");

	//扩展运算符
	console.log("spread_operator: ", ...[1, 2, 3, 4]);
}

/**
 * 对象的新特性：
 * 1. 对象的属性的简洁表示法：{pageSize: pageSize} => 等价于 {pageSize}
 * 2. 对象的方法的简洁表示法：{func: function(){}} => 等价于 {func(){}}
 * 3. 属性表达式: 对象的属性名可以用表达式来写，也就是可以是变量
 */
{
	let es5_method = {
		hello: function () {
			console.log("hello");
		},
	};
	// 等价于 es5_method
	let es6_method = {
		hello() {
			console.log("hello");
		},
	};

	let a = 1; // es6 里面对象的属性可以是一个变量表达式
	let es6_obj = {
		[a]: "c",
	};
	console.log(es6_obj);
}

/**
 * Object新增API：
 * 1. Object.is();
 * 2. Object.assgin() 浅拷贝
 * 3. Object.keys() Object.values() Object.entries()
 * 4.
 */
{
	console.log("Object.is(): ", Object.is("abc", "abc"));
	console.log(NaN === NaN);
	console.log("Object.is(): ", Object.is(NaN, NaN));
	console.log(+0 === -0);
	console.log("Object.is():", Object.is(+0, -0));
}

// 自己实现Object.assign()
{
	Object.prototype.assign2 = function (target, source) {};
}
