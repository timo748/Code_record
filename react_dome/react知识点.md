### 生命周期

```
will表示进入状态之前调用，did表示进入状态之后调用）

componentWillMount()//组件将要渲染到真实dom节点；
componentDidMount()//组件已经渲染到真实dom节点；
componentWillUpdate()//state值发生变化，组件将要被重新渲染；
componentDidUpdate()//组件已经完成重新渲染；
componentWillUnmout()//卸载组件，比如跳转路由的时候
componentWillReceiveProps() //已经加载组件props发生改变的时候调用；
shouldComponentUpdate()//组件判断是否要重新渲染的时候调用；

生命周期操作方法：
1、componentWillMount
setState 在 componentWillMount 使用：可以使用

2、componentDidMount
ajax 请求
初始化DOM节点的操作
设置计时器 setTimeout 或者 setInterval (温馨提示，别忘了在 componentWillUnmount 关闭这些计时器)
setState 在 componentDidMount 使用： 可以使用

3、componentWillReceiveProps(nextProps)
更新 state 的值(比如重置)
比较 this.props 和 nextProps

4、componentWillUpdate(nextProps, nextState)
state 或者 props 更新后 re-render 之前调用。

5、componentDidUpdate(prevProps, prevState)
操作 DOM
发起网络请求

6、componentWillUnmount
清除计时器
断开网络请求
解绑dom事件



生命周期	              	是否可以调用this.setState	      初始化是否执行
componentWillMount	        可以						   是
componentDidMount	     	可以						   是
componentWillReceiveProps	可以						    否
shouldComponentUpdate		不可以	 					   否
componentWillUpdate			不可以						   否
componentDidUpdate			可以	 					    否
componentWillUnmount		不可以					        否

注：①componentWillMount 和 componentWillReceiveProps 调用 setState 不会重复渲染(re-render)
②componentDidUpdate，不能直接 this.setState, 不然会溢出栈。需要对 prevProps 与 this.props 和 prevState 和 this.state 做一个判断再执行 this.setState。
```

### 查找dom节点操作（ref）

```
render(){
    return (
        <div ref = "demo">this is a test</div>
    )
}
在需要的获取这个div标签的时候就可以通过this.refs.demo来进行一系列的操作了，就和原生javascript中通过document.getElementById获取到的是一样的道理；
```

### 继承React.Component的类的方法时遵循下面的顺序

```
constructor
optional static methods
getChildContext
componentWillMount
componentDidMount
componentWillReceiveProps
shouldComponentUpdate
componentWillUpdate
componentDidUpdate
componentWillUnmount
点击回调或者事件回调，比如onClickSubmit()或者onChangeDescription()
render函数中的getter()方法，，比如getSelectReason()或者getFooterContent()
可选的render方法
render
```



### 使用方法

```
    class MyComponent extends React.Component {
        constructor () {
            super();
            this.state = {name: "yejiawei"};
        }
        alertInfo = () => {
            alert(this.state.name)
        }
        render() {
            return (
                <p onClick={this.alertInfo}>{this.state.name}</p>
            )
        }
    }
```

### state修改方法

```
class MyComponent extends React.Component {
    constructor () {
        super();
        this.state = {name: "yejiawei"}
    }
    componentDidMount() {
        this.setState({
            name: "haha" // 修改值
        })
        this.setState({
            name: this.state.name + "haha" // 异步刷新，无法展示最新值
        })
        this.setState((prevState,props) => ({
            name: prevState.name + "haha" // 等待异步刷新完成，展示最新值
        }))
    }
    render() {
        return (
            <p>{this.state.name}</p>
        )
    }
}
react中state的属性，不要直接修改，而要使用替换的方式
```

### 列表循环

```
  class MyComponent extends React.Component {
        render() {
            let arr = [1,2,3,4,5];
            const componentArr = arr.map((item,index) => {
                return <li key={index}>{item}</li>
            })
            return (
                <ul>
                    {componentArr}
                </ul>
            )
        }
    }
    必须指定key
```

### 组合嵌套

```
这部分内容和vue的slot很像
组件嵌套的元素使用 props.children 表示
    function MyComponent1 (props) {
        return (
            <div>{props.children}</div>
        )
    }
    function MyComponent (props) {
        return (
            <MyComponent1>
                <h1>我是嵌套的元素</h1>
            </MyComponent1>
        )
    }
子嵌套
    function MyComponent1 (props) {
        return (
            <div>
                <div>{props.left}</div>
                <div>{props.right}</div>
            </div>
        )
    }
    function MyComponent (props) {
        return (
            <MyComponent1 left={<h1>我是左边嵌套的元素</h1>} right={<h1>我是右边嵌套的元素</h1>}/>
        )
    }
```

### 提交表单

```
    class MyComponent extends React.Component {
        constructor () {
            super();
            this.state = {
                name: '',
                age: ''
            }
        }
        setValue = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        sendData = (e) => {
            e.preventDefault();
            alert('提交的数据：' + this.state.value)
        }
        render() {
            return (
            <form onSubmit={this.sendData}>
                <label>Name: <input name="name" type="text" value={this.state.name} onChange={this.setValue} /></label>
                <label>Age: <input name="age" type="text" value={this.state.age} onChange={this.setValue} /></label>
                <input type="submit" value="提交" /><br />
                {this.state.name + ':' + this.state.age}
            </form>
            )
        }
    }
    如果你觉得这个写法很麻烦，可以使用ref获取表单元素，然后再获取数据
```

### 类型检查

```
安装 cnpm install --save prop-types
react系统自带的类型验证功能，没有typescript强大，可以当做编译过程中的一个补充检查
    import PropTypes from 'prop-types';
    function MyComponent (props){
        return (
            <div>
                <div>{props.name}</div>
            </div>
        )
    }
    MyComponent.propTypes = { // 大小写看清楚
        name: PropTypes.number
    }
完整的类型
    MyComponent.propTypes = {
        // 你可以将属性声明为以下 JS 原生类型
        optionalArray: PropTypes.array,
        optionalBool: PropTypes.bool,
        optionalFunc: PropTypes.func,
        optionalNumber: PropTypes.number,
        optionalObject: PropTypes.object,
        optionalString: PropTypes.string,
        optionalSymbol: PropTypes.symbol,
        // 任何可被渲染的元素（包括数字、字符串、子元素或数组）。
        optionalNode: PropTypes.node,
        // 一个 React 元素
        optionalElement: PropTypes.element,
        // 你也可以声明属性为某个类的实例，这里使用 JS 的
        // instanceof 操作符实现。
        optionalMessage: PropTypes.instanceOf(Message),
        // 你也可以限制你的属性值是某个特定值之一
        optionalEnum: PropTypes.oneOf(['News', 'Photos']),
        // 限制它为列举类型之一的对象
        optionalUnion: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.instanceOf(Message)
        ]),
        // 一个指定元素类型的数组
        optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
        // 一个指定类型的对象
        optionalObjectOf: PropTypes.objectOf(PropTypes.number),
        // 一个指定属性及其类型的对象
        optionalObjectWithShape: PropTypes.shape({
            color: PropTypes.string,
            fontSize: PropTypes.number
        }),
        // 你也可以在任何 PropTypes 属性后面加上 `isRequired` 
        // 后缀，这样如果这个属性父组件没有提供时，会打印警告信息
        requiredFunc: PropTypes.func.isRequired,
        // 任意类型的数据
        requiredAny: PropTypes.any.isRequired,
        // 你也可以指定一个自定义验证器。它应该在验证失败时返回
        // 一个 Error 对象而不是 `console.warn` 或抛出异常。
        // 不过在 `oneOfType` 中它不起作用。
        customProp: function(props, propName, componentName) {
            if (!/matchme/.test(props[propName])) {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
            }
        },
        // 不过你可以提供一个自定义的 `arrayOf` 或 `objectOf` 
        // 验证器，它应该在验证失败时返回一个 Error 对象。 它被用
        // 于验证数组或对象的每个值。验证器前两个参数的第一个是数组
        // 或对象本身，第二个是它们对应的键。
        customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
            if (!/matchme/.test(propValue[key])) {
            return new Error(
                'Invalid prop `' + propFullName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
            }
        })
    };
    MyComponent.defaultProps = {
        // 当属性没有指定的时候，自动添加此默认值，然后再进行验证
        name: 'yejiawei'
    }
```

### 路由基本用法

```
/首先是引入
import { Route,Router,browserHistory } from 'react-router'
render(){
    return(
        //这里使用了browserHistory优化了路径，路径上就不会有＃了
        <Router history={browserHistory}>
            <Route path="/" compontent={ AppContainer }>
                //指定默认情况下加载的子组件
                <IndexRoute component={ HomeContainer }/>
                <Route path="home" component={ HomeContainer } />
                <Route path="about" component={ AboutContainer } />
                <Route path="list" component={ ListContainer }>
                    <Route path="detail" component={ DetailContainer }/>
                </Route>
            </Route>
        </Router>
    )
}

路由懒加载：
import { Route,Router,browserHistory } from 'react-router'
render(){
    return(
        //这里使用了browserHistory优化了路径，路径上就不会有＃了
        <Router history={browserHistory}>
            <Route path="/" compontent={ AppContainer }>
                //指定默认情况下加载的子组件
                <IndexRoute component={ HomeContainer }/>
                <Route path="home" getComponent={ 
                    (nextState,callback) => {
                        require.ensure([],(require) => {
                            callback(null,require('组件路径地址').default)
                        },"自定义一个名字")
                    }
                }
                 />
                <Route path="list" component={ ListContainer }>
                    <Route path="detail" component={ DetailContainer }/>
                </Route>
            </Route>
        </Router>
    )
}
```









































