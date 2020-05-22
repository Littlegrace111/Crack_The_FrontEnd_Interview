/**
 * 数组新特性
 * 1.
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
