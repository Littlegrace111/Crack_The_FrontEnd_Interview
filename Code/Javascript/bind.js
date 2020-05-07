// Function.prototype.bind2 = function () {
// 	const context = [].shift.call(arguments);
// 	return this.call(context, ...arguments);
// };

Function.prototype.bind2 = function () {
	const context = [].shift.call(arguments);
	let args1 = Array.prototype.slice.call(arguments);
	let self = this;
	return function () {
		let args2 = Array.prototype.slice.call(arguments);
		return self.apply(context, args1.concat(args2));
	};
};

function add(x, y) {
	return x + y + this.z;
}

let obj = {
	z: 1,
};

var add2 = add.bind2(obj, 1);
console.log(add2(2));

function createModule(str1, str2) {
	var obj = {
		greeting: str1,
		name: str2,
		sayIt: function () {
			return this.greeting + "," + this.name;
		},
	};

	return obj;
}

console.log(createModule("xxx", "yyy").sayIt());
