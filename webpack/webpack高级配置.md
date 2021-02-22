# Webpack 高级配置

你所需要知道的 webpack 打包的解决方案；

## Tree Shaking 概念

Tree shaking 只支持 esModule 的引入方式: `import`，不支持 commonJS 的引入方式：`require`。这是因为，esModule 的 import 底层是静态引入的方式，而 require 底层是动态引入的方式。tree shaking 只支持静态引入，对代码做 tree shaking 分析。

在 develop 模式下，默认是不开启 tree shaking。

### develop 模式配置 tree shaking

1. webpack.config 配置 optimaztion
2. package.json 中配置 sideEffects: `[ 这里配置 tree shaking 需要忽略的模块]`，如果设置成 false，就表示 tree shaking 不需要忽略任何模块。

在开发模式下开启 tree shaking，并不会把不需要接口给摇晃掉，原因是可能会影响到 source-map 定位代码行数的准确性，如果在开发模式下去掉不要的代码，进行调试的时候，代码行数定位可能是不准确的。所以开发模式下，即使开启 tree shaking 也会保留冗余代码。

### production 模式配置 tree shaking

在 production 模式下，tree shaking 被默认配置好了，不需要进行额外配置`optimization`。但是 package.json 中的 sideEffects 还是要声明好。

### antd 配置按需加载

`npm i babel-plugin-import -D`

`babel-plugin-import` 是一个用于按需加载组件代码和样式的 babel 插件。其实，antd 默认支持基于 ES module 的 tree shaking，js 代码部分不使用这个插件也会有按需加载的效果。

## Development 和 Production 模式区分打包

development: 代码里有很多调试信息。
production: 代码被压缩，混淆。

可以通过`webpack --config` 带参数来指定打包的配置文件。可以抽取一个 webpack.common.js 文件，做一些公共的配置的复用。

## Code Spliting 代码分割

## Lazy Loading 懒加载

## Preloading

## CSS 文件的代码分割

## Webpack 与浏览器缓存

## Shimming 的作用
