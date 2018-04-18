### vue生命周期

```
  beforeCreate: 触发在加载完Vue中生命周期函数之后
    created:      触发在加载完(props->data->computed->watch->methods)之后
    beforeMount:  触发在Vue已经将实例挂载在el之后，渲染之前
    mounted:      数据渲染完成
    beforeDestroy:实例销毁前，删除实例所作用的dom解构，等同于销毁实例
    destroyed:    实例销毁完成
    beforeUpdate: 数据更新前，如果有数据改变，会触发，注意：此时数据已经被更改了，只是dom上未刷新
    updated:      dom刷新完成
    
beforeCreate: 组件实例刚刚被创建,组件属性计算之前,如data属性
created: 组件实例创建完成,属性已绑定,但是DOM还未完成,$el属性还不存在
beforeMount:模板编译/挂载之前
mounted: 模板编译/挂载之后
beforeUpdate: 组件更新之前
updated: 组件更新之后
activated: for keep-alive,组件被激活时调用
deactivated: for keep-alive,组件被移除时调用
beforeDestroy: 组件销毁前被调用
destoryed: 组件销毁后调用

作者：funnycoderstar
链接：https://juejin.im/post/5ad56d86518825556534ff4b
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
	
	this.$forceUpdate() //强制刷新dom
	this.$destroy()     //销毁实例

    activated:    组件激活，指的是从组件从缓存中被显示出来，配合keep-alive使用
    deactivated:  组件注销，指的是从组件从dom中被删除，缓存到缓存中去，配合keep-alive使用
    errorCaptured：组件出错，会在其父组件中被监听，如果不做处理会一直传递到Vue对象中
    
    
    
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

```
-1 Vue.set(object, key, value) - 适用于添加单个属性
-2 Object.assign() - 适用于添加多个属性
eg：
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

### vue按需加载

```
webpack中提供了require.ensure()来实现按需加载。以前引入路由是通过import 这样的方式引入，改为const定义的方式进行引入。
不进行页面按需加载引入方式：import  home   from '../../common/home.vue'
进行页面按需加载的引入方式：const  home = r => require.ensure( [], () => r (require('../../common/home.vue')))
```

### vue操作DOM

```
ref获取dom元素
    在vue中，想要获取ref元素，可以直接给dom元素添加ref属性ref="_v"也可以以表达式的情况赋值:ref="name"
    然后在vue实例中通过this.$refs._v获取，也可以通过this.$refs获取所有被设置了ref的dom元素
    如果ref被设置在组件名上<name ref="zj"></name>,this.$refs.zj将直接获取到该组件的实例对象，可以直接操作该组件的一切
```
















