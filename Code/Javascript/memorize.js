// 使用var关键字声明变量，会有作用域提升的问题；所以执行之后打印3
var funcs = [];
for (var i = 0; i < 3; i++) {
	funcs[i] = function () {
		console.log(i);
		return i;
	};
}

funcs.forEach((func) => {
	func();
});

// 解决方案：1. 闭包； 2. 使用let关键字
var funcs2 = [];
for (var i = 0; i < 3; i++) {
	funcs2[i] = (function (i) {
		function f() {
			console.log(i);
			return i;
		}
		return f;
	})(i);
}

funcs2.forEach((func) => {
	func();
});

var scope = "global";
function closure() {
	var scope = "local";
	function f() {
		console.log(scope);
		return scope;
	}
	return f;
}

closure()();
