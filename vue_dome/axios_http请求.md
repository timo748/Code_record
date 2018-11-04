### 拦截器

```
// http请求拦截器
axios.interceptors.request.use((config) => {
    let tokens = null;
    // 获取存储在cookie中的值，如果存在则在每个ajax请求的头部加上
    document.cookie.split(';').forEach((e, i) => {
        if(e.split('=')[0].trim() === 'token') tokens = e.split('=')[1];
    });
    if(tokens && typeof tokens === 'string') config.headers.Authorization = tokens;
    return config;
}, (err) => {
    return Promise.reject(err);
});

// http响应拦截器
axios.interceptors.response.use((config) => {
    return config;
}, (err) => {
    if(err.response) {
        // 根据返回的错误状态码，跳转到对应的缺省页面
        let handle = { 404: 'http://www.aylan.me/404', 501: 'http://www.aylan.me/error' };
        if(!handle[err.response.status]===undefined) router.push(handle[err.response.status]);
    }
    // 返回对应的错误信息，可以在axios中的catch中继续处理
    return Promise.reject(err.response.data);
});
```

### GET请求

```
/*
** get(url,data).then((res) => { console.log(res) });
** 
** @params url——请求地址（必填），data——请求参数（非必填）
** @params res——服务器返回结果
*/
function get(url, data) {
    if(!url || typeof url !== 'string') throw new Error('必须传入字符串类型的url地址');
    let formData = {
        url: url,
        method: 'GET',
        // 设置请求头为application/x-www-form-urlencoded
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        // 将序列化参数转换为字符串，使用这种方法需要先引入qs，也可以直接用JSON.stringify()进行转换
        paramsSerializer: function(params) {
                return Qs.stringify( params, { arrayFormat: 'brackets' } );
        },
        // 设置跨域请求为true，如果是cros同源请求的话，则可以不用加此项
        withCredentials: true
    };
    // 判断data的类型是否为Object
    if(typeof data !== 'object') throw new Error('data为对象类型');
    // 判断参数是否存在，存在则传入方法中
    if(data && typeof data === 'object') formData.params = data;
    // 使用Promise方法异步处理请求
    return new Promise(function(resolve, reject) {
        axios(formData).then(function(res) {
            // 后端返回的数据挂载在res.data内
            resolve(res.data);
        }).catch(function(err) {
            // 报错处理
            message('服务器异常，请稍后再试');
        })
    });
}
```

### POST请求

```
/*
** post(url,data).then((res) => { console.log(res) });
** 
** @params url——请求地址（必填），data——请求参数（非必填）
** @params res——服务器返回结果
*/
function post(url, data) {
    if(!url || typeof url !== 'string') throw new Error('必须传入字符串类型的url地址');
    let formData = {
        url: url,
        method: 'POST',
        // 设置请求头为application/json
        headers: {
            "Content-Type": "application/json"
        },
        // 设置跨域请求为true，如果是cros同源请求的话，则可以不用加此项
        withCredentials: true
    };
    // 判断data的类型是否为Object
    if(typeof data !== 'object') throw new Error('data为对象类型');
    // 判断参数是否存在，存在则传入方法中
    if(data && typeof data === 'object') formData.data= data;
    // 使用Promise方法异步处理请求
    return new Promise(function(resolve, reject) {
        axios(formData).then(function(res) {
            // 后端返回的数据挂载在res.data内
            resolve(res.data);
        }).catch(function(err) {
            // 报错处理
            message('服务器异常，请稍后再试');
        })
    });
}
```

### JSONP请求

```
/*
** jsonp(url).then((res) => { console.log(res) });
** 
** @params url——请求地址（必填）
** @params res——服务器返回结果
*/
function jsonp(url) {
    // 判断url是否存在以及是否为字符串
    if(!url || typeof url !== 'string') throw new Error('必须传入字符串类型的url地址');
    return new Promise((resolve,reject) => {
        // 处理返回的结果
        window.jsonCallBack = (result) => {
            resolve(result)
        }
        // 在页面创建script标签，并将src设置为请求地址，取回数据之后移除script标签
        let JSONP = document.createElement("script");
        JSONP.type = "text/javascript";
        JSONP.src = `${url}&callback=jsonCallBack`;
        document.getElementsByTagName("head")[0].appendChild(JSONP);
        setTimeout(() => {
            document.getElementsByTagName("head")[0].removeChild(JSONP)
        },500)
    })
}
```

### 上传文件

```
/*
** upload(url,data).then((res) => { console.log(res) });
** 
** @params url——请求地址（必填）,data——请求参数，FormData对象（必填）
** @params res——服务器返回结果
*/
function upload(url, data) {
    // 对url以及data进行类型检测
    if(!url || typeof url !== 'string') throw new Error('必须传入字符串类型的url地址');
    if(!data || typeof data !== 'function') throw new Error('内容不能为空');
    let formData = {
        url: url,
        method: 'POST',
            // 设置请求头为multipart/form-data
        headers: {  
              'Content-Type': 'multipart/form-data'
        },
        data: data,
            // 设置跨域请求为true
        withCredentials: true
    };
    return new Promise(function(resolve, reject) {
        axios(formData).then(function(res) {
            // 后端返回的数据挂载在res.data内
            resolve(res.data)
        }).catch(function(err) {
            // 报错处理
            message('服务器异常，请稍后再试');
        })
    });
}
```

axios

```
import axios from 'axios';
import qs from 'qs';
import store from '../store';

// 全局默认配置
// 设置 POST 请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 配置 CORS 跨域
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

// 请求发起前拦截器
axios.interceptors.request.use((config) => {
  // 全局 loading 状态，触发 loading 效果
  store.dispatch('updateLoadingStatus', {
    isLoading: true
  });
  
  // POST 请求参数处理成 axios post 方法所需的格式
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  
  // 这句不能省，不然后面的请求就无法成功发起，因为读不到配置参数
  return config;
}, () => {
  // 异常处理
  store.dispatch('updateLoadingStatus', {
    isLoading: false
  });
});

// 响应拦截
axios.interceptors.response.use((response) => {
  // 关闭 loading 效果
  store.dispatch('updateLoadingStatus', {
    isLoading: false
  });

  // 全局登录过滤，如果没有登录，直接跳转到登录 URL
  if (response.data.code === 300) {
    // 未登录
    window.location.href = getLoginUrl();
    return false;
  }

  // 这里返回的 response.data 是被 axios 包装过的一成，所以在这里抽取出来
  return response.data;
}, (error) => {
  store.dispatch('updateLoadingStatus', {
    isLoading: false
  });
  return Promise.reject(error);
});

// 导出
export default axios;


使用：
import axios from './common';

const baseURL = '/api/profile';
const USER_BASE_INFO = `${baseURL}/getUserBaseInfo.json`;
const UPDATE_USER_INFO = `${baseURL}/saveUserInfo.json`;

// 更新用户实名认证信息
const updateUserInfo = userinfo => axios.post(UPDATE_USER_INFO, userinfo);

// 获取用户基础信息
const getUserBaseInfo = () => axios.get(USER_BASE_INFO);
```

