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



###vue生命周期

1. 根组件实例：8个 (beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed)
2. 组件实例：8个 (beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed)
3. 全局路由钩子：2个 (beforeEach、afterEach)
4. 组件路由钩子：3个 (beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave)
5. 指令的周期： 5个 (bind、inserted、update、componentUpdated、unbind)
6. beforeRouteEnter的next所对应的周期
7. nextTick所对应的周期























