// 防抖： 在指定的时间内不触发某个函数，（如果指定时间内触发，重新开始计时）
function debounce(func, delay) {
	let startTimeStamp = 0;
	let timeout = 0;

	return function () {
		let self = this;
		const currentTimeStamp = new Date().getTime();
		const last = currentTimeStamp - startTimeStamp;
		if (last >= delay) {
			func.apply(this, arguments);
			startTimeStamp = currentTimeStamp;
		} else {
			timeout && clearTimeout(timeout);
			timeout = setTimeout(() => {
				func.apply(self, arguments);
			}, delay - last);
		}
	};
}

function shoot(who) {
	console.log("shoot ", who);
}

debounce(shoot, 1000)("enemy");
