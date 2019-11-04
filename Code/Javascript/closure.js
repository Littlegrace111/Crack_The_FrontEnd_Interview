var closure1 = function() {
    var data = [];
    for(var i=0; i<3; i++) {
        data[i] = function() {
            console.log(i);
        }
    }
    data[0]();
    data[1]();
    data[2]();
}

var closure2 = function() {
    var data = [];
    // 使用闭包能够保存变量
    for(var i=0; i<3; i++) {
        data[i] = (function(i) {
            return function() {
                console.log(i)
            }
        })(i);
    }
    data[0]();
    data[1]();
    data[2]();
}

closure1();
closure2();