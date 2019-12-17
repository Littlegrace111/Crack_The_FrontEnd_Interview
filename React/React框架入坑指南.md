## React 是什么？
1. UI框架, 视图层框架；
2. React编程思想: UI组件化，all in JS(css, picture, html all import in js)，响应式编程框架；
3. 包含React.js / React Native / React VR(360)；
4. 函数式编程：便于单元测试；
5. Facebook 2013年开源；
6. React Fiber： React@16 非常重要的，具有里程碑意义的React版本；
7. React 设计理念包含很重要一条：all in js，css文件可以import到js文件里， 图片也可以import到js文件里；
8. React是声明式的开发方式：
    > Jquery 就是命令式的开发方式，React只需要去关注数据，数据构建好了，React框架会自动去渲染dom。
9. 可以与其他框架并存，React只是一个视图层框架，复杂应用还需要引入其他数据框架。
10. 单向数据流：父组件可以向子组件传递数据，子组件只能去使用父组件数据(Read-only)，不能改变父组件数据；
11. react只支持IE8以上的浏览器；

## React 脚手架工具
脚手架工具，前端工程化  
脚手架工具：webpack，gulp，grunt，yarn(基于node，npm/yarn)  
react脚手架工具：webpack  
Create-react-app 脚手架工具也是通过webpack实现的，适合新手  
Create-react-app 创建的项目默认不支持less编译，生成的项目文件，默认看不到  webpack配置
    > 暴露webpack配置文件： `npm run eject`

## React 编程思想

### UI组件化-利于代码复用
- JSX:  把HTML模板嵌入到JS中 (import react 用于编译JSX)
        HTML模板中嵌入JS表达式需要加{} 花括号， 同理注释也用花括号{/**/}；  
- ES6:  实现JS语言OOP的封装，实现UI组件化 (Component)；  
- JSX 语法：包裹的HTML模板必须有一个顶层元素，否则报错；React@16 Fragment 占位符：React@16 也就是React Fiber版本推出Fragment占位符，使得HTML模板可以去掉顶层元素，布局更加灵活

### 响应式设计思想
传统的web编程中，更新UI界面的方式是通过直接操纵Dom，来Dom的内容和样式；
React的设计思想和传统web编程的思想是完全不同的，React是一个响应式的框架，它强调的是不要直接操纵Dom；
我们直接操纵数据；通过数据的变化，React会自动感知到数据的变化，自动生成新的Dom；
对于React开发者来说，我们只需要关注数据层的操作就可以了。
React更新UI界面的方式：Dom节点和数据对象之间建立了一个绑定关系，只需要关注数据对象的变化，Dom界面会被动更新；

## 组件间数据通信：

### 父子组件通信 - Props
父组件向子组件传递数据：通过props属性来传递，子组件通过this.props来读取；
子组件向父组件传递数据：通过间接调用父组件的方法来传递， this.props.XXX();

组件的props： 用于父子组件之间的数据传递  
state：负责存储组件里面的数据 ;
setState方法：改变数据，数据变化需要深拷贝deepclone  
组件元素的事件绑定: onXXXX.bind(this) 改变事件函数的作用域

{/**dangerouslySetInnerHTML  不转义html， 但是可能会存在xss攻击风险，
如果有此需求，可以用dangerouslySetInnertHTML实现*/}

> React 关于数据变化的设计思想：immutable，state 不允许我们做任何改变，改变使用深拷贝，否则会影响react的性能优化。

## React 原理
数据发生变化，render函数会重新执行

JSX -> JS 对象(虚拟dom) -> 真实DOM

### 最早Web开发更新界面方式：
1. 数据发生变化；
2. 获取真实Dom节点；
3. 用新生成Dom替换原来的Dom；

### 加入字符串模板的更新方式：
1. 数据Data + 模板 结合 -> 生成真实Dom
2. 数据变化之后，主动更新；
3. 数据 + 模板 结合，生成新的模板字符串，存储在DocumentFragment中
4. 通过innerHTML挂载到真实Dom上；

### React更新界面方式：
![React Render 流程](../Images/React/react-render-process.png)
1. 初始化：state 数据 + JSX模板 结合
2. 生成虚拟Dom -> 挂载到真实Dom
3. state 数据变化，render函数回调（被动更新，无需开发者关注）
4. 生成新的虚拟Dom
5. 比较原始虚拟Dom和新的虚拟Dom的区别（React Diff 算法）
6. 只更新变更的Dom节点的内容  

### react key和diff机制
react的组件diff机制是基于Tree Diff策略，对树进行分层比较（dom跨层级移动操作特别少）。对于同一层级的一组节点，它们可以通过唯一id进行区分。
React只会简单的考虑同层级节点的位置变换，而对于不同层级的节点，只有创建和删除操作；

在开发组件时，保持稳定的DOM结构会有助于性能的提升。

## React 生命周期 (based on React v15)
![react v15的生命周期](../Images/React/react-life-cycle-v15.webp)
1. 初始化阶段：
   - constructor 构造函数
   - getDefaultProps 获取props默认值
   - getDefaultState 获取state默认值

2. 挂载阶段：
    - componentWillMount (React v16 弃用， 改用static getDerivedStateFromProps(props, state)) 
    - render
    - componentDidMount

3. 更新阶段
    - componentWillReceiveProps (React v16弃用）
    - shouldComponentUpdate
    - componentWillUpdate (React v16弃用）
    - render
    - componentDidUpdate

4. 卸载阶段
     - componentWillUnmount

## React 生命周期 (based on React v16)
![react v16的生命周期](../Images/React/react-life-cycle-v16.webp)
1. 初始化阶段：
    - constructor 构造函数；
    - getDefaultProps
    - getInitialState 
2. 挂载阶段：
    - static getDerivedStateFromProps(props, state)
    - render
    - componentDidMount
3. 更新阶段：
    - static getDerivedStateFromProps(props, state)
    - shouldComponentUpdate
    - render
    - getSnapshotBeforeUpdate(preProps, prevState)
    - componentDidUpdate
4. 卸载阶段：
    - componentWillUnmount
5. 错误处理：
    - componentDidCatch