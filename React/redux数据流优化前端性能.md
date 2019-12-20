# 基于react渲染机制的前端性能优化

![react表示法](../Images/React/react表示法.png)

React最佳实践：多个component之间发生交互，那么状态就维护在这些Component的最小公约父节点上，即`<App/>`；

`<TodoList />`, `<Todo />`, 以及`<AddTodoBtn />`本身不维持任何state，完全由父节点`<App/>`传入props以决定其展现，是一个纯函数的存在形式，即：`Pure Component`。

![redux表示法](../Images/React/Redux表示法.png)
React只负责页面渲染，而不负责页面逻辑，页面逻辑可以从中单独抽取出来，变成store。

![redux-saga表示法](../Images/React/redux-saga表示法.png)
加入redux-saga，使用Middleware拦截action，异步的网络操作，做成一个Middleware就行。

![Dva表示法](../Images/React/Dva表示法.png)
Dva是基于React+Redux+Saga的最佳实践沉淀。
1. 把store及saga统一为一个model的概念，写在一个js文件里
2. 增加了一个Subscriptions，用于收集其他来源的action，比如键盘操作等；
3. model写法简洁，约定优于配置；