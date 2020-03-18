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

