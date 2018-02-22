/************************ cookie使用实例******************************/
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from '../component/App.vue'
import Login from '../component/Login.vue'
import UserInfo from '../component/UserInfo.vue'
//状态管理
Vue.use(Vuex)
    //路由
Vue.use(VueRouter)

//路由配置
//如果需要加菜单，就在这里添加路由，并在UserMenu.vue添加入口router-link
const router = new VueRouter({
    routes: [{
        path: '/login',
        component: Login
    }, {
        path: '/user_info',
        component: UserInfo
    }]
})

//Vuex配置
const store = new Vuex.Store({
    state: {
        domain: 'http://test.example.com', //保存后台请求的地址，修改时方便（比方说从测试服改成正式服域名）
        userInfo: { //保存用户信息
            nick: null,
            ulevel: null,
            uid: null,
            portrait: null
        }
    },
    mutations: {
        //更新用户信息
        updateUserInfo(state, newUserInfo) {
            state.userInfo = newUserInfo;
        }
    }
})

//设置cookie,增加到vue实例方便全局调用
Vue.prototype.setCookie = (c_name, value, expiredays) => {
    var exdate = new Date();　　　　
    exdate.setDate(exdate.getDate() + expiredays);　　　　
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookie
Vue.prototype.getCookie = (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

//删除cookie
Vue.prototype.delCookie = (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//vue实例
var app = new Vue({
    data: {},
    el: '#app',
    render: h => h(App),
    router,
    store,
    watch: {
        "$route": 'checkLogin'
    },
    created() {
        this.checkLogin();

    },
    methods: {
        checkLogin() {

            //检查是否存在session
            if (!this.getCookie('session')) {
                this.$router.push('/login');
            } else {
                this.$router.push('/user_info');
            }
        }
    }
});

/*************************mintui上拉分页刷新下拉加载数据***************************/
/* <template> 
 <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}"> 
 <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"> 
 <ul class="list" v-for="(val, key) in pageList"> 
 <li> 
 <div>我是小11</div> 
 <div>我是小11</div> 
 </li> 
 </ul> 
 </v-loadmore> 
 </div> 
</template> */

import {
    Loadmore
} from 'mint-ui';
export default {
    data: function() {
        return {
            searchCondition: { //分页属性 
                pageNo: "1",
                pageSize: "10"
            },
            pageList: [],
            allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了 
            scrollMode: "auto" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动 
        }
    },
    components: {
        'v-loadmore': Loadmore // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题 
            // 推荐应用组件时用a-b形式起名 
    },
    mounted() {
        this.loadPageList(); //初次访问查询列表 
    },
    methods: {
        loadTop: function() { //组件提供的下拉触发方法 
            //下拉加载 
            this.loadPageList();
            this.$refs.loadmore.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位 
        },
        loadBottom: function() {
            // 上拉加载 
            this.more(); // 上拉触发的分页查询 
            this.$refs.loadmore.onBottomLoaded(); // 固定方法，查询完要调用一次，用于重新定位 
        },
        loadPageList: function() {
            // 查询数据 
            this.api.PageList(this.searchCondition).then(data => {
                // 是否还有下一页，加个方法判断，没有下一页要禁止上拉 
                this.isHaveMore(data.result.haveMore);
                this.pageList = data.result.pageList;
                this.$nextTick(function() {
                    // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写， 
                    // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果， 
                    // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好 
                    this.scrollMode = "touch";
                });
            });
        },
        more: function() {
            // 分页查询 
            this.searchCondition.pageNo = parseInt(this.searchCondition.pageNo) + 1;
            this.api.loadPageList(this.searchCondition).then(data => {
                this.pageList = this.pageList.concat(data.result.pageList);
                this.isHaveMore(data.result.haveMore);
            });
        },
        isHaveMore: function(isHaveMore) {
            // 是否还有下一页，如果没有就禁止上拉刷新 
            this.allLoaded = true; //true是禁止上拉加载 
            if (isHaveMore) {
                this.allLoaded = false;
            }
        }
    }
}


// 项目中共用一个组件问题 eg：有一个菜单中的两个按钮，点击每个按钮调用的是同一个组件，其内容是根据路由的参数的不同来请求不同的内容
export default {
    name: 'conDetail',
    data() {
        return {
            msg: '',
            differIdType: '',
            conlist: [{
                    'con': '这是第一个内容按钮的内容1'
                },
                {
                    'con': '这是第一个内容按钮的内容2'
                }
            ],
            items: [],

        }
    },
    mounted() {
        this.differIdType = this.$route.params.differId == 'con1' ? '0' : '1';
        if (this.differIdType == 0) {
            this.items = this.conlist;
        } else {
            this.items = [];
        }
    },
    watch: {
        $route: function(to, from) {
            this.differIdType = to.params.differId == 'con1' ? '0' : '1';
            if (this.differIdType == 0) {
                this.items = this.conlist;
            } else {
                this.items = [];
            }
        }
    }

}


/****************************父组件传递数据给子组件*****************************/
//子组件通过props来接收数据:
props: ['childMsg']
    //方式2 :
props: {
        childMsg: Array //这样可以指定传入的类型，如果类型不对，会警告
    }
    //方式3：
props: {
    childMsg: {
        type: Array,
        default: [0, 0, 0] //这样可以指定默认的值
    }
};

/****************************子组件与父组件通信*********************************/
//<template>
//<div @click="up"></div>
//</template>

//methods: {
// up() {
// this.$emit('fun','这是一段内容'); //主动触发fun方法，'这是一段内容'为向父组件传递的数据
// }
//}
//父组件:
///<div>
//<child @fun="change" :msg="msg"></child> //监听子组件触发的fun事件,然后调用change方法
//</div>
//methods: {
// change(msg) {
// this.msg = msg; 
// }
//}



// 利用vue-router实现滚动到具体位置
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = {
    template: '<div>home</div>'
}
const Foo = {
    template: '<div>foo</div>'
}
const Bar = {
    template: `
 <div>
 bar
 <div style="height:500px"></div>
 <p id="anchor">Anchor</p>
 </div>
 `
}

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        // savedPosition is only available for popstate navigations.
        return savedPosition
    } else {
        const position = {}
            // new navigation.
            // scroll to anchor by returning the selector
        if (to.hash) {
            position.selector = to.hash
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0
            position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position
    }
}

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    scrollBehavior,
    routes: [{
            path: '/',
            component: Home,
            meta: {
                scrollToTop: true
            }
        },
        {
            path: '/foo',
            component: Foo
        },
        {
            path: '/bar',
            component: Bar,
            meta: {
                scrollToTop: true
            }
        }
    ]
})

new Vue({
    router,
    template: `
 <div id="app">
 <h1>Scroll Behavior</h1>
 <ul>
 <li><router-link to="/">/</router-link></li>
 <li><router-link to="/foo">/foo</router-link></li>
 <li><router-link to="/bar">/bar</router-link></li>
 <li><router-link to="/bar#anchor">/bar#anchor</router-link></li>
 </ul>
 <router-view class="view"></router-view>
 </div>
 `
}).$mount('#app')



/****************************记录返回页面时回到之前浏览的位置****************************/
beforeRouteEnter(to, from, next) {
        if (!sessionStorage.askPositon || from.path == '/') { //当前页面刷新不需要切换位置
            sessionStorage.askPositon = '';
            next();
        } else {
            next(vm => {
                if (vm && vm.$refs.scrollerBottom) { //通过vm实例访问this
                    setTimeout(function() {
                            vm.$refs.scrollerBottom.scrollTo(0, sessionStorage.askPositon, false);
                        }, 0) //同步转异步操作
                }
            })
        }
    },
    beforeRouteLeave(to, from, next) { //记录离开时的位置
        sessionStorage.askPositon = this.$refs.scrollerBottom && this.$refs.scrollerBottom.getPosition() && this.$refs.scrollerBottom.getPosition().top;
        next()
    }

/****************路由拦截页面需要登录才能访问时添加 requireAuth********************/
// {
//     path: '/repository',
//     name: 'repository',
//     meta: {
//         requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
//     },
//     component: Repository
// },
//使用钩子函数beforeEach()对路由进行判断
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (store.state.token) { // 通过vuex state获取当前的token是否存在
            next();
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
});

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit(types.LOGIN, window.localStorage.getItem('token'))
}


/****************路由变化页面数据不刷新问题******************/
watch: {
    '$route' (to, from) { //监听路由是否变化
        if (this.$route.params.articleId) { //是否有文章id
            //获取文章数据
        }
    }
}