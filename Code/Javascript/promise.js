const timeout = (ms) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			let success = Math.random() <= 0.5; // 随机的true or false
			console.log("success", success);
			if (success) {
				resolve("success");
			} else {
				reject(new Error("failed"));
			}
		}, ms);
	});
};

function timeIsUp(value) {
	console.log("时间到了, value =", value);
}

timeout(100)
	.then(timeIsUp, (err) => {
		console.log("err", err);
	})
	.catch((err) => {
		console.log("catch err", err);
	});

// ===============================================================
/**
 * 题目：红灯3秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次
 * 如何让三个灯不断交替重复亮灯
 */
function red(value) {
	console.log("red: ", value);
}
function green(value) {
	console.log("green: ", value);
}
function yellow(value) {
	console.log("yellow: ", value);
}

// 把一个函数封装成一个返回Promise实例的函数；
const light = function (ms, func) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			func();
			resolve(); // resolve 里面传参数，能把value带出去
		}, ms);
	});
};

/**
 * Promise.resolve() 方法：是一个Promise的静态方法；
 */
Promise.resolve("foo"); // 等价于
new Promise((resolve) => resolve("foo"));

/**
 * Promise.prototype.then() 方法： Promise 原型链上的方法；promise实例状态改变的是一个回调函数，也就是在promise里面执行了resolve 或者 reject方法之后，then里的回调函数会被执行；
 * then方法的链式调用，可以让异步操作按照一定的顺序执行；前一个then的调用里面，有可能还会返回一个新的promise实例（也就是下一个执行还是一个异步调用）；
 * then方法链式调用的前提是：then方法必须return一个东西才能触发链式调用，如果不return，这个链式调用就终止了
 */
// yellow ->
var step = function () {
	Promise.resolve()
		.then(() => {
			return light(3000, red); // 在then方法的
		})
		.then(() => {
			return light(2000, yellow);
		})
		.then(() => {
			return light(1000, green);
		})
		.then(() => {
			step(); // 递归调用promise 就可以不断执行
		});
};

step();

// Promise.all 会返回一个新的promise实例，
function PromiseAll(promises) {
	return new Promise((resolve, reject) => {
		let promsieCount = 0;
		let promiseResult = [];
		for (let i = 0; i < promises.length; i++) {
			promises[i].then(
				(value) => {
					promsieCount++;
					promisesResult.push(value);
					if (promiseCount === promises.length) {
						resolve(promisesResult);
					}
				},
				(err) => {
					reject(err);
				}
			);
		}
	});
}
