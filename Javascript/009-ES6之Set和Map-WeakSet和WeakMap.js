// Set 集合
console.log("===========Set 集合=============");
{
	/**
	 * Set是一种集合，集合里的元素必须是Unique的.
	 * 构造Set实例
	 */
	let setArray = new Set([1, 1, 2, 2, 3]);
	console.log(setArray);

	let setObj = new Set([{ a: 1 }, { b: 1 }, { c: 1 }]);

	/**
	 * Set 实例有 add / delete, has, clear, size这些方法
	 */
	setObj.add("1");
	setObj.add(1);
	setObj.add(1);
	console.log(setObj, setObj.size); // Set 集合可遍历， size属性相当于数组的length
	console.log(setObj.has("1")); // has 方法
	// console.log(setObj.clear(), setObj); // clear 清空

	/**
	 * 如何遍历set集合: for of
	 */
	console.log("=========Set 遍历==========");
	for (let key of setObj.keys()) {
		console.log("key", key);
	}
	for (let value of setObj) {
		console.log("value", value);
	}
	// 与上一种写法等价
	for (let value of setObj.values()) {
		console.log("value", value);
	}
	for (let [key, value] of setObj.entries()) {
		console.log("key", key, ", value", value);
	}
	setObj.forEach((element) => {
		console.log(element);
	});

	/**
	 * 如何模拟实现Set集合的功能：
	 * Set 是一个构造函数，这个构造函数返回一个Unique的数组
	 */
	function Set2(array) {
		return Unique(array);
	}

	let arrSet = new Set2([1, 1, 2, 2, 3]);
	console.log("arrSet", arrSet);

	/**
	 * 判断一个数组去重的关键代码： array.indexOf(value) === index
	 */
	function Unique(array) {
		let unique = [];
		array.forEach((currentValue, index) => {
			if (array.indexOf(currentValue) === index) {
				unique.push(currentValue);
			}
		});
		return unique;
	}

	console.log(Unique([1, 1, 2, 2, 3]));
	// 每个对象的属性key-value 虽然一致，但是每个对象创建的地址不一样，实际上浅比较是比较的这个对象的地址
	console.log(Unique([{ a: 1 }, { a: 1 }, { a: 1 }]));
	let array = [{ a: 1 }, { a: 1 }, { a: 1 }];
	console.log(array.indexOf({ a: 1 }));
}

// WeakSet 集合
{
	/**
	 * WeakSet: 也是不重复的Set集合，但是WeakSet传入的数组的值必须是对象；
	 * WeakSet对成员对象是弱引用关系，即垃圾回收机制不考虑WeakSet对该对象的引用；
	 * 由于垃圾回收机制运行的不可预测性，ES6规定WeakSet不可遍历。
	 * js 垃圾回收机制依赖引用计数：如果一个值的引用计数不为0，垃圾回收机制就不会释放这块内存
	 */
	const foos = new WeakSet();
	class Foo {
		constructor() {
			foos.add(this); // foos 对Foo的实例的引用是弱引用
		}
		method() {
			if (!foos.has(this)) {
				throw new TypeError(
					"Foo.prototype.method only can be called in Foo instance"
				);
			}
		}
	}
}

// Map 集合 键值对集合，键可以为任何数据类型；
console.log("============Map 集合=============");
{
	/**
	 * Javascript 对象本质是键值对的集合 Hash 结构。ES5里面，只能用字符串当做键名。
	 * ES6 提供Map数据结构：也是键值对的集合，但是键的范围不限于字符串，可以是任意值。
	 * Map 实例的方法有：set / get， has / delete , size 属性
	 */
	const m = new Map();
	const o = { p: "Hello World" };
	m.set(o, "content");
	m.get(o);
	console.log(m);

	// Map 构造函数接受二维数组作为参数:
	let hashMap = new Map([
		["name", "zhangshan"],
		["gender", "male"],
	]);
	console.log(hashMap);

	// 上面Map的构造函数实际上执行了下面的操作
	const items = [
		["name", "zhangshan"],
		["gender", "male"],
	];

	const map = new Map();
	items.forEach(([key, value]) => map.set(key, value));
}

/**
 * WeakMap的数据结构与WeakSet一致，是对hashMap内元素的弱引用，不被gc回收机制所遍历
 */
{
}

/**
 * Map 和 Set 与 Array 和 Object的对比
 * 对数据结构的CRUD，check, add, update, delete
 * 如果要对数据进行增删改查，建议把数组扁平化成map
 */
{
	console.log("=======map 与数组的区别==========");
	// create
	let map = new Map();
	let arr = [];
	let arr2 = new Array(10);

	// add
	map.set("t", 1);
	arr.push({ t: 1 });
	arr.push();
	console.log(map, arr);

	// 查询 check
	console.log("map has", map.has("t"));
	console.log(arr.indexOf("t")); // 找到下标
	console.log(arr.find((item) => item.t)); // 数组里的元素是复杂类型，返回这个元素
	console.log(arr.findIndex((item) => item.t));

	// 改
	map.set("t", 2);
	console.log(map);
}
