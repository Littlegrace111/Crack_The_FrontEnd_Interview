function Archiver() {
	let temperature = "hello";
	const archive = [];

	Object.defineProperty(this, "temperature", {
		get: function () {
			console.log("get temperature");
			return temperature;
		},
		set: function (value) {
			console.log("set value =", value);
			temperature = value;
			archive.push({ val: temperature });
		},
	});

	this.getArchive = function () {
		return archive;
	};
}

var archive = new Archiver();
// archive.temperature = 1;
console.log(archive.temperature);
