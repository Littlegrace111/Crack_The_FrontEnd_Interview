const array = [1, 1, "1", "2", 2, "2"];

// 利用indexOf来实现数组去重
function unique(array) {
	const result = [];
	for (let i = 0; i < array.length; i++) {
		if (result.indexOf(array[i]) === -1) {
			result.push(array[i]);
		}
	}
	return result;
}

// console.log(unique(array));

// 利用filter和indexOf来实现
function unique2(array) {
	return array.filter((item, index, array) => {
		console.log(array, index, item);
		return array.indexOf(item) === index;
	});
}

console.log(unique2(array));
