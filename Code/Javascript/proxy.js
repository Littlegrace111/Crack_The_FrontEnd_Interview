function proxy1() {
	let value = 1;
	Object.defineProperty(this, "num", {
		get: function () {
			return value;
		},
		set: function (newVal) {
			value = newVal;
		},
		enumerable: true,
		configurable: true,
	});
}

var obj = {};

// new 运算符可以把一个function变成构造函数，构造函数返回一个对象，这个对象的原型链是这个函数的原型
