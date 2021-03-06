// js 数组就可以已经有栈操作的接口了
// 栈常规操作：push（入栈），pop（出栈），peek（读取）
const stack=[];
stack.push(1);
stack.push('2');
const item = stack.pop();
console.log(item);

/**
 * ES6 class 封装一个Stack类，包括push，pop，peek方法
 * 
 * */
