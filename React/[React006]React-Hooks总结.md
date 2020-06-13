# 云流 ASCM 云管平台前端 React-Hooks 开发实践总结

## 前言

React-Hooks 是 React 官方团队在 2018 年在开发者大会上正式提出的。

众所周知，React 最主要的两个优势就是组件化和 virtual dom。组件是 React 代码复用的主要单元，在提出 React-Hooks 之前，React 有两种组件：一种是 `Class Component`，一种是 `Functional Component`。
`Function Component` 的特点就是不自己保存状态，没有生命周期且不能处理副作用。所以函数组件能够非常方便地被复用，组件复用的成本比较小。
`Class Component` 的特点就是有自己的生命周期，组件内部维护了自己的状态，且能够处理副作用。由于类组件本身会维护自己的状态，所以类组件的复用是有成本的。目前类组件最流行的复用方式是`HOC`高阶组件 和`Render props` 。

## 类组件如何进行组件复用?

代码复用是程序编程的永恒话题，任何一门技术如果不能提供比较快捷和优雅的代码复用机制，将很难走得很远。代码复用的本质就是如何优雅地抽离公共部分的逻辑，已达到快速迭代和复用的目的。

### HOC 高阶组件(Higher Order Component)

HOC 高阶组件并不是一种功能，而是一种组件复用的设计模式。用一个 Wrapper 组件去包裹一个目标组件，从而生成一个新的组件，并把公共逻辑的部分定义在 Wrapper 组件里面。

```js
// HOCFactory 工厂函数，传入一个组件，返回一个包装过的HOC组件
const HOCFactory = (Component) => {
	class HOC extends React.Component {
		// 在此定义多个组件的公共逻辑
		render() {
			return <Component {...this.props} />;
		}
	}

	return HOCFactory;
};
const WrapperHOCComponent1 = HOCFactory(Component1);
const WrapperHOCComponent2 = HOCFactory(Component2);
```

React-Redux 库里面的 connect 就是高阶组件生成函数，用于把 Redux 的 dispatch 注入到 UI 组件里面。

```js
import { connect } from "react-redux";

const VisibleTodoList = connect(mapStateToProps, mapDispathToProps)(TodoList);

export default VisibleTodoList;
```

**高阶组件的缺点就是 HOC 的组件封装方式会产生很多胶水层代码。HOC 会增加很多中间层，这些中间层的作用仅仅就是用来传递数据，这样就造成了 Dom 层次没有必要的增加，造成了冗余和浪费。**下面这张图是使用 HOC 封装组件的情况，可以看到里面有非常都的中间层，然而这张图还不是最夸张的，当业务逻辑复杂的时候，里面的中间层会非常多。

![react-hoc](../Images/React/react-hoc.png)

### Render Props

React 组件还有另外一种复用方式，就是 Render Props 这种复用方式。`Render Props`是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的技术。具有 render prop 的组件接受一个函数，该函数返回一个 React 元素，而不是实现自己的渲染逻辑。

`Render Props` 的核心思想就是通过一个函数将类组件的 state 作为 props 传递给纯函数组件。每个组件默认有一个 props 属性，props 这个属性可以挂载一个对象，也可以挂载一个函数。render props 这种方式，就是 props 挂载一个函数，且这个函数必须返回一个组件。
`Render Props` 组件复用方式是一种高度定制化的方式，比较简洁，不会像 HOC 高阶组件的方式增加很多的中间层，但不是很好理解。
注意，Render Props 是一种组件复用模式，并不一定需要使用名为 render 的 prop 来实现这种模式。任何动态渲染组件的函数 prop 都可以被称为“render prop”。

```js
/**
 * Render Props
 * @param {UI} Component
 */
const WithContext = (Component) => {
	// 返回一个functional的组件
	return (props) => (
		<AppContext.Consumer>
			{({ state, actions }) => {
				return <Component {...props} data={state} actions={actions} />;
			}}
		</AppContext.Consumer>
	);
};

export default WithContext;
```

### Class Component 组件复用的问题

1. HOC
   HOC 组件嵌套地狱，每一个 HOC 的封装与包裹都会产生一个中间层组件，这个组件的作用仅仅就是用来传递数据；
   包裹层级太多，可能会带来 props 属性被覆盖的问题；
2. Render Props:
   Render Props 虽然让数据流更加的直观，但是本质上 Render props 是基于闭包实现的，大量使用 Render props 将不可避免地引入 callback hell 问题；

## 为什么要使用 React-Hooks

### React Hooks 能实现优雅的函数式编程

React 官方团队特别推崇函数式编程，也就是为了保持函数式的编程方式。Class Component 经常需要处理 this 指向的问题，无非就是通过 bind 的方式绑定 this，或者通过箭头函数去在函数声明的时候绑定 this。如果一个函数里面需要处理 this，它就不是一个纯函数。所以基于以上这些方方面面的原因，React 团队提出的了 React-Hooks 这种组件方式，使用函数式的组件编写方式，通过 hooks 函数钩子来处理副作用。这样，即可以比较优雅的处理副作用，又能沿用函数组件比较好的组件复用能力。

### React Hooks 比类组件更加简洁

### 什么是 React——Hooks

React-Hooks 本质是一群函数，这个函数的作用，就是用于放在函数组件里面，来管理状态，处理副作用和替代 class 组件生命周期等功能。注意，hooks 不能在 class 组件中使用。可以安装一个 React 官方推荐的插件来检查 react-hooks 的编写问题；

`eslint-plugin-react-hooks`

```js
"eslintConfig": {
    "extends": "react-app",
    "plugins": [
        "react-hooks"
    ],
    "rules": {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
    }
}
```

## useState

useState 比较简单，主要的考虑点在于：useState 比 setState 的优点在哪里？不推荐把很多状态耦合在一次去复制，而是通过 useState 分开管理。

## useEffect

useEffect 函数钩子是用来处理组件的副作用。**什么是副作用？**副作用：数据异步获取，订阅，或者手动修改 DOM 等;

useEffect: 跟 class 组件中的 componentDidMount componentDidUpdate, componentWillUnmount 这三个函数具有相同的功能，不过被合并成一个 api 了。
useEffect：默认情况下，React 会在每次渲染后调用副作用函数，包括第一次渲染的时候。相当于 componentDidMount 和 componentDidUpdate。
useEffect：后面可以跟一个 optional 的参数，如果是一个空数组，则只在 componentDidMount 的时候回调一次，传入 useState 里监听的值，可以在值每次变化的时候就回调。
useEffect 里面可以 return 一个函数，用于对副作用函数的清理工作。这个函数会在每次监听的变量回调之后，先执行。

注意，useEffect 不能在条件语句里面或者条件语句的后面调用（if/else）。什么原因呢？React-Hooks 本质上会把所有的 hooks 当做一个链表去存储。如果在条件语句里面提前退出，后面的

```js
useEffect(() => {
	// useEffect capture valid 把初次引入变量的值闭包住；
	const Timer = setInterval(() => {
		setCount(count + 1);
	}, 500);

	return () => {
		clearInterval(Timer); // count 变化之后先执行清理函数
	};
}, [count]); // 监听count值的变化，count值发生变化，则会执行。
```

## useRef

useEffect 本身是有一些限制的，比如我不需要每次监听一个变量的变化去执行 useEffect 里面的函数，但是我又需要在 useEffect 里面用到这个变量，但是由于 useEffect 有 capture value 的特性，如果不去监听变化，useEffect 里面拿到的值就可能是不准确的，所以 useEffect 没有办法满足这种场景。那么 useRef 就登场了。

useRef 顾名思义，就是对某些变量的引用，这个变量可以是一个存储数据的变量，也可以是一个组件，还可以是一个 Dom 元素。useRef 会返回一个对象，这个对象有个属性叫 current。useRef 可以取代 React 里面的 CreateReference，用来获取 dom。

react 不推荐直接使用 HTML5 的 API（如 querySelector，getElementById 等）来直接操作 Dom，这样的做法是不契合 React 的官方思想，直接操作 Dom 会对整个程序有入侵式的破坏，虽然这样做确实能简单粗暴的解决问题。

useRef 的一个作用就是解决在组件中引用 Dom 元素的问题，第二个作用就是解决 useEffect 存在的一些坑，由于 useEffect capture value 的特性，导致一些场景没有办法 cover 的情况。

```js
useEffect(() => {
	countRef.current = count;
}, [count]);

useEffect(() => {
	const Timer = setInterval(() => {
		console.log(count, countRef.current);
		setCount(countRef.current + 1);
	}, 3000);

	return () => {
		clearInterval(Timer);
	};
}, []);
```

## memo, useMemo 和 useCallback

useCallback, useMemo 主要是用来针对函数组件做优化。
由于 React 的 diff 策略，是进行逐层比较，如果父组件发生了变化，会直接替换父组件和父组件以下所有的子组件的节点，那么则就会造成一定的 dirty diff。所以 React 提供一个生命周期函数 `shouldComponentUpdate` 来解决组件冗余渲染的问题。

在 React 之前的版本中，React 给类组件提供了一个`PureComponent`类，用于组件的性能优化。`PureComponent`原理就是自动加载了 shouldComponentUpdate 函数，当组件更新时，shouldComponentUpdated 对 props 和 state 进行了一层 shallow compare 浅比较，返回 true 则不会触发 render 函数，省去 Virtual Dom 生成和对比的过程，从而提升性能。

### React.memo

当父组件引入一个子组件，且子组件上没有绑定父组件的 props，如果父组件的状态更新，子组件也会更新。这个时候可以引入 React.memo 来解决子组件冗余更新的问题。

memo 是一个高阶组件，用于包裹一个**函数组件**，实现类似于 `shouldComponentUpdate` 和 `pureComponent` 类似的功能。
React.memo 的第一个参数传入一个函数组件，完成类似 class 组件 pureComponent 的功能，第二个参数可选，传入一个回调函数，这个回调函数的功能类似于 shouldComponentUpdate，用于更加精细化的控制 props 的比较。React.memo 如果传入第二个参数，则 props 浅比较的功能就失效了。

![了解什么是浅比较 shallowEqual？](https://imweb.io/topic/598973c2c72aa8db35d2e291)

### useMemo 与 useCallback

React.memo 的作用类似于 pureComponent 的作用，只能对 props 进行浅比较。如果子组件的 props 是一个原始数据类型，shallow compare 可以解决比较的问题，如果 props 的某个属性本身是一个复杂数据类型，比如数组，对象，函数这三种类型，靠 React.memo 无法满足这些场景。

useMemo 和 useCallback 的用法和 useEffect 基本是一致的。
useMemo 是作用于 props 属性的，props 的某个属性发生变化时，才返回一个新的对象，否则会把这个对象缓存起来。

## 自定义 hooks

## useReducer, useContext

## useSelector 和 useDispatch 代替 connect

## 引用

[Render Props](https://zh-hans.reactjs.org/docs/render-props.html)
