### 判断设备来源

function deviceType(){
​        var ua = navigator.userAgent;
​        var agent = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];    
​        for(var i=0; i<len,len = agent.length; i++){
​            if(ua.indexOf(agent[i])>0){         
​                break;
​            }
​        }
​    }
​    deviceType();
​    window.addEventListener('resize', function(){
​        deviceType();
​    })

​    微信的 有些不太一样
​    function isWeixin(){
​        var ua = navigator.userAgent.toLowerCase();
​        if(ua.match(/MicroMessenger/i)=='micromessenger'){
​            return true;
​        }else{
​            return false;
​        }
​    }

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















































