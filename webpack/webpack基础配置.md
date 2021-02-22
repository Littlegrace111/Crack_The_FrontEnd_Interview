## 一、前言

本文章基于 Webpack V4.0，Webpack 基于 node.js 实现。

## 二、Webpack 基本配置

1. Webpack 默认入口文件是 `src/index.js`
2. Webpack 默认输出目录是 `dist/main.js`
3. Webpack 默认的处理模块依赖包是基于 CommonJS 的，ES6 module 依赖要引入 babel-loader 来处理

## 三、什么是 loader

Webpack 天然只能处理 JS 文件，loader 是帮助 webpack 来处理其他类型的文件，如 css，图片等。loader 用于转换文件类型的模块。

### 使用 loader 打包静态资源

#### file-loader

#### url-loader

### 使用 loader 打包样式文件

#### css-loader & style-loader

css-loader 根据入口 css 文件的依赖管理，合并 css 文件。css-loader 支持打包 css modules 的写法。
style-loader 把 css-loader 合并好的 css 文件挂载的 html 的 head 部分。

#### 处理 sass 文件

`npm i sass-loader node-sass -D`

> 使用 node 版本 8.x.x 或者 10.x.x，不要使用 9.x.x 版本；

#### postcss-loader

postcss-loader 可以给 css 的样式自动添加厂商前缀

## 四、什么是 plugin（插件）

插件就是在 webpack 打包的某一个时间，把插件挂载进来做一些事情。例如：打包优化，资源管理，注入环境变量等。

### html-webpack-plugin

**html-webpack-plugin:** 会自动生成一个 html，并把打包生成的 js 自动引入到 html 文件中配置模板。

### clean-webpack-plugin

**clean-webpack-plugin:** 用于在 webpack 打包前清除输出目录；

## 五、Entry & output 的配置

**入口 entry:** 指示 webpack 使用哪个模块作为构建依赖关系的起点。entry 支持多入口的配置。默认值是`./src/index.js`。

**输出 output:** 指示 webpack 在哪里输出所创建的 bundle，以及如何命名这些文件。

当进行多入口打包时，输出采用**占位符**来规定生成规则。 例如，`[name] [hash]`

## 六、SourceMap 配置

sourceMap 是一个映射关系，输出代码与源代码之间的映射关系。

devtool 选项控制是否生成，以及如何生成 source map。不同的值会明显影响到代码构建的速度。

最佳实践使用 cheap-module-eval-source-map(开发环境)， cheap-module-source-map(生产环境)

sourceMap 的原理？？？需要深入了解一下。

## 七、WebpackDevServer 提升开发效率

`webpack --watch` 监听 src 目录下的代码改动，

webpack 默认没安装 webpackDevServer，需要手动安装。

webpackDevServer 会启动一个服务器，去打包代码。也可以使用 express 或者 koa 框架去自己开发一个 server，引入 webpackDevMiddleware。
webpackDevServer 生成的代码并不会放到一个 dist 目录下，而是放到的 server 的内存里，在开发阶段，能够提升打包效率。

devServer 配置，proxy 配置跨域代理。

## 八、Hot Module Replacement（HMR） 热更新

配置 HMR，可以对代码进行局部增量更新，而不是每次更新都重复刷新浏览器。
HMR 使用场景：方便调试 CSS 样式文件；

css-loader 内置了 HMR 的实现
vue-loader 也内置了 HMR 的实现

（重点理解 HMR：HMR 实现原理？？？）

## 九、Babel 处理 ES6 语法

抽象语法树 AST。

Babel ES6 -》 ES5

`npm install --save-dev babel-loader @babel/core`

`babel-loader` 是 webpack 与 babel 的桥梁，但是生成抽象语法树(ES6->ES5)其实不是在 babel-loader 里实现的，而是在`@babel/core`

配置 `.babelrc`，配置 ES6 语法的翻译规则

`npm install @babel/preset-env --save-dev`，`@babel/preset-env` 里面包含了所有 babel 的语法规则。

### 按需引入@babel/polyfill

`@babel/polyfill`这个包帮助代码去兼容低版本的浏览器，比如某些低端浏览器不支持 promise 或者数组和对象的一些高级方法，可以使用这个库做 polyfill。

使用方法：
`npm i @babel/polyfill -D` 安装;
在代码中 `import "@babel/polyfill"`。 另外如果在`.babelrc`里面配置了`"useBuiltIns": "usage"`，可以让 babel polyfill 按需引用生效。就不用在代码里声明 `import "@babel/polyfill"`。

此方法缺点就是，引入此包，会使打包文件变得很大。可以在 看 webpack.config.js 文件中配置`useBuiltIns: "usage"`来按需引用此包，减小打包文件的大小。同时可以结合 targets 配置目标浏览器的版本，和 polyfill 一起配合起来，来判断是否需要打包 polyfill 进去。

此方法适用于业务代码配置 polyfill。类库代码引入 polyfill，此方法不适用。原因是采用直接 import 的方式来引入，是全局引入，会污染全局对象，作为类库不应该采用会污染全局对象的方式。

### 在类库引入 babel polyfill

`npm i @babel/plugin-transform-runtime -D`
`npm i --save @babel/runtime`

babel polyfill 会已闭包的形式注入，不会污染全局代码。所以通常用在类库打包中。

### 采用.babelrc 来配置 babel

项目工程发展到后面，babel 的配置项会非常的多，写在 webpack.config.js 文件中会非常庞大，可以把 options 里的配置单独抽取出来放在`.babelrc`文件里，让 webpack.config.js 的代码更具有可维护性。

## 十、Webpack 实现 React 框架代码打包

在 babel 的官方文档的 presets 部分，有介绍如何配置 react 打包的部分。

安装：`npm i @babel/preset-react -D`，在`.babelrc`中进行配置 presets。

注意，在配置 loader 的时候，使用 loader 的顺序不能写错，因为 loader 执行的逻辑是栈，栈是先进后出的。最底下的 loader 会先执行。

## 涉及到的网址

[webpack]: https://webpack.js.org/concepts/
[babel]: https://babeljs.io/docs/en/babel-preset-react
