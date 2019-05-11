### state

```
存放变量，将原来data存放数据转移到state，可使用mapState辅助函数生成计算属性
computed：mapstate({
 count:state=>state.count,
countAliass:'count',
})
```

 ### getters

```
存放一些公共函数供组件调用，getters会暴露store.getters对象，可以通过store.getters[属性]进行相应的调用，Mapgetters仅仅是将getters映射到局部计算属性，从getters中获取对应的属性，跟解构类似。
```

### Mutations

```
更改vuex中的状态的唯一方法就是提交Mutations，Mutations存放一般就是我们要改变state的一些方法。
const store = new Vuex.store({	
	state:{
	count:1
},

mutations:{
	increment(state){
	state.count++
		}
	}
})
```

### actions

```
管理触发条件
类似于mutation，action提交的是mutation，	不是直接变更状态，可包含任意异步操作
action:{
	increment(context){
	context.commit("increment")
	}
}
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
通过store.dispatch("increment")触发方法；

```





