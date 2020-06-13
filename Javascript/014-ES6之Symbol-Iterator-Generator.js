/**
 * 迭代器：iterator
 * 读取数据的统一接口，iterator,
 * iterator 可以理解成一个指针，这个指针包含value属性和done属性和一个next方法
 * Object 并没有内置iterator 接口
 * 原生具备Iterator 接口的数据结构如下： Array，Map, Set, String, TypedArray, 函数的arguments 对象，NodeList对象
 */
{
	let arr = ["hello", "world", "alibaba"];
	let arrIter = arr[Symbol.iterator](); // 数组本身就有iterator接口
	let result = arrIter.next();
	while (!result.done) {
		console.log(result.value);
		result = arrIter.next();
	}
	// console.log(arrIter.next(), arrIter);
	// console.log(arrIter.next());
	// console.log(arrIter.next());
}

/**
 * 默认的迭代器接口：Symbol.iterator
 * 迭代器：遍历器接口 Iterable、指针对象Iterator 和 next方法
 * ES6规定，默认的Iterator接口部署在数据结构的Symbol.iterator属性，一个数据结构只要具有Symbol.iterator属性，就可以认为是可遍历的（iterable)。
 * Symbol.iterator 属性指向一个函数，执行这个函数会返回一个遍历器对象，该对象具有next方法，每次调用next方法，都会返回一个代表当前成员信息的对象，具有value和done两个属性。
 * Object 对象并没有内置iterator接口，所以默认不能使用for of 循环
 */
{
	// 只要一个数据集合具有iterator属性就是可遍历的，可以使用for of 来遍历
	// 数组，Set和Map默认有迭代器属性，Object 默认没有，可以自定义迭代器
	// 迭代器是一个函数：这个函数返回一个对象，这个对象包含一个value和done属性
	const obj = {
		start: [1, 2, 3],
		end: [7, 8, 9],
		// 自定义迭代器函数，迭代器是一个函数，这个函数会返回一个next函数，next函数会返回一个对象包含value和done属性。
		// 这种写法等价于: [Symbol.iterator]() {}
		[Symbol.iterator]: function () {
			const self = this;
			let index = 0;
			let arr = self.start.concat(self.end);
			let len = arr.length;
			return {
				next: function () {
					if (index < len) {
						return {
							value: arr[index++],
							done: false,
						};
					} else {
						return {
							value: arr[index++],
							done: true,
						};
					}
				},
			};
		},
	};
	for (let key of obj) {
		console.log(key);
	}
}

/**
 * Generator 是一个函数，可以理解成Generator函数内部维护了一个状态机，封装了多个内部状态。
 * 执行Generator函数会返回一个遍历器对象，Generator函数除了是一个状态机，还是一个遍历器生成函数，通过返回的遍历器对象，可以不断遍历Generator函数内部的每一个状态。
 * async 和 await是generator的语法糖，* 和 yield。
 */
{
	function* helloworld() {
		yield "hello";
		yield "world";
		return "ending";
	}

	// generator 函数执行，返回的并不是函数的运行结果，而是一个迭代器对象
	var hw = helloworld(); // generator 函数返回一个迭代器对象
	console.log(hw.next().value);
}
