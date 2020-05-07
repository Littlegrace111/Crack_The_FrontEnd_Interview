# React Route

## 简介

React Route 是一个基于 React 之上的强大路由库。它可以让应用快速的添加**视图**和**数据流**，同时保持页面与 URL 的同步。

## 路由配置

通过路由配置，可以让 UI 从 URL 中解耦出来。

### 路由匹配规则

React Router 使用路由嵌套的方式来组织路由。当一个给定的 URL 被渲染，整个集合中被命中的部分都会被渲染。嵌套路由被描述成一种树形结构，React-Router 会**深度优先遍历**整个路由配置来寻找与给定的 URL 相匹配的路由。

### Router 组件

React Route 是建立在 history API 之上。常用的 Router 组件有三种：

-   BrowserRouter
-   HashRouter
-   MemoryRouter 和 StaticRouter

#### BrowserRouter

`BrowserRouter`是 React Router 推荐的动态路由配置，BrowserHistory 使用 HTML5 提供的`window.history` API`(putState, replaceState和popState)`来保持 URL 和组件的同步，同时可以满足动态路由配置的需要。

**前端路由服务器配置**
采用 BrowserRouter 路由，服务器需要做好处理 URL 的准备。需要在服务端把子路由指定到 index.html 里面。

```js
const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;
const app = express();

// 通常用于加载静态资源
app.use(express.static(__dirname + "/public"));

// 在你应用 Javascript 文件中包含了一个 script 标签的index.html 中处理任何一个 route
app.get("*", function(request, response) {
	response.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(port);
console.log("server started on port " + port);
```

如果你的服务器是`nginx`，请使用 try_files 指令：

```
server {
    ...
    location {
        try_files $uri /index.html
    }
}
```

#### HashRouter

HashRouter 是静态路由配置，不需要服务器任何配置就可以运行。HashRouter 使用 URL 中的 hash(#锚点)来创建`/#something/path`的路由。
`Hash History`通过 URL 的 hash 部分`window.location.hash = newHash`来处理跳转。

#### MemoryRouter

MemoryHistory 不会在地址栏被操作或读取，通常用于服务端渲染。MemoryRouter 将历史记录保存在内存中，这个在测试和非浏览器环境中很有用（比如 React Native）。

### Route 组件

Route 组件是用于声明 path 属性与某个 location 映射的 UI 绑定。
`<IndexRoute />`默认路由组件。`<Redirect />`组件。

### Link 组件

需要了解一下`<IndexLink />`。

### Switch 组件

Switch 用于渲染与路径匹配的第一个 Route 或 Redirect。

## 路由传参

React-Router 目前支持三种参数传递方式。`browserhistory`，刷新页面，参数不会刷新

### props.params

给 Route 指定一个 path，path 上指定通配符可以携带参数到指定的 path。

```js
import { Router, Route, hashHistory } from "react-router";
const app = () => (
	<Router history={hashHistory}>
		<Route path="/user/:name" component={UserPage}></Route>
	</Router>
);
```

Link 组件实现跳转: `<Link to="/user/tom" />`, 通过`props.params.name`来获取。

这种方式只能传递字符串或者数字，没有办法传递一个对象，也就是复合类型。

### query

query 支持所有的 JS 基本数据类型：字符串（String）、数字(Number)、布尔(Boolean)、空值（Null）、未定义（Undefined）、Symbol 和引用数据类型：对象(Object)、数组(Array)、函数(Function)，**在新页面刷新后，传来的数据不复存在**，不用 query 这个标识符随便起一个名字（除了 state 和 search）和 query 作用完全相同，query 不会把数据加到 URL 上。

```jsx
<Route path='/user' component={UserPage}></Route>

var data = {id:3,name:sam,age:36};
var path = {
  pathname:'/user',
  query:data,
}

<Link to={path}>用户</Link>
hashHistory.push(path);

// 获取数据：
var data = this.props.location.query;
var {id,name,age} = data;
```

```js
<Link
	to={{
		pathname: `/project`,
		query: function a() {
			return "name=test";
		}
	}}
>
	项目
</Link>
//this.props.location.query 拿到 function a() {return 'name=test'}。
```

### state

state 支持除 Symbol 和函数之外的所有数据类型包括基本数据类型：字符串（String）、数字(Number)、布尔(Boolean)、空值（Null）、未定义（Undefined）和引用数据类型：对象(Object)、数组(Array)，在新页面刷新后数据还存在，state 不会把数据加到 URL 上。

```js
<Link to={{ pathname: `/project`, state: { name: "test" } }}>项目</Link>
// 在新页面可以通过 this.props.location.state 拿到 {name: 'test'}。
```

### search

search 只支持字符串，在新页面刷新后数据还存在，会把数据加到 URL 上，URL 上的数据前面会加 ?，类似于 https://a.com/project?name=test。

```js
<Link to={{ pathname: `/project`, search: "name=test" }}>项目</Link>
//在新页面可以通过 this.props.location.search 拿到 'name=test'。
```

## 权限路由

## 基于路由的代码拆分和按需加载

## 引用

[react-router v4 api](https://reacttraining.com/react-router/web/api)
[react-router v4 中文文档](https://segmentfault.com/a/1190000014294604)
[react-router 详解](https://juejin.im/post/5c3070266fb9a049c232940e#heading-2)
