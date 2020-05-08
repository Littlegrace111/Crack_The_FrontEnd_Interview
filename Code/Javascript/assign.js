/**
 * 把p中的可枚举属性赋值到o中，返回o
 * 如果o和p中含有同名属性，则覆盖o中的属性
 * @param {Object} o 
 * @param {Object} p 
 */
function extend(o, p) {
    for(prop in p) { 
        o[prop] = p[prop]; 
    }
    return o;
}

/**
 * 将p中的可枚举属性复制o中，同名属性跳过，返回o；
 * @param {Object} o 
 * @param {Object} p 
 */
function merge(o, p) {
    for(prop in p) {
        if(o.hasOwnProperty(prop))
            continue;
        o[prop] = p[prop];
    }
    return o;
}

/**
 * restrict函数取o与p属性的交集
 * 如果o中属性在p中没有同名属性，则从o中删除这个属性, 返回o;
 */
function restrict(o, p) {
    for(prop in p) {
        if(!(prop in o)) delete o[prop];
    }
    return o;
}

/**
 * substract函数取o与p属性的非集
 */
function substract(o, p) {
    for(prop in p) {
        delete o[prop];
    }
    return o;
}

/**
 * 返回一个新对象，求o和p属性的并集；
 * @param {Object} o 
 * @param {Object} p 
 */
function union(o, p) {
    return extend(extend({}, o), p);
}

/**
 * 返回一个新对象，求o和p属性的交集；
 * @param {Object} o 
 * @param {Object} p 
 */
function intersection(o, p) {
    return restrict(extend({}, o), p);
}

/**
 * 自己实现Object.keys()
 * @param {Object} o 
 */
// Object.prototype.keys2 = function(obj) {
//     const result = [];
//     for(let prop in obj) {
//         if(obj.hasOwnProperty(prop)) {
//             result.push(prop);
//         }
//     }
//     return result;
// }

// ====================test case===================
{
    var o = {
        'a': 1,
        'b': 2,
        'c': 3
    };
    var p = {
        'b': 3,
        'c': 4,
        'e': 5
    };

    console.log('union :', union(o, p));
    console.log('intersection :', intersection(o, p));
    console.log(o, p);
}