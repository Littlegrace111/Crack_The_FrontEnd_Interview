# Typescript

## TypeScript是什么？
- JS超集
    TypeScript扩展了Javascript的语法，任何运行良好的JS程序可以不加改动地在TypeScript环境下运行。
- 遵循ES6规范
    TypeScript向Javascript添加了一些新的遵循ES6规范的语法，以及基于类的面向对象编程的特性。
- 微软开发
    Typescript是微软开发的，并且Google的Angular2框架就是TypeScript编写的，两大厂商为Typescript背书，给TS今后的发展提供了有力的支撑。使得TS很可能成为今后前端脚本语言的主流方向。

## TS的优势
- 支持ES6规范
    ES2015，客户端脚本语言主流语法
- IDE支持
    强制类型检查，减少在开发阶段犯错误的几率，
    类型提示，提高开发效率
    重构，方便修改方法，变量的名字，提升代码质量
- Angular2开发语言，完全使用TS编写

## TS compiler
TS -> compiler -> JS(babel)
部分浏览器不支持原生ES6规范的语法，需要通过编译器（例如babel）去转成Javascript ES5的语法。

## TS 特点
1. 强类型检查
    每个变量限定类型，编译器实时检查提示，减少在开发阶段犯错误的几率，增强程序的健壮性和可维护性；
2. 完整面向对象
    基于类完全实现模块化，作用域隔离和命名空间管理，无论多复杂的应用，至少编辑器和语言不会成为拖累；
3. 具备对象继承，泛型，接口，枚举，命名空间等JS所不具备的高级语言特性，弥补了JS在大型应用开发中的不足；

> 「只要你使用过ES6，TypeScript可以几乎无门槛接入」

> 「TS可以在任何场景替代JS」

## Typescript 语法

### TS参数特性
- 参数类型
    在参数名称后面使用冒号来指定参数类型
- 默认参数
    在参数声明后面用等号来指定参数默认值

``` var myname: string = "dongni";```

## Typescript在React中使用
- 使用TypeScript和React创建工程
- 使用TSLint进行代码检查
- 使用Jest和Enzyme进行测试
- 使用Redux管理状态

`create-react-app my-app --scripts-version=react-scripts-ts`

`react-script-ts`是一系列的适配器

安装react, react-dom 和react-scripts-ts等

npm run test 运行Jest测试工具，它会运行所有扩展名是`.test.ts`或`.spec.ts`的文件

https://typescript.bootcss.com/tutorials/react.html