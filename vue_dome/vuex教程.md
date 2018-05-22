### 第一步

```
新建一个.js 文件,名字位置任意,按照惯例,建议在/src/store 目录下

文件位置 /src/store/index.js

// 引入vue 和 vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 这里需要use一下,固定写法,记住即可
Vue.use(Vuex)

// 直接导出 一个 Store 的实例
export default new Vuex.Store({
  // 类似 vue 的 data
  state: {
    name: 'oldName'
  },
   // 类似 vue 的 computed -----------------以下5行为新增
  getters:{
    getReverseName: state => {
        return state.name.split('').reverse().join('')
    }
  },
  // 类似 vue 里的 mothods(同步方法)
  mutations: {
    updateName (state) {
      state.name = 'newName'
    }
  }
})
```

### 第二步

```
在入口文件引入上述文件, 并稍微改一下传给 new Vue()的参数,新增的行后面有备注

文件位置 /src/main.js (vue-cli自动生成的入口,如果你能不用脚手架,那么也就不需要我说明了)

import Vue from 'vue'
import App from './App'
import vuexStore from './store'   // 新增

new Vue({
  el: '#app',
  store:vuexStore                 // 新增
  components: { App },
  template: '<App/>'
})
```

### 第三步

```
以上2步,其实已经完成了vuex的基本配置,接下来就是使用了

文件位置 /src/main.js (同样是vue-cli生成的app.vue,这里为了方便演示,我去掉多余的代码)

<template>
  <div>
    {{getName}}
    <button @click="changeName" value="更名">更名</button>
  </div>
</template>

<script>
export default {
  computed:{
    getName(){
      return this.$store.state.name
    }
  },
  methods:{
    changeName () {
      this.$store.commit('updateName')
    }
  }
}
</script>
这里就是一个很普通的vue文件了,有区别的地方是这里我们需要用computed属性去获取 store 里的 "data"

还有就是我们要改变数据的话,不再用 this.xxx = xxx 改成 this.$store.commit('updateName')
```

### 第四步

```
多份数据使用Getter
然后我们可以这样用 文件位置 /src/main.js
 // 类似 vue 的 computed -----------------以下5行为新增
  getters:{
    getReverseName: state => {
        return state.name.split('').reverse().join('')
    }
  },
  
computed:{
    getName(){
      return this.$store.getters.getReverseName
    }
}
 getter 不止单单起到封装的作用,它还跟vue的computed属性一样,会缓存结果数据, 只有当依赖改变的时候,才要重新计算.
 
 
```

### 第五步

```
 action + $dispatch触发异步操作
 
  // 类似 vue 里的 mothods(同步方法)
  mutations: {
    updateName (state) {
      state.name = 'newName'
    }
  },
  
   // 类似 vue 里的 mothods(异步方法) -------- 以下7行为新增
  actions: {
    updateNameAsync ({ commit }) {
      setTimeout(() => {
        commit('updateName')
      }, 1000)
    }
  }
})

然后我们可以再我们的vue页面里面这样使用

methods: {
    rename () {
        this.$store.dispatch('updateNameAsync')
    }
}


```

### 第六步

```
当项目越来越大的时候,单个 store 文件,肯定不是我们想要的, 所以就有了模块化. 假设 src/store 目录下有这2个文件

moduleA.js

export default {
    state: { ... },
    getters: { ... },
    mutations: { ... },
    actions: { ... }
}
moduleB.js

export default {
    state: { ... },
    getters: { ... },
    mutations: { ... },
    actions: { ... }
}
那么我们可以把 index.js 改成这样

import moduleA from './moduleA'
import moduleB from './moduleB'

export default new Vuex.Store({
    modules: {
        moduleA,
        moduleB
    }
})
这样我们就可以很轻松的把一个store拆分成多个
```

### 总结

```
actions 的参数是 store 对象,而 getters 和 mutations 的参数是 state .
actions 和 mutations 还可以传第二个参数,具体看vuex官方文档
getters/mutations/actions 都有对应的map,如: mapGetters , 具体看vuex官方文档
模块内部如果怕有命名冲突的话,可以使用命名空间, 具体看vuex官方文档
vuex 其实跟 vue 非常像,有data(state),methods(mutations,actions),computed(getters),还能模块化.
```

