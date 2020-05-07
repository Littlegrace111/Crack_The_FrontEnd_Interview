var closure1 = function () {
	var data = [];
	// 改成let 或者使用闭包来保存当前变量
	for (var i = 0; i < 3; i++) {
		data[i] = function () {
			console.log(i);
		};
	}
	data[0]();
	data[1]();
	data[2]();
};
closure1();

var closure2 = function () {
	var data = [];
	// 使用闭包能够保存变量
	for (var i = 0; i < 3; i++) {
		data[i] = (function (i) {
			return function () {
				console.log(i);
			};
		})(i);
	}
	data[0]();
	data[1]();
	data[2]();
};

closure2();

// 如果不使用闭包，函数内部的变量是无法被外部的函数读取的，必须通过闭包的方式
function checkoutScope() {
	var scope = "local";
	function getScope() {
		return scope;
	}
	return getScope;
}

var foo = checkoutScope();

foo();
