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

```
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

```
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

```
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

