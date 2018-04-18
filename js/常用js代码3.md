### 判断设备来源

```
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

```
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

```
export const dateReurn1=(date1)=>{
    date1.toLocaleString("en-US", { hour12: false }).replace(/\b\d\b/g, '0$&').replace(new RegExp('/','gm'),'-')
}
```

### 对象遍历

```
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

```
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

```
var nameObj = { name: { school: 'zfpx' } };
var ageObj = { age: 9 };
var obj = {};
Object.assign(obj, nameObj, ageObj);
console.log(obj);
```

### 递归深拷贝

```
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

```
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
```

### 判断变量是对象还是数组

```
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

```
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

```
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

```
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



































