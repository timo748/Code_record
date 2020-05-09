```javascript
//创建数字递增数组：
console.log(Array.from({ length: 15 }, (value, index) => index + 1))
```

### window.open打开外链

```
var yourWindow = window.open();
yourWindow.opener = null;
yourWindow.location = "http://someurl.here";
yourWindow.target = "_blank";
```

###history监听 pushState 和 replaceState 的变化

```
 //创建全局事件
var _wr = function(type) {
   var orig = history[type];
   return function() {
       var rv = orig.apply(this, arguments);
      var e = new Event(type);
       e.arguments = arguments;
       window.dispatchEvent(e);
       return rv;
   };
};
//重写方法
 history.pushState = _wr('pushState');
 history.replaceState = _wr('replaceState');
//实现监听
window.addEventListener('rep
laceState', function(e) {
  console.log('THEY DID IT AGAIN! replaceState 111111');
});
window.addEventListener('pushState', function(e) {
  console.log('THEY DID IT AGAIN! pushState 2222222');
});


监听用户点击浏览器后退和前进按钮时，或者使用js调用back、forward、go方法时
window.addEventListener('popstate', function(event) {
});
```

