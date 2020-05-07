## Webpack基本配置

1. Webpack 默认入口文件是 `src/index.js`
2. Webpack 默认输出目录是 `dist/main.js`
3. Webpack 默认的处理模块依赖包是基于CommonJS的，ES6 module依赖要引入Loader来处理

## loader 
loader让webpack能够去处理那些非Javascript文件。Webpack自身只理解Javascript。
loader可以将所有类型的文件转换成webpack能够处理的有效模块，然后你就可以利用webpack的打包能力，对他们进行处理。

