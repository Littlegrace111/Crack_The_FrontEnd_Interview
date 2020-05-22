/**
 * proxy 代理的使用: 对对象上属性的操作进行拦截，包括 get，set, in, delete
 */
let _obj = {
	time: "2018-01-03",
	name: "wuxiao",
	_r: 123, // 以下划线开头的属性为私有属性
};

let obj = new Proxy(_obj, {
	// 拦截 get 操作
	get(target, key) {
		// console.log("get", target, key);
		if (typeof key === "string" && key.indexOf("_") === -1) {
			// 不允许读取私有属性
			return target[key];
		}
	},
	// 拦截 set 操作
	set(target, key, value) {
		if (key.indexOf("_") === -1) {
			// 不允许改写私有属性
			target[key] = value;
		} else {
			// throw new Error("cannot set private property");
		}
	},
	// 拦截 key in object 操作
	has(target, key) {
		console.log("in");
		if (key.indexOf("_") > -1) {
			return false;
		} else {
			return target[key];
		}
	},
	// 拦截delete 操作
	deleteProperty(target, key) {
		console.log("delete");
		if (key.indexOf("_") > -1) {
			// 私有属性不让删除
			return target[key];
		} else {
			delete target[key];
		}
	},
	// 拦截 Object.keys(), Object.getOwnProperty, Object.
	ownKeys(target) {
		// 过滤掉私有属性
		return Object.keys(target).filter((item) => item.indexOf("_") === -1);
	},
});
obj._r = 456;
obj.name = "dongni";
// console.log("obj =", obj);
// console.log(obj.time);
// console.log(obj._r);
// console.log("name" in obj);
// console.log("_r" in obj);
// console.log("_r" in _obj);
// delete obj._r;
// console.log(obj);
// console.log(Object.keys(obj));

/**
 * Proxy 与Reflect 一般是一起使用的
 * 使用Proxy 可以实现观察者模式，也可以实现校验器， validator;
 * 实例：使用proxy实现观察者模式
 * 观察者模式：只要监听的对象的数据改变，观察者listener会被自动执行
 */
{
	const queueObservers = new Set();
	const observeCreator = (fn) => queueObservers.add(fn);
	const proxyCreator = (obj) =>
		new Proxy(obj, {
			set: function (target, key, value, receiver) {
				const result = Reflect.set(target, key, value, receiver);
				queueObservers.forEach((func) => func());
				return result;
			},
		});
	////////////////////////////////////
	const person = {
		name: "zhansan",
		age: 20,
	};
	const personProxy = proxyCreator(person);
	function print() {
		console.log(`${personProxy.name}`, `${personProxy.age}`);
	}
	observeCreator(print); // 把要执行的函数放到Set列表中
	personProxy.name = "wangwu";
	personProxy.name = {};
}

/**
 * Proxy 实现校验器 validator
 */
{
}

/**
 * Reflect 反射： 把一些Object上的一些操作对象实例的方法放到Reflect上
 */
let obj = {
	name: "wuxiao",
	gender: "female",
};

try {
	Object.defineProperty(obj, "skill", {
		get: function (target, key) {
			console.log();
			return target[key];
		},
		set: function (target, key, value) {
			target[key] = value;
		},
	});
} catch (e) {
	console.log(e);
}

/**
 * 实现一个简单mvvm的架构
 */
function Archiver() {
	let temperature = "hello";
	const archiver = [];

	Object.defineProperty(this, "temperature", {
		get: function () {
			console.log("get", this);
			return temperature;
		},
		set: function (value) {
			console.log("set", this, value);
			temperature = value;
			archiver.push(value);
		},
	});

	this.getArchiver = function () {
		return archiver;
	};
}

let archiver = new Archiver();
console.log("archiver: ", archiver);
archiver.temperature = "world";
console.log(archiver.temperature);
