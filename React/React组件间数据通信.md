# React 组件间通信方式

## 父子组件通信
父组件向子组件传递数据：通过props属性来传递，子组件通过this.props来读取；
子组件向父组件传递数据：通过间接调用父组件的方法来传递， this.props.XXX();

## 使用React提供的context
Context是React提供的一种组件树”全局“通信方式。

### React.createContext
每个Context对象包含一个Provider的React组件，允许consumer组件来订阅context的改变。
```js
const AppContext = React.createContext();
```

### Context的Provider与Consumer
Context的Provider接受一个value属性来传递参数。当value的属性发生变化时，所有作为Provider后代的consumer组件都会被重新渲染。
并且不受`shouldComponentUpdate`方法的约束。
```js
<AppContext.Provider value={{
    state: this.state,
    actions: this.actions}}>
    <div className="App">
        <AsyncRoute />
    </div>
</AppContext.Provider>
```

### 高阶组件重构Consumer
```js
const WithContext = (Component) => {
    // 返回一个functional的组件
    return (props) => (
        <AppContext.Consumer>
            {({ state, actions }) => {
                return <Component {...props} 
                            data={ state } 
                            actions={ actions } />
            }}
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
2. preloadedState: `state`的初始状态;
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

### Redux 中间件

#### Redux-thunk

#### Redux-saga

### Immutable

### React-Redux