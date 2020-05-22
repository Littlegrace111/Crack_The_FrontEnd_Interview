// 怎么样实现继承？
// 第一种方式： 经典原型链继承
// Child.prototype = new Parent()
// Child.prototype.__constructor = Child();
// 把公共方法附在函数的的原型上
// 继承： 把父类的属性和方法都继承过来;
// 经典的原型链继承的方式: 会调用两次父类的构造函数
function Parent(name) {
	console.log("Parent constructor called");
	this.parent = name;
}

Parent.prototype.getName = function () {
	return this.name;
};

function Child(name, parent) {
	Parent.call(this, parent); // 相当于ES6里面constructor里面的super()方法
	this.name = name;
}

/**
 * 函数的原型是一个对象：func.prototype,
 * 是由JS引擎在函数创建的时候添加的，这个对象包含一个constructor构造函数和__proto__属性，__proto__属性指向他的上一个原型
 */
// Child.prototype = new Parent(); // 会调用两次父类的构造函数
Child.prototype = Object.create(Parent.prototype); // 使用此方法就不会调用两次父类构造函数
Child.prototype.constructor = Child; // 必须加的，如果不加，就没有绑定构造函数

var child1 = new Child("niuniu", "huangchao");

console.log(child1);

//模拟Object.create
function createObject(obj) {
	function f() {}
	f.prototype = obj;
	return new f();
}
