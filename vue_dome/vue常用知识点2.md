### vue生命周期

```
  beforeCreate（创建前），在数据观测和初始化事件还未开始

created（创建后），完成数据观测，属性和方法的运算，初始化事件， $el 属性还没有显示出来

beforeMount（载入前），在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下的配置：编译模板，把data里面的数据和模板生成html。注意此时还没有挂载html到页面上。

mounted（载入后），在el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html页面中。此过程中进行ajax交互。

beforeUpdate（更新前），在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。

updated（更新后），在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。

beforeDestroy（销毁前），在实例销毁之前调用。实例仍然完全可用。

destroyed（销毁后），在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用。
    
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

### 判断上次浏览滚动位置

```
  scrollBehavior(to,from,savePosition){//滚动行为
    //console.log(to) //进入的目标对象
    //console.log(from) //离开的路由对象
    //console.log(savePosition)//记录滚动路由坐标
    if(savePosition){
      return savePosition //针对鼠标点击浏览器前进后台，如果记录到坐标存在就返回出来之前坐标，
    }else{
      return{x:0,y:0} //否则都返回默认的（0,0）
    }
    //值得注意的是在谷歌浏览器上我发现即使不设置，好像也一样
  },
```












