// new 运算符实现：new运算符会把一个函数变成构造函数，返回一个对象，且构造的过程中会执行这个函数。
// 返回的对象的__proto__指向Object，且__proto__.constructor 等于这个函数
// Function.prototype 是一个对象，这个对象包含constructor和__proto__属性
const New = function (func) {
	const obj = Object.create(func.prototype);
	const args = Array.prototype.slice.call(arguments).slice(1);
	// const context = [].shift.call(arguments);
	console.log(args);
	let result = func.apply(obj, args);
	return result ? result : obj;
};

function foo(name) {
	this.name = name;
}

var obj = New(foo, "wuxiao");

console.log(obj);
