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











































