var p1 = Promise.resolve(1),
	p2 = Promise.resolve(2),
	p3 = Promise.resolve(3);

// Promise.all 接收一个promise的数组；
// 如果所有的请求都成功了；
Promise.all([p1, p2, p3]).then((results) => {
	console.log(results);
});

// Promise.all 接收一个promise对象的数组作为参数，当这个数组里所有的promise对象全部变为resolve或有一个reject出现，它才会去调用then方法，它们是并发执行的。
// Promise.all 是Promise对象上的静态方法，该方法的作用是将多个Promise对象实例进行一个包装，生成并返回一个新的Promise实例。
function promiseAll(promises) {
	// Promise.all 会返回一个新包装过的Promise， p1, p2, p3
	return new Promise((resolve, reject) => {
		let resolvedCounter = 0;
		let promiseNum = promises.length;
		let resolvedValues = new Array(promiseNum);

		for (let i = 0; i < promiseNum; i++) {
			promises[i].then(
				(value) => {
					resolvedCounter++;
					resolvedValues[i] = value;
					if (resolvedCounter === promiseNum) {
						resolve(resolvedValues);
					}
				},
				(err) => {
					reject(err);
				}
			);
		}
	});
}

promiseAll([p1, p2, p3]).then((results) => {
	console.log(results);
});





function promiseRace(promises) {
	let promiseCount = 0;
	return new Promise((resolve, reject) => {
		promises.forEach((promise) => {
			promise.then(
				(value) => {
					return resolve(value);
				},
				(err) => {
					if (promiseCount === promises.length) {
						return reject(err);
					} else {
						promiseCount++;
					}
				}
			);
		});
	});
}

promiseRace([p1, p2, p3]).then((value) => {
	console.log(value);
});
