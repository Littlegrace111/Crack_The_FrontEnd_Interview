# 深入理解基于React组件的数据流管理及组件间通信方式

## 前言
基于react数据流解决方案已经是一个老生常谈的问题了，在前端已经是非常成熟的领域了。然而，作为一个技术人员，知其然，必须知其所以然，在理解**what to do**，到达**how to do**，必须进入到**why to do**的领地，才能充分理解前端诸多框架本身。否则，在不知道开发的应用是如何工作的情况下，很容易给项目带来低质量的代码，影响项目的可维护性和稳定性。


## 父子组件通信
父组件向子组件传递数据：通过props属性来传递，子组件通过`this.props.data`来读取；
子组件向父组件传递数据：子组件通过传递参数给父组件props绑定的方法来向父组件传递数据，`this.props.Func(data1, data2, ...)`;

## 使用React提供的context
Context是React提供的一种组件树”全局“通信方式。从v16.3.0开始，React开始提供官方的context接口；
一个使用react context api例子：https://codesandbox.io/s/react-context-api-demo-vz8vm

### React.createContext
每个Context对象包含一个Provider的React组件，允许consumer组件来订阅context的改变。
```js
const AppContext = React.createContext();
```

```js
const { Provider, Consumer } = React.createContext(defaultValue);
```

### Provider组件
Context的Provider接受一个value属性来传递参数。**当value的属性发生变化时，所有作为Provider后代的consumer组件都会被重新渲染。
并且不受`shouldComponentUpdate`方法的约束。**

```js
<AppContext.Provider value={{
    state: this.state,
    actions: this.actions}}>
    <div className="App">
        <AsyncRoute />
    </div>
</AppContext.Provider>
```

### Consumer组件
使用高阶组件重构Consumer组件；
```js
const WithContext = (Component) => {
    // 返回一个functional的组件
    return (props) => (
        <AppContext.Consumer>
            {
                ({ state, actions }) => {
                    return <Component {...props} 
                                data={ state } 
                                actions={ actions } />
                }
            }
        </AppContext.Consumer>
    )
}
```

## 使用Redux框架管理数据流

![Redux](../Images/React/redux.png)

Redux把所有的数据放到store里面做统一管理，组件去监听store里面的数据的变化。某个组件改变了store里的数据，其他组件都能收到消息。

Redux = Reducer + Flux

### Redux的设计理念

![Redux-data-flow](../Images/React/redux-data-flow.png)

> Redux + Redux-thunk / Redux-Saga + immutable + React-Redux 一整套插件来实现

redux主要由三部分组成：store, reducer, action。

store是一个对象，代表**单一数据源且是只读的**，action是一系列操作的集合，可以通过actionCreator创建。reducer是一个纯函数，通过preState和action携带的数据生成新的state。

### Redux 运行流程
1. dispatch -> action;
2. reducer function call;
3. subscribe state change;
4. store.getState;

### store

#### createStore
`store`实例对象可以通过`createStore()`方法创建，接受三个参数：(后两个参数非必须)
1. reducer: 经过`combineReducers`合并的`reducer`;
2. preloadedState: `state`的初始状态；
3. enhancer: 改变`dispatch`的中间件；
    > enhancer 是一个组合store creator的高阶函数，返回一个新强化过的store creator。

```js
import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as home from './home/reducer';
import * as production from './production/reducer';
import thunk from 'redux-thunk';

let store = createStore(
    combineReducers({...home, ...production}),
    applyMiddleware(thunk)
);

export default store;
```

```js
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer, 
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
```

在`createStore`方法中可以使用`middleware`中间件对`action`进行改造。比如redux-thunk和redux-saga对dispatch进行改造，改造之前action函数只能返回对象，改造之后action函数可以返回一个函数，使得action成为高阶函数。

#### dispatch
`store`是一个对象，使用`dispatch` 方法分发`action`，当调用`dispatch(action)`的时候会立即触发`reducer`函数的执行。

#### subscribe
`store`的`subscribe`方法可以监听state的变化，此函数在store调用dispatch的时候会注册一个listener监听state变化，它返回一个函数，调用这个返回的函数可以注销监听。

```js
    componentDidMount() {
        console.log('componentDidMount');
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    componentWillUnmount() {
        console.log('componentWillUnmount'); 
        // 在组件unmount的时候把store的监听取消掉，防止memory leak
        this.unsubscribe();
    }
```

#### getState
`getState`方法用于获取store中state数据。

`getState`主要用在两个地方：
    1、store通过dispatch方法分发了action之后，需要通过getState获取store中的数据，并把这个数据传给reducer，这个过程是自动执行的；
    2、组件利用store的subscribe方法监听到state发生变化后调用它来获取新的state数据。

### action 与 actionCreator
`action`用于描述操作和携带操作产生的数据，本质是一个实例对象，actionCreator是action的生成工厂。

### reducer 与 combineReducer
`reducer`是一个函数，必须是一个纯函数，没有副作用， 可以理解为一个记录了所有操作的账本。

`combineReducer`函数用于合并reducer账本。

## Redux 中间件

### React-Redux数据流
React-Redux 将所有组件分成两大类：UI组件（presentational component）和容器组件（container component）;
- UI 组件
1. 只负责UI的呈现，不带有任何业务逻辑；
2. 没有状态（即不使用this.state这个变量），所有数据都有参数this.props提供；
3. 不使用任何Redux的API；

- 容器组件
1. 容器组件：负责管理数据和业务逻辑，不负责UI的呈现；
2. 带有内部状态；
3. 使用Redux的API；

如果一个组件既有UI又有业务逻辑，将它拆分成下面的结构：外面是一个容器组件，里面包了一个UI组件。前者负责与外部通信，将数据传递给后者，由后者渲染出视图。React-Redux规定，所有UI组件都由用户提供，容器组件是由React_Redux自动生成。

>react-redux 7.x 全面拥抱hooks，并且重新回到了基于Subscriptions的实现。使得react-redux 7.x 彻底解决了6.x的性能问题，甚至是所有react-redux中性能最好的。

#### connect()
```js
import { connect } from 'react-redux'
const visibleTodoList = connect(
    mapStateToProps, // 负责输入逻辑，即将state映射到UI组件的参数props
    mapDispatchToProps // 负责输出逻辑，即将用户对UI组件的操作映射成Action
)(TodoList);
```

1. 输入逻辑：外部的数据（即state对象）如何转换成为UI组件的参数；
2. 输出逻辑：用户发出的动作如何变为Action对象，从UI组件传递出去；
3. mapStateToProps会订阅Store，每当state更新的时候，就会自动执行，重新计算UI组件的参数，从而触发UI组件的重新渲染；
4. mapDispatchToProps用来建立UI组件的参数到store.dispatch方法的映射；

#### Provider组件
React-Redux提供Provider组件，可以让容器组件拿到state；Provider在根组件外面包了一层，这样一来，App的所有子组件就默认都可以拿到state了。它的原理是react组件的context属性。

```js
import React, { Component } from 'react';
import AsyncRoute from './router/';
import { Provider } from 'react-redux'
import store from './store'

class App extends Component {
	render() {
		return (
			<Provider store={ store }>
				<div className="App">
					<AsyncRoute />
				</div>
			</Provider>
		)
	}
}
```

### Redux-thunk

### Redux-saga

### Immutable