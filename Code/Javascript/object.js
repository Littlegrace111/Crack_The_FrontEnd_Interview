// 创建对象的多种方式

//1. 通过构造函数来创建
function Person(name) {
	this.name = name;
}

var person1 = new Person("dongni");

// console.log(person1.name);
// console.log(person1.__proto__.constructor === Person);

// 2. 通过字面量
var object = { a: 1 };
// console.log(object.a);

// 3. 通过Object.create(null)
var o = Object.create(null);

// 4. 模拟new运算符
// 4.1 new 运算符返回一个对象，这个对象是function f 创建的
function children(name, gender) {
	this.name = name;
	this.gender = "female";
}

// 函数的参数使用arguments存储
function objectFactory() {
	var obj = Object.create(null); // 这样只是创建了一个空对象，空对象的原型链指向了f_Constructor的prototype
	f_Constructor = [].shift.call(arguments); // 取出参数的第一个
	obj.__proto__ = f_Constructor.prototype;
	f_Constructor.apply(obj, arguments); // f_Constructor.call(obj, ...arguments)
	return obj;
}

console.log(objectFactory(children, "dongni"));
