## React Key和Diff机制
### Tree Diff策略
1. react的组件diff机制是基于Tree Diff策略，对树进行分层比较（dom跨层级移动操作特别少）。
2. 对于同一层级的一组节点，它们可以通过唯一id进行区分。
3. 拥有相同类的两个组件将生成相似的树形结构，拥有不同类的两个组件将生成不同的树形结构
React只会简单的考虑同层级节点的位置变换，而对于不同层级的节点，只有创建和删除操作；
在开发组件时，保持稳定的**DOM结构的稳定性**会有助于性能的提升。

### Component Diff策略
1. 如果是同一类型组件，按照原策略继续比较virtual DOM tree；
2. 如果不是，则将该组件判断为dirty component，从而替换整个组件下的所有子节点；
3. 对于同一类型的组件，有可能其Virtual DOM没有任何变化，如果能够确切的知道这点那可以节省大量的diff运算时间，因此React允许用户通过`shouldComponentUpdate()`来判断该组件是否需要进行diff；

### Element Diff策略
1. 当节点处于同一层级时，React diff提供三种操作，分别为`INSERT_MARKUP`(插入), `MOVE_EXISTING`(移动), 和`REMOVE_NODE`(删除)。
2. React通过设置唯一key的策略，对element diff 进行算法优化，避免频繁的删除和插入操作；

## 探究setState执行的机制

### 在React钩子函数和React合成事件中的setState
```js
    // state = { index: 0 } in contructor
    componentDidMount() {
        console.log(WelcomePage.pageName, 'componentDidMount');
        /**
         * 在合成事件和钩子函数中调用setState
         */
        this.setState({
            index: this.state.index + 1
        })
        console.log('[componentDidMount]: state', this.state.index);

        this.setState({
            index: this.state.index + 1 // 执行了两次setstate只有一次生效
        })
        console.log('[componentDidMount]: state', this.state.index);
    }

    componentDidUpdate() {
        console.log('[componentDidUpdate]: state', this.state.index);
    }
```
> 这段代码将怎么打印？

![react-setstate-log](../Images/React/react-setstate-in-sync-task.png)

1. 调用setState后，立即读取state里的属性，state不会立即更新；
2. 当前组件didmount后，父组件didmount，直到所有组件完成一次更新，然后state里的属性才会真正更新；
3. 更新时会把整条链路上的每个组件的更新合并，每个组件只会触发一次更新的生命周期；

在react生命周期和合成事件中，react仍然处于他的更新机制中，这时无论调用多少次setState，都不会执行更新，而是将要更新的state存入一个暂存队列中，等到最顶层的组件完成didmount或didupdate之后，将统一执行之前所积累的队列中的setState。

**setState是同步的还是异步的？**
由执行机制来看，setState本身不是异步的，而是如果在调用setState时，如果react正处于更新过程中，当前更新会被暂存，等上一次更新执行后再执行，**这样的机制可以确保组件不会被多次重复渲染。**

### React组件在异步函数和原生事件中的setState
```js
    componentDidMount() {
        console.log(WelcomePage.pageName, 'componentDidMount');
        /**
         * 在异步函数和原生事件中调用setState
         */
        setTimeout(() => {
            console.log('setTimout');
            this.setState({
                index: this.state.index + 1
            })
            console.log('[setTimout]: state', this.state.index);
            this.setState({
                index: this.state.index + 1
            })
            console.log('[setTimout]: state', this.state.index);
        }, 0);
    }
    componentDidUpdate() {
        console.log('[componentDidUpdate]: state', this.state.index);
    }
}
```
> 这段代码将怎么打印？

![react-setstate-in-async-task](../Images/React/react-setstate-in-async-task.png)

根据JS的event loop的事件模型，原生事件和异步调用（包括http请求，setTimeout等函数）属于宏任务（也叫异步任务），其他同步的代码执行属于微任务（也叫同步任务）。

所以，根据Javascript代码的执行机制，会将异步任务先暂存起来，等所有同步代码执行完毕后再执行，这时上一次更新过程已经执行完毕了，这时在异步任务里调用setState，会立即执行更新，并拿到最新更新的结果。

### 为什么有时连续调用两次setState只有一次生效？
setState 第一个参数支持传入一个对象或者一个函数，第二个可选参数可以传入一个callback，在setState成功之后执行。

```js
    componentDidMount() {
        console.log(WelcomePage.pageName, 'componentDidMount');
        /**
         * 在合成事件和钩子函数中调用setState
         * 为什么两次setState只有一次生效了？
         */
        this.setState({
            index: this.state.index + 1
        }, () => {
            console.log('[componentDidMount]: state 222', this.state.index);
        })
        console.log('[componentDidMount]: state 111', this.state.index);

        this.setState({
            index: this.state.index + 1
        }, () => { // 传入callback, setState成功后回调
            console.log('[componentDidMount]: state 444', this.state.index);
        })
        console.log('[componentDidMount]: state 333', this.state.index);
    }
```

```js
    componentDidMount() {
        console.log(WelcomePage.pageName, 'componentDidMount');
        this.setState( preState => ({ // setState 第一个参数传入一个函数
            index: preState.index + 1
        }), () => {
            console.log('[componentDidMount]: state 222', this.state.index);
        })
        console.log('[componentDidMount]: state 111', this.state.index);

        this.setState( preState => ({
            index: preState.index + 1
        }), () => { // 传入callback, setState成功后回调
            console.log('[componentDidMount]: state 444', this.state.index);
        })
        console.log('[componentDidMount]: state 333', this.state.index);
    }
```
1. 直接传递对象的setState会被合并成一次；
2. 使用函数传递的setState不会被合并；

根据react源码查看setState合并机制：
```js
_assign(nextState, typeof partial === 'function' ? partial call(inst, nextState, props, context) : partial);
```
如果传入的是对象，很明显会被合并成一次，如果传入的是函数，函数的参数preState是前一次合并后的结果，不会被合并。

### 总结 - 最佳实践
1. 不推荐直接在`componentDidMount`里直接调用setState（源自官方文档）。原因是，在componentDidMount中，立即直接调用setState()（不是放在异步任务里面调用），会触发一次额外的渲染，但是它将在浏览器刷新屏幕之前发生。也就是说，**在componentDidMount中直接调用setState很可能会造成界面的卡顿和丢帧，会导致一些性能问题。** 推荐，在constructor中使用赋值初始态来替代。
2. 不能在`componentWillUpdate` 和 `componentDidUpdate` 这两个生命周期中不能调用setState，会造成死循环，导致程序崩溃。
3. react会对多次连续的setState（参数为对象）进行合并，如果你想立即使用上次setState后的结果进行下一次setState，可以让setState接收一个函数而不是一个对象。这个函数用上一个state作为第一个参数，将此次更新时的state作为第二个参数。

源自此文章：https://mp.weixin.qq.com/s/vDJ_Txm4wi-cMVlX5xypLg

## 探究Virtual Dom的原理
`Virtual Dom`的优势在于React的Diff算法和批处理策略，React在页面更新之前，提前计算好了如何进行更新和渲染DOM。这个计算过程在开发者直接操作DOM时，也是可以自己判断和实现的。
所以，`Virtual Dom`并不一定比普通Dom快。我更倾向于说，`Virtual Dom`帮助开发者提高了开发效率，使得开发者不需要去关心在重复渲染界面的时候，如何计算是更高效的更新，react帮助开发者做了这件事情，开发者可以更加专注于业务开发。

## 为何要在componentDidMount中发送AJAX请求
