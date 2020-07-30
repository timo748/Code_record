### 正则教程

```
创建正则：
let regex = /ab/ ;
let regex=/^[a-zA-Z]/ ;

正则参数：
g   全局匹配;找到所有匹配，而不是在第一个匹配后停止
i    匹配全部大小写
m    多行; 将开始和结束字符（^和$）视为在多行上工作（也就是，分别匹配每一行的开始和结束（由 \n 或 \r 分割），而不只是只匹配整个输入字符串的最开始和最末尾处。
s   与m相反，单行匹配

正则常用方法：
1.test()方法检索字符串中的值是否匹配给出的正则规则,返回布尔值 true或false。  ///../.test("ab");  // true。 
2.exec()方法检索字符串中的指定值，如果找到匹配的文本，则返回一个结果的数组，反之返回null。
/abc/.exec("defaabc")       //  ["abc", index: 4, input: "defaabc"]
3.compile()方法用于改变正则匹配内容
将/abc/的匹配内容改成后面的字符串的内容   /abc/.compile('def’)    //  /def/
4.split()将字符串分割成字符串数组
将字符串abcd以/b/中的b分割成字符串数组   "abcd".split(/b/);       // ["a", "cd"]
5.replace()方法用于在字符串中用一些字符替换另一些字符或者替换一个与正则表达式匹配的字符串
用正则内容/\d\d\d/去匹配字符串12345abcde，将匹配的内容替换成*，并返回替换完成的字符串   '12345abcde'.replace(/\d\d\d/g,'*');     //  "*45abcde"
6.search() 用于检索字符串中指定的字符串或与正则表达式相匹配的字符串，返回匹配的字符串的起始位置的索引，反之返回-1
'abcdedfasdfs'.search(/d/);      // 3
7.match()方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配
"aabbbbccbbaab".match(/b+/g);     //  ["bbbb", "bb", "b"]
```

### 数组去重

```javascript
Array.prototype.unique = function unique() {
    var obj = {};
    for (var i = 0; i < this.length; i++) {
        var current = this[i];
        if (obj[current] === current) {
            current = this[this.length - 1];
            this.length--;
            i--;
            continue;
        }
        obj[current] = current
    }
    obj = null;
    return this;
}
```

### es6数组去重

```javascript
var arr = [10, 3, 4, 5, 6, 3, 4, 5, 6, 11, 14];
function fillter(arrth) {
    return arrth.filter(function(ele, index, array) {
        return arrth.indexOf(ele) === index
    })
}
console.log(fillter(arr));
```

### 本地存储封装

```
export const get = (key, storage = localStorage) => JSON.parse(storage.getItem(key))；
export const set = (key, val, storage = localStorage) => storage.setItem(key, JSON.stringify(val))
export const remove = (key, storage = localStorage) => storage.removeItem(key)
export const clear = (storage = localStorage) => storage.clear()
```

### sleep封装

```javascript
promise：
function sleep(ms){
  var temple=new Promise(
  (resolve)=>{
  console.log(111);setTimeout(resolve,ms)
  });
  return temple
}
sleep(500).then(function(){
   //console.log(222)
})
//先输出了111，延迟500ms后输出222

async：
function sleep(ms){
  return new Promise((resolve)=>setTimeout(resolve,ms));
}
async function test(){
  var temple=await sleep(1000);
  console.log(1111)
  return temple
}
test();
//延迟1000ms输出了1111
```

### 动态加载js文件

```javascript
module.exports.loadScript = (url, callback) => {
  let script  = document.createElement('script');
  script.type = 'text/javascript';

  if (callback) {
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }
  }

  script.src = url;

  document.body.appendChild(script);
};
```

### 跳转到App打开页面，如果没有则跳转app下载页面

```javascript
module.exports.goApp = href => {
  let src = `yixinli://${href}`;
  let ifr;

  let UA = window.navigator.userAgent.toUpperCase();

  // 判断微信环境
  if (/MICROMESSENGER/i.test(UA)) {
    // if (window.toast) {
    //   window.toast('微信用户需要点击右上角菜单，使用“浏览器”打开~', 3000);
    // } else {
    //   alert('微信用户需要点击右上角菜单，使用“浏览器”打开~')
    // }
    // return;
    window.location.href = '//a.app.qq.com/o/simple.jsp?pkgname=com.xinli.yixinli';
  }

  if (/(IPHONE|IPAD|IPOD|IOS)/i.test(UA)) {
    window.location.href = src;

  } else {

    ifr               = document.createElement('iframe'); //open_question_detail?question_id=123
    ifr.src           = src;
    ifr.style.display = 'none';

    document.body.appendChild(ifr);
  }

  window.setTimeout(function () {
    if (ifr) document.body.removeChild(ifr);
    window.location.href = '//a.app.qq.com/o/simple.jsp?pkgname=com.xinli.yixinli';
  }, 2000);
};
```

### 截取剩余时间

```javascript
/**
 * 获取剩余时间
 * @param  {Number} endTime    截止时间
 * @param  {Number} serverTime 当前时间
 * @return {Object}            剩余时间对象
 */

module.exports.getRemainTime = (endTime, serverTime) => {
  let t =
        (typeof endTime === 'number' ? endTime : Date.parse(endTime)) -
        (typeof serverTime === 'number' ? serverTime : Date.parse(serverTime));

  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours   = Math.floor((t / (1000 * 60 * 60)) % 24);
  let days    = Math.floor(t / (1000 * 60 * 60 * 24));

  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  }
};
```

### 节流函数

```javascript
* 函数节流方法
* @param Function fn 延时调用函数
* @param Number delay 延迟多长时间
* @param Number atleast 至少多长时间触发一次
* @return Function 延迟执行的方法
*/
module.exports.throttle = function(fn, delay, atleast) {
  var timer = null;
  var previous = null;
  return function () {
    var now = +new Date();
    if ( !previous ) previous = now;
    if ( now - previous > atleast ) {
      fn();
      // 重置上一次开始时间为本次结束时间
      previous = now;
    } else {
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn();
      }, delay);
    }
  }
};
调用：throttle(toole, 2000, 1000)();
```

### 时间格式化

```javascript
const dateFormatter = (formatter, date) => {
    date = (date ? new Date(date) : new Date)
    const Y = date.getFullYear() + '',
          M = date.getMonth() + 1,
          D = date.getDate(),
          H = date.getHours(),
          m = date.getMinutes(),
          s = date.getSeconds()
    return formatter.replace(/YYYY|yyyy/g, Y)
                    .replace(/YY|yy/g, Y.substr(2, 2))
                    .replace(/MM/g, (M < 10 ? '0' : '') + M)
                    .replace(/DD/g, (D < 10 ? '0' : '') + D)
                    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
                    .replace(/mm/g, (m < 10 ? '0' : '') + m)
                    .replace(/ss/g, (s < 10 ? '0' : '') + s)
}

dateFormatter('YYYY-MM-DD HH:mm', '1995/02/15 13:55') // 1995-02-15 13:55
```



### 表单序列化

```javascript
export const serialize = data => {
  let list = []
  Object.keys(data).forEach(ele => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join('&')
}
```

### 获取对象的类型

```javascript
export const getObjType = obj => {
  var toString = Object.prototype.toString
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)]
}
```

### 对象深拷贝

```javascript
export const deepClone = data => {
  var type = getObjType(data)
  var obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    // 不再具有下一层次
    return data
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (var key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}
```

### 计算时间和当前时间的差值

```javascript
export const spaceTime = function (atime) {
  atime = atime.replace(/-/g, '/'); //IE出现兼容问题，带“-”格式的时间无法被new Date()转成时间格式，返回NaN.
  let byTime = [365 * 24 * 60 * 60 * 1000, 24 * 60 * 60 * 1000, 60 * 60 * 1000, 60 * 1000, 1000];
  let unit = ["年", "天", "小时", "分钟", "秒钟"];
  var ct = new Date().getTime() - new Date(atime).getTime();
  if (ct <= 1000) {
    // return "时间数据出错!"
    return "刚刚"
  }
  var sb = [];
  for (var i = 0; i < byTime.length; i++) {
    if (ct < byTime[i]) {
      continue;
    }
    var temp = Math.floor(ct / byTime[i]);
    ct = ct % byTime[i];
    if (temp > 0) {
      sb.push(temp + unit[i]);
    }


    /*一下控制最多输出几个时间单位：
     一个时间单位如：N分钟前
     两个时间单位如：M分钟N秒前
     三个时间单位如：M年N分钟X秒前
    以此类推
    */
    if (sb.length >= 1) {
      break;
    }
  }
  return (sb.join("") + "前");
}
```

### 获取当年年月日

```javascript
export const getNowFormatDate = function() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month;
  return currentdate;
}
```

### 获取距离当前时间多久的时间

```javascript
/**
 * 获取距离当前时间多久的时间
 * @param type year年/month月/week周/day日 
 * @param number -为之前/+为之后
 */
export const getBeforAfterTime = function(type=null,number=0) {
  var nowdate = new Date();
  switch (type) {
      case "day":   //取number天前、后的时间
          nowdate.setTime(nowdate.getTime() + (24 * 3600 * 1000) * number);
          var y = nowdate.getFullYear();
          var m = nowdate.getMonth() + 1;
          var d = nowdate.getDate();
          var retrundate = y + '/' + m + '/' + d;
          break;
      case "week":  //取number周前、后的时间
          nowdate.setTime(nowdate.getTime() + (7 * 24 * 3600 * 1000) * number);
          var y = nowdate.getFullYear();
          var m = nowdate.getMonth() + 1;
          var d = nowdate.getDate();
          var retrundate = y + '/' + m + '/' + d;
          break;
      case "month":  //取number月前、后的时间
          nowdate.setMonth(nowdate.getMonth() + number);
          var y = nowdate.getFullYear();
          var m = nowdate.getMonth() + 1;
          var d = nowdate.getDate();
          var retrundate = y + '/' + m + '/' + d;
          break;
      case "year":  //取number年前、后的时间
          nowdate.setFullYear(nowdate.getFullYear() + number);
          var y = nowdate.getFullYear();
          var m = nowdate.getMonth() + 1;
          var d = nowdate.getDate();
          var retrundate = y + '/' + m + '/' + d;
          break;
      default:     //取当前时间
          var y = nowdate.getFullYear();
          var m = nowdate.getMonth() + 1;
          var d = nowdate.getDate();
          var retrundate = y + '/' + m + '/' + d;
  }
  return retrundate;
}
```



