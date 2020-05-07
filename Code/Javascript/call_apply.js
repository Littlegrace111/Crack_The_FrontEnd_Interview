// var foo = {
// 	value: 1,
// 	bar: function () {
// 		console.log(this.value);
// 	},
// };

// foo.bar();

// context 是一个object
Function.prototype.call2 = function (context) {
	if (typeof context === "object") {
		console.log("context", context);
		context.fn = this; // 把这个函数挂载到对象上
		console.log("arguments", arguments);
		var args = [];
		for (var i = 1; i < arguments.length; i++) {
			args.push("arguments[" + i + "]");
		}
		//var args = Array.prototype.pop.call(arguments);
		console.log("args", args);
		//context.fn(...args); // 这个是es6 spread operator, 不用es6去解决
		console.log("context.fn(" + args.join(",") + ")");
		eval("context.fn(" + args.join(",") + ")");
		delete context.fn;
	}
};

var foo = {
	value: 1,
};

function bar(name, female) {
	console.log("bar", this.value);
	console.log("bar", name);
	console.log("bar", female);
}

bar.call2(foo, "wuxiao", "female");
