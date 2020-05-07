const hasOwnProps = Object.prototype.hasOwnProperty;

// Object.is 的polyfill
// Object.is() 方法可以对基本数据类型做一个精确的比较
// === 有两种疏漏情况：+0 === -0 => true, 期待返回false
// === NaN === NaN => false 期待返回true,
function is(x, y) {
	if (x === y) {
		// +0 === -0
		console.log("11111");
		return x !== 0 || y !== 0 || 1 / x === 1 / y;
	} else {
		// NaN
		return x !== x && y !== y;
	}
}

console.log(is(+0, -0));
console.log(is(NaN, NaN));

export default function shallowEqual(objA, objB) {
	// 进行基础类型比较
	if (is(objA, objB)) {
		return true;
	}

	// 复杂类型比较
}


