### vue权限判断（路由拦截）

```
 // 需要登录才能进入的页面可以增加一个meta属性
       meta: { 
         requireAuth: true
       },

//  判断是否需要登录权限 以及是否登录
 router.beforeEach((to, from, next) => {
   if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    if (localStorage.getItem('username')) {// 判断是否登录
       next()
     } else {// 没登录则跳转到登录界面
       next({
         path: '/Register',
         query: {redirect: to.fullPath}       })
     }
   } else {
     next()
   }
 })
```


### 动态添加数据

- 1 `Vue.set(object, key, value)` - 适用于添加单个属性
- 2 `Object.assign()` - 适用于添加多个属性

eg：

```
var vm = new Vue({
  data: {
    stu: {
      name: 'jack',
      age: 19
    }
  }
})

/* Vue.set */
Vue.set(vm.stu, 'gender', 'male')

/* Object.assign 将参数中的所有对象属性和值 合并到第一个参数 并返回合并后的对象*/
vm.stu = Object.assign({}, vm.stu, { gender: 'female', height: 180 })
```

### vue生命周期

```
1. 根组件实例：8个 (beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed)
2. 组件实例：8个 (beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed)
3. 全局路由钩子：2个 (beforeEach、afterEach)
4. 组件路由钩子：3个 (beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave)
5. 指令的周期： 5个 (bind、inserted、update、componentUpdated、unbind)
6. beforeRouteEnter的next所对应的周期
7. nextTick所对应的周期


四个阶段：
    create 准备工作 （数据的初始化...）
    mount  挂载前后针对元素进行操作
    update 数据发生变化，
    destroy 清理工作 (关闭定时器、集合清空..) 

    beforeCreate/created
    beforeMount/mounted
    beforeUpdate/updated
    beforeDestroy/destroyed
```

### 常用属性

```
1、watch
   1. 表单元素的双向数据绑定
   v-model="myValue"
   2.监听
    watch:{
    myValue:function(newValue,oldValue){
    
    }
    }
   
2、computed
    计算属于是用于在模板中，搞定复杂的业务逻辑，因为有依赖缓存。
    1.指定计算属性
        computed:{
          myHandle:function(){
            return 数据
          }
        } 
    2.调用
        <any>{{myHandle}}</any>
```

### 组件通信

```
1、父与子通信 （props down）
    1.发送
        <son myName='zhangsan'>
        </son>
    2.接受
        到son组件：
        Vue.component('son',{
          props:['myName'],
          template:`
           <p>{{myName}}</p>
          `
        }) 
                   
         
2、子与父通信 (events up)
     1.绑定
    methods:{
      handleEvent:function(msg){}
    }
    <son @customEvent="handleEvent"></son>
    2.触发
    子组件内部：
    this.$emit(‘customEvent’,100);
    
3、ref(reference 引用/参考 外号)
 帮助在父组件中 得到子组件中的数据、方法。
    1.指定ref属性
    <son ref="mySon"></son>
    2.根据ref得到子组件实例
    this.$refs.mySon
    
4、$parent
    this.$parent得到父组件的实例
    
5、兄弟组件通信
    1.var bus = new Vue();
    2.接收方
    bus.$on('eventName',function(msg){})
    3.发送方
    bus.$emit('eventName',123);
```






















