隐藏所有指定元素

```javascript
const hide = (...el) => [...el].forEach(e => (e.style.display = "none"));

// Example
hide(document.querySelectorAll("img"));  // 隐藏页面上所有<img />元素
```

确定元素是否有指定类

```javascript
const hasClass = (el, className) => el.classList.contains(className); 

// Example 
hasClass(document.querySelector("p.special"), "special"); // true
```

如何切换元素的类？

```javascript
const toggleClass = (el, className) => el.classList.toggle(className); 

// Example 
toggleClass(document.querySelector( p.special ),  special ); // 该段不再有 "special" 类
```

如何获取当前页面的滚动位置？

```javascript
const getScrollPosition = (el = window) => ({ 
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft, 
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop 
}); 

// Example 
getScrollPosition(); // {x: 0, y: 200}
```

滚动到页面顶部

```javascript
const scrollToTop = () => {     
    const c = document.documentElement.scrollTop || document.body.scrollTop;     
    if (c > 0) {         
        window.requestAnimationFrame(scrollToTop);         
        window.scrollTo(0, c - c / 8);     
    } 
}; 

// Example 
scrollToTop();
```

确认父元素是否包含子元素？

```javascript
const elementContains = (parent, child) => parent !== child && parent.contains(child);  

// Examples  
elementContains(document.querySelector("head"), document.querySelector("title"));  // true  
elementContains(document.querySelector("body"), document.querySelector("body")); // false
```

获取一个元素内的所有图像？

```javascript
const getImages = (el, includeDuplicates = false) => {     
    const images = [...el.getElementsByTagName("img")].map(img => img.getAttribute("hide"));     
    return includeDuplicates ? images : [...new Set(images)]; 
}; 

// Examples 
getImages(document, true); // ["image1.jpg", "image2.png", "image1.png", "..."] 
getImages(document, false); // ["image1.jpg", "image2.png", "..."]
```

给定毫秒数的可读格式

```javascript
const formatDuration = ms => {     
    if (ms < 0) ms = -ms; 
    const time = {         
        day: Math.floor(ms / 86400000),         
        hour: Math.floor(ms / 3600000) % 24,         
        minute: Math.floor(ms / 60000) % 60,         
        second: Math.floor(ms / 1000) % 60,         
        millisecond: Math.floor(ms) % 1000      
    };     
    return Object.entries(time).filter(val => val[1] !== 0).map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`).join(","); 
}; 

// Examples 
formatDuration(1001); // 1 second, 1 millisecond
formatDuration(34325055574); // 397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds
```

获取两个日期之间的天数间隔？

```javascript
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24); 

// Example 
getDaysDiffBetweenDates(new Date("2017-12-13"), new Date("2017-12-22")); // 9
```

将一个字符串复制到剪贴板？

```javascript
const copyToClipboard = str => {     
    const el = document.createElement( textarea );     
    el.value = str;     
    el.setAttribute( readonly ,   );     
    el.style.position =  absolute ;     
    el.style.left =  -9999px ;     
    document.body.appendChild(el);     
    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;     
    el.select();     
    document.execCommand( copy );     
    document.body.removeChild(el);     
    if (selected) {         
        document.getSelection().removeAllRanges();         
        document.getSelection().addRange(selected);     
    } 
}; 

// Example 
copyToClipboard( Lorem ipsum ); //  Lorem ipsum  copied to clipboard.
```

### 对象数据过滤

```javascript
const course = {
    math: 80,
    english: 85,
    chinese: 90
}
const res = Object.entries(course).filter(([key, val]) => val > 80)
console.log(res) // [ [ 'english', 85 ], [ 'chinese', 90 ] ]
console.log(Object.fromEntries(res)) // { english: 85, chinese: 90 }
```

### ES6获取地址栏参数

```javascript
// let url = "https://www.baidu.com?name=jimmy&age=18&height=1.88"
// queryString 为 window.location.search
const queryString = "?name=jimmy&age=18&height=1.88";
const queryParams = new URLSearchParams(queryString);
const paramObj = Object.fromEntries(queryParams);
console.log(paramObj); // { name: 'jimmy', age: '18', height: '1.88' }
```

