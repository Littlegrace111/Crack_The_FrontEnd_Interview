## H5 与 Native 通信

JS Bridge 前端与客户端交互的一个配置文件

H5 调用 Native API 本质是 RPC 调用，

1. JS Bridge
2. URL Schema

H5 JS 调用 Native API

```js
var NativeBridge = {
	getAddress: function (callback) {},
};
```
