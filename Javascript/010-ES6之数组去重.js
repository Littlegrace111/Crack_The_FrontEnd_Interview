// 数组去重：
// 第一种方式：遍历数组， arr.indexOf(item) === index
// 第二种方式：把数组扁平化成一个Map对象，注意！不能扁平化成object，object的键只能是

function Unique(arr) {
	let result = [];
	arr.forEach((item, index) => {
		if (arr.indexOf(item) === index) {
			result.push(item);
		}
	});
	return result;
}

function Unique2(arr) {
	let map = new Map();
	arr.forEach((item, index) => map.set(item, index));
	console.log(map);
	return map.keys();
}

// console.log(Unique([1, 1, 2, 2, "3", "2"]));
console.log(Unique2([1, 1, 2, 2, "3", "2"]));
