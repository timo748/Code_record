下载安装插件依赖

```
npm install vue-wechat-title --save
```

在main.js中引入插件

```
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

```

在路由文件 index.js中给每个路由添加title

```
 routes: [{
  path: '/',
  name: 'index',
  component: index,
  meta:{
    title:'首页' // 标题设置在这里
  }
 },{
  path:'/detail',
  name:'detail',
  component:detail,
  meta:{
    title:'详情页' // 标题设置在这里
  }
 }]

```

在app.vue中修改router-view组件

```
<router-view v-wechat-title='$route.meta.title'></router-view>
```