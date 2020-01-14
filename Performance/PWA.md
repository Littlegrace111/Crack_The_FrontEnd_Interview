# PWA
## PWA 是什么？
Progressive Web App, Google 提出的一种WebApp模型，增强Web App的用户体验。
PWA指导思想，在不同的环境下（比如离线，弱网，4G），web页面都能工作，并且体验是根据环境的好坏程度渐进提升的。

## PWA指导思想
**可靠：**  在没有网络的环境中也能提供基本的页面访问。
**快速**: 针对网页渲染和网络数据访问有较好的优化。
**融入(Enageging)**: 应用可以被添加到手机桌面，并且和普通应用一样有全屏，推送等特性。

> Google 提供了Lighthouse 性能检测工具来监测一个网站是否符合PWA指标。

## Service Worker
Service Worker 是一个脚本，浏览器独立于当前网页，将其在后台运行，为实现一些不依赖页面或用户交互的特性打开一扇大门。
这些特性包括：消息推送，背景后台同步，geofencing（地理围栏定位）等。
其首要特性：拦截和处理网络请求能力，和能够以编程的方式来管理被缓存的响应。

类比于Android的后台Service。

### Service Worker特性
1. 拦截和处理网络请求的能力；
2. 可以与页面通信的能力，使得涉及页面大量的运算的逻辑可以放到SW中执行；
3. SW 提供的cache api能够细粒度的控制网络缓存，可以实现应用离线化；
4. 消息推送，message push

### SW - 基于事件驱动
   
### SW chrome 调试
`chrome://serviceworker-internals/`
`chrome://inspect/#service-workers`
