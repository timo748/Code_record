### 判断设备来源

```javascript
function deviceType(){
        var ua = navigator.userAgent;
        var agent = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];    
        for(var i=0; i<len,len = agent.length; i++){
            if(ua.indexOf(agent[i])>0){         
                break;
            }
        }
    }
    deviceType();
    window.addEventListener('resize', function(){
        deviceType();
    })

    //微信的 有些不太一样
    function isWeixin(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=='micromessenger'){
            return true;
        }else{
            return false;
        }
    }
```

### 获取当前时间

```javascript
export default const obtainDate=()=>{
 let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day=date.getDate();
      let hours=date.getHours();
      let minu=date.getMinutes();
      let second=date.getSeconds();
      //判断是否满10
      let arr=[month,day,hours,minu,second];
      arr.forEach(item=>{
        item< 10?"0"+item:item;
      })
      console.log(year+'-'+arr[0]+'-'+arr[1]+' '+arr[2]+':'+arr[3]+':'+arr[4])       
}
```

### 时间转化

```javascript
export const dateReurn1=(date1)=>{
    date1.toLocaleString("en-US", { hour12: false }).replace(/\b\d\b/g, '0$&').replace(new RegExp('/','gm'),'-')
}
```

### 对象遍历

```javascript
export const traverseObj=(obj)=>{
        for(let variable in obj){
        //For…in遍历对象包括所有继承的属性,所以如果
         //只是想使用对象本身的属性需要做一个判断
        if(obj.hasOwnProperty(variable)){
            console.log(variable,obj[variable])
        }
        }
    }
```

### promise

```javascript
export const promiseDemo=()=>{
new Promise((resolve,reject)=>{
    resolve(()=>{
        let a=1;
        return ++a;
    }).then((data)=>{
        console.log(data)//data值为++a的值
    }).catch(()=>{//错误执行这个

    })
})
}

二
export const promiseDemo=()=>{
Promise.resolve([1,2,3]).then((data)=>{//直接初始化一个Promise并执行resolve方法
    console.log(data)//data值为[1,2,3]
})
}
```

### 浅拷贝

```javascript
var nameObj = { name: { school: 'zfpx' } };
var ageObj = { age: 9 };
var obj = {};
Object.assign(obj, nameObj, ageObj);
console.log(obj);
```

### 递归深拷贝

```javascript
let obj = {
    name: 'zfpx',
    home: ['1', 2, { name: 1 }],
    address: { name: '回龙观' }
}
function deepClone(parent, c) {
    let child = c || {}
    for (let key in parent) {
        if (typeof parent[key] === 'object') {
            child[key] = Object.prototype.toString.call(parent[key]) === '[object Array]' ? [] : {}
            deepClone(parent[key], child[key])
        } else {
            child[key] = parent[key]
        }
    }
    return child
}
let cloneObj = deepClone(obj);
console.log(cloneObj);
```

### 节流函数

```javascript
/**
 * 配置节流函数
 * @param  {[Function]}  fn     [要执行的函数]
 * @param  {[Number]}  delay    [延迟执行的毫秒数]
 * @param  {[Number]}  mustRun  [至少多久执行一次]
 * @return {[Function]}         [节流函数]
 */
exports.throttle = (fn, wait, mustRun) => {
    let timeout;
    let startTime = new Date();
    return function() {
        let context = this;
        let args = arguments;
        let curTime = new Date();

        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= mustRun) {
            fn.apply(context, args);
            startTime = curTime;
            // 没达到触发间隔，重新设定定时器
        } else {
            timeout = setTimeout(fn, wait);
        }
    };
};


//new：
function throttle(fn, delay) {
  var prevTime = Date.now();
  return function() {
    var curTime = Date.now();
    if (curTime - prevTime > delay) {
      fn.apply(this, arguments);
      prevTime = curTime;
    }
  };
}
// 使用
var throtteScroll = throttle(function() {
  console.log('throtte');
}, 1000);
window.onscroll = throtteScroll;


//防抖：
function debounce(func, wait) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
// 使用
window.onscroll = debounce(function() {
  console.log('debounce');
}, 1000);
```

### 判断变量是对象还是数组

```javascript
function isObjArr(value){
     if (Object.prototype.toString.call(value) === "[object Array]") {
            console.log('value是数组');
       }else if(Object.prototype.toString.call(value)==='[object Object]'){//这个方法兼容性好一点
            console.log('value是对象');
      }else{
          console.log('value不是数组也不是对象')
      }
}
```

### promise

```javascript
依照 Promise/A+ 的定义，Promise 有四种状态：

pending: 初始状态, 非 fulfilled 或 rejected.
fulfilled: 成功的操作.
rejected: 失败的操作.
settled: Promise已被fulfilled或rejected，且不是pending


另外， fulfilled与 rejected一起合称 settled
Promise 对象用来进行延迟(deferred) 和异步(asynchronous) 计算

构造promisr基本用法
var promise = new Promise(function(resolve, reject) {

        if (...) {  // succeed

            resolve(result);

        } else {   // fails

            reject(Error(errMessage));

        }
    });

Promise 实例拥有 then 方法（具有 then 方法的对象，通常被称为thenable）。它的使用方法如下：

promise.then(onFulfilled, onRejected)


接收两个函数作为参数，一个在 fulfilled 的时候被调用，一个在rejected的时候被调用，接收参数就是 future，onFulfilled 对应resolve, onRejected对应 reject


export const promiseDemo=()=>{
new Promise((resolve,reject)=>{
    resolve(()=>{
        let a=1;
        return ++a;
    }).then((data)=>{
        console.log(data)//data值为++a的值
    }).catch(()=>{//错误执行这个

    })
})
}

export const promiseDemo=()=>{
Promise.resolve([1,2,3]).then((data)=>{//直接初始化一个Promise并执行resolve方法
    console.log(data)//data值为[1,2,3]
})
}
```

### 获取当前的时间yyyy-MM-dd HH:mm:ss

```javascript
export default const obtainDate=()=>{
 let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day=date.getDate();
      let hours=date.getHours();
      let minu=date.getMinutes();
      let second=date.getSeconds();
      //判断是否满10
      let arr=[month,day,hours,minu,second];
      arr.forEach(item=>{
        item< 10?"0"+item:item;
      })
      return year+'-'+arr[0]+'-'+arr[1]+' '+arr[2]+':'+arr[3]+':'+arr[4]      
}
```

### 节流函数

```javascript
／**
*  @  { Function} callBack 回调程序    
*  @  { Number } delay  延时时间
*  @  { Number }  intervalTime  间隔时间
*  return  { Function }
*／
function thorttleFn(callBack,delay,intervalTime){
    var timer=null;  // 定时器变量
    var time=0;  // 时间变量
    return function(){
        var context=this;
        var curTime=new Date();  // 当前执行的时间
        clearTimeout(timer);  //  清除上次的定时器
        
        if(!time){
            time=curTime;
        }
        // 当前执行时间距离上次执行的时间是否大于等于间隔时间
        if(curTime - time >= intervalTime){
            time=curTime;
            callBack.apply(context,arguments)
        }else{
            timer=setTimeout(()=>{
                callBack.apply(context,arguments)
            },delay)
        }
    }
}

//调用
window.onresize=thorttleFn(myFunc,50,300)
```

### log封装

```javascript
function log(){
  var newArguments = []
  if(arguments.length > 0){
    for(var i = 0; i < arguments.length; i++){
      newArguments.push('iphone',arguments[i])
    }
  }
  console.log.apply(console,newArguments)
}
```

### 二分法排序

```javascript
function sortMany(arr){
  if(arr.length <= 1){
    return arr
  }
  var left = [], right = []
  var middleIndex = Math.floor(arr.length/2)
  var middleValue = arr.splice(middleIndex,1)[0]
  for(var i = 0; i < arr.length; i++){
    if(arr[i] < middleValue){
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }
  return sortMany(left).concat(middleValue,sortMany(right))

}
```

### 正则校验API

```javascript
let checkType=(function(){
    let rules={
        email(str){
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        },
        mobile(str){
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        },
        tel(str){
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        },
        number(str){
            return /^[0-9]$/.test(str);
        },
        english(str){
            return /^[a-zA-Z]+$/.test(str);
        },
        text(str){
            return /^\w+$/.test(str);
        },
        chinese(str){
            return /^[\u4E00-\u9FA5]+$/.test(str);
        },
        lower(str){
            return /^[a-z]+$/.test(str);
        },
        upper(str){
            return /^[A-Z]+$/.test(str);
        }
    };
    //暴露接口
    return {
        //校验
        check(str, type){
            return rules[type]?rules[type](str):false;
        },
        //添加规则
        addRule(type,fn){
            rules[type]=fn;
        }
    }
})();

//调用方式
//使用mobile校验规则
console.log(checkType.check('188170239','mobile'));
//添加金额校验规则
checkType.addRule('money',function (str) {
    return /^[0-9]+(.[0-9]{2})?$/.test(str)
});
//使用金额校验规则
console.log(checkType.check('18.36','money'));
```

### jspnp实现

```javascript
(function (global) {
    var id = 0,
        container = document.getElementsByTagName("head")[0];

    function jsonp(options) {
        if(!options || !options.url) return;

        var scriptNode = document.createElement("script"),
            data = options.data || {},
            url = options.url,
            callback = options.callback,
            fnName = "jsonp" + id++;

        // 添加回调函数
        data["callback"] = fnName;

        // 拼接url
        var params = [];
        for (var key in data) {
            params.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
        url = url.indexOf("?") > 0 ? (url + "&") : (url + "?");
        url += params.join("&");
        scriptNode.src = url;

        // 传递的是一个匿名的回调函数，要执行的话，暴露为一个全局方法
        global[fnName] = function (ret) {
            callback && callback(ret);
            container.removeChild(scriptNode);
            delete global[fnName];
        }

        // 出错处理
        scriptNode.onerror = function () {
            callback && callback({error:"error"});
            container.removeChild(scriptNode);
            global[fnName] && delete global[fnName];
        }

        scriptNode.type = "text/javascript";
        container.appendChild(scriptNode)
    }

    global.jsonp = jsonp;

})(this);


调用：
jsonp({
    url : "www.example.com",
    data : {id : 1},
    callback : function (ret) {
        console.log(ret);
    }
});
```

### 常用正则

```javascript
身份证：
//第二代身份证号码正则
let isTrue = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//第一代身份证正则表达式(15位)
let isTrue=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;

手机号码：
let isTrue = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;  

邮箱：
let isTrue =/^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;

用户名：
////用户名正则，4到16位（字母，数字，下划线，减号）
let isTrue = /^[a-zA-Z0-9_-]{4,16}$/;

密码正则：
let isTrue =^[a-zA-Z]\w{5,17}$;

密码强度：
let isTrue = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;

QQ号码：
let isTrue = /^[1-9][0-9]{4,10}$/;

微信号：
//微信号正则，6至20位，以字母开头，字母，数字，减号，下划线
let isTrue = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;

域名正则：
let isTrue=[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?;    

中文正则：
let isTrue = /[\u4E00-\u9FA5]/;
//这个可以用于验证用户的真实姓名。

固定电话：
let isTrue=(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8};

ip地址：
let isTrue=\d+\.\d+\.\d+\.\d+;

邮政编码：
let isTrue=[1-9]{1}(\d+){5};
```

### 移动端触摸事件

```javascript
// 手指接触屏幕
document.addEventListener('touchstart', event => {
  this.startY = event.touches[0].pageY;
});
//手指离开屏幕
document.addEventListener('touchend', event => {
  let endY = event.changedTouches[0].pageY;
  if (endY - this.startY < 0) {
    // 手指向上滑动，对应页面向下滚动
    this.goDown();
  } else {
    // 手指向下滑动，对应页面向上滚动
    this.goUp();
  }
});
```

### 微信ios页面回退不刷新

```javascript
var isPageHide = false;
window.addEventListener('pageshow', function () {
      if (isPageHide) {
          window.location.reload();
    }
});
window.addEventListener('pagehide', function () {
      isPageHide = true;
});
```

### js 判断屏幕的方向或者resize事件

```javascript
var evt = "onorientationchange" in window ? "orientationchange" : "resize";
    window.addEventListener(evt, function() {
        var width = document.documentElement.clientWidth;
         var height =  document.documentElement.clientHeight;
          $print =  $('#print');
         if( width > height ){
            $print.width(width);
            $print.height(height);
            $print.css('top',  0 );
            $print.css('left',  0 );
            $print.css('transform' , 'none');
            $print.css('transform-origin' , '50% 50%');
         }
         else{
            $print.width(height);
            $print.height(width);
            $print.css('top',  (height-width)/2 );
            $print.css('left',  0-(height-width)/2 );
            $print.css('transform' , 'rotate(90deg)');
            $print.css('transform-origin' , '50% 50%');
         }
    }, false);
    
    
    
    css横竖屏：
    @media screen and (orientation: portrait) {
    .main {
        -webkit-transform:rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        transform: rotate(-90deg);
        width: 100vh;
        height: 100vh;
        /*去掉overflow 微信显示正常，但是浏览器有问题，竖屏时强制横屏缩小*/
        overflow: hidden;
    }
}

@media screen and (orientation: landscape) {
    .main {
        -webkit-transform:rotate(0);
        -moz-transform: rotate(0);
        -ms-transform: rotate(0);
        transform: rotate(0)
    }
}
```

### 实现图片懒加载

```javascript

<ul>
    <li><img src="./img/default.png" data="./img/1.png" alt=""></li>
    <li><img src="./img/default.png" data="./img/2.png" alt=""></li>
    <li><img src="./img/default.png" data="./img/3.png" alt=""></li>
    <li><img src="./img/default.png" data="./img/4.png" alt=""></li>
    <li><img src="./img/default.png" data="./img/5.png" alt=""></li>
    <li><img src="./img/default.png" data="./img/6.png" alt=""></li>
    <li><img src="./img/default.png" data="./img/7.png" alt=""></li>
    <li><img src="./img/default.png" data="./img/8.png" alt=""></li>
</ul>
let imgs =  document.querySelectorAll('img')
// 窗口可视区高度
let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
// img 距离窗口可视区顶部的距离 imgs[i].getBoundingClientRect().top
function lazyLoadImg () {
    for (let i = 0; i < imgs.length; i ++) {
        if((imgs[i].getBoundingClientRect().top + imgs[i].height)>=0&&imgs[i].getBoundingClientRect().top < clientHeight ){
            imgs[i].src = imgs[i].getAttribute('data')
        }
    }      
}
window.addEventListener('scroll', lazyLoadImg);


新API实现：
 <li class="list-item"><img class="list-item-img" alt="loading" data-src='./images/icon1.png'></li>
        <li class="list-item"><img class="list-item-img" alt="loading" data-src='./images/icon2.png'></li>
        <li class="list-item"><img class="list-item-img" alt="loading" data-src='./images/icon3.png'></li>
        <li class="list-item"><img class="list-item-img" alt="loading" data-src='./images/icon4.png'></li>
        <li class="list-item"><img class="list-item-img" alt="loading" data-src='./images/icon5.png'></li>
        <li class="list-item"><img class="list-item-img" alt="loading" data-src='./images/icon6.png'></li>

        <script>
            var observer = new IntersectionObserver(function(changes) {
                console.log(changes);
                changes.forEach(function(element, index) {
                    // statements
                    if (element.intersectionRatio > 0 && element.intersectionRatio <= 1) {
                        element.target.src = element.target.dataset.src;
                    }
                });
            });


            function addObserver() {
                var listItems = document.querySelectorAll('.list-item-img');
                listItems.forEach(function(item) {
                    observer.observe(item);
                });
            }

            addObserver();
        </script>
```

### promise使用用例

```javascript
var waidSecond = new promise(function(resolve,reject){
  setTimeout(resolve,1000)
})

waidSecond.then(function(){
  console.log("123")
  return waidSecond;
}).then(function(){
  consolog.log("456")
})

原始写法
setTimeout(function(){
  console.log("123")
  setTimeout(function(){
    console.log("456")
  },1000)
},1000)
```

### async/await写法

```javascript
//promise实现方法：
function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve("long_time_value"), 1000);
    });
}

takeLongTime().then(v => {
    console.log("got", v);
});



//async/await使用方法：
function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve("long_time_value"), 1000);
    });
}

async function test() {
    const v = await takeLongTime();
    console.log(v);
}

test();
```



弹窗是阻止滚动

```javascript
// 展示弹窗时，阻止背景滚动
function stopScroll () {
    let top = document.body.scrollTop || document.documentElement.scrollTop;
    document.body.style.position = 'fixed';
    document.body.style.top = `${-1 * top}px`;
}
// 隐藏弹窗时，恢复背景的滚动
function recoverScroll () {
    let top = -parseInt(document.body.style.top);
    document.body.style.position = 'static';
    document.body.style.top = 0;
    window.scrollTo(0, top);
}

// 注意事项
// 设置fixed后页面元素会发生偏移，通过设置body样式可以解决这个问题
body {
    width: 100%;
}
```



