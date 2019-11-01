# WebSocket 新司机开车指南

## WebSocket 前世今生

### Websocket协议

首先，websocket是一种全双工通信协议，支持处理高并发及实时性强的场景。它只是叫websocket，但是跟浏览器并没有什么本质依赖关系。
传统解决实时通讯的方案，一般采用轮询方案，缺点是效率低下，浪费带宽。
HTML5规范出来之后，浏览器内部统一规范实现了websocket协议，支持全双工实时通信。同时，JavaEE7也实现了websocket协议，可以在Android等应用里面引入websocket协议。

#### WebSocket 与HTTP的异同点：

**不同点：**   
 websocket是全双工通信协议，既支持客户端发给服务端，同时服务端也可以主动推送给客户端（经常说的服务端push通道）；HTTP只能客户端向服务端请求，一个request对应一个response。

**相同点：**  
websocket协议在建立连接阶段采用的是HTTP协议通信；与HTTP一样底层通过建立的TCP连接来传输数据。

更多具体细节，可以参阅Websocket协议栈：
https://tools.ietf.org/html/rfc6455

## WebSocket NodeJS Server实现
#### Installing
`npm install --save ws`

#### 最简单的Server Example
```js
const WebSocket = require('ws');
const webSocketServer = new WebSocket.Server({ port : 8080});

webSocketServer.on('connection', function connection(wsClient) {
    wsClient.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    wsClient.send('something');
});
```

#### websocket In express

websocket可以和express同用，可以共享express的server端口。

```js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();

app.use(function (req, res) {
    res.send({meg: hello});
});

const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on('connection', function connection(wsClient, req) {
    const ip = req.connection.remoteAddress;//获取客户端ip

    const ip = req.headers['x-forwarded-for'];//若通过代理

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});

server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});
```

#### 服务端维持心跳包

若服务端不维持心跳包，客户端一般在一分钟(时间间隔不一定，注意具体情况具体分析)之内不发送消息，websocket连接就会自动断开。`ws`库提供`ping`事件和`pong`事件来维持心跳包，心跳包由服务端发送，客户端一般无感知，就是说心跳包对客户端来说是透明的。

```js
const WebSocket = require('ws');
const webSocketServer = new WebSocket.Server({ port: 8080 });

webSocketServer.on('connection', function connection(wsClient) {
    wsClient.isAlive = true;
    wsClient.on('pong', heartbeat);
});

const interval = setInterval(function ping() {
    webSocketServer.clients.forEach( function each(wsClient) {
        if(wsClient.isAlive === false)
            return wsClient.terminate();

        wsClient.isAlive = false;
        wsClient.ping(loop);
    });
}, 30000);

function loop() {
    //do something
}

function heartbeat() {
    this.isAlive = true;
}
```
#### 服务端向客户端广播

在某些场景下，需要服务端主动推送消息给全部客户端，或者某些符合条件的客户端。

```js
const WebSocket = require('ws');
const webSocketServer = new WebSocket.Server({ port: 8080});

webSocketServer.on('connection', function connection(wsClient) {
    wsClient.on('message', function incoming(data) {
        webSocketServer.clients.forEach(function each(client) {
            if(client !== wsClient && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});

```
文章：
https://www.atatech.org/articles/71289?commentId=118144#comment-118144

### wss

## NodeJS 应用部署

### 多节点集群部署

### 发布订阅模式 For Redis

### 消息队列

### Stiky Session

