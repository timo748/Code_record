### 数组去重

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


### es6数组去重

    var arr = [10, 3, 4, 5, 6, 3, 4, 5, 6, 11, 14];

    function fillter(arrth) {

    return arrth.filter(function(ele, index, array) {
        return arrth.indexOf(ele) === index
    })
    }
    console.log(fillter(arr));



### 冒泡排序

    Array.prototype.bubbleSort = function bubbleSort() {
    var temp = null;
    for (var i = 0; i < this.length - 1; i++) {
        for (var k = 0; k < this.length - 1 - i; k++) {
            if (this[k] > this[k + 1]) {
                temp = this[k];
                this[k] = this[k + 1];
                this[k + 1] = temp;
            }
        }
    }
    return this;
    }




### 实现jsonp

//根据指定的URL发送一个JSONP请求
//然后把解析得到的响应数据传递给回调函数
//在URL中添加一个名为jsonp的查询参数，用于指定该请求的回调函数的名称
function getJSONP(url, callback) { //为本次请求创建一个唯一的回调函数名称

    var cbnum = "cb" + getJSONP.counter++; //每次自增计数器
    var cbname = "getJSONP." + cbnum; //作为JSONP函数的属性
    //将回调函数名称以表单编码的形式添加到URL的查询部分中
    //使用jsonp作为参数名，一些支持JSONP的服务
    //可能使用其他的参数名，比如callback
    if (url.indexOf("?") === -1) //URL没有查询部分
        url += "?jsonp=" + cbname; //作为查询部分添加参数
    else //否则
        url += "＆jsonp=" + cbname; //作为新的参数添加它
    //创建script元素用于发送请求
    var script = document.createElement("script"); //定义将被脚本执行的回调函数
    getJSONP[cbnum] = function(response) {
        try {
            callback(response); //处理响应数据
        } finally { //即使回调函数或响应抛出错误
            delete getJSONP[cbnum]; //删除该函数
            script.parentNode.removeChild(script); //移除script元素
        }
    }; //立即触发HTTP请求
    script.src = url; //设置脚本的URL
    document.body.appendChild(script); //把它添加到文档中


//用于创建唯一回调函数名称的计数器

### 拖拽事件

/**
 *Drag.js：拖动绝对定位的HTML元素
 *
 *这个模块定义了一个drag()函数，它用于mousedown事件处理程序的调用
 *随后的mousemove事件将移动指定元素，mouseup事件将终止拖动
 *这些实现能同标准和IE两种事件模型一起工作
 *
 *参数：
 *
 *elementToDrag：接收mousedown事件的元素或某些包含元素
 *它必须是定位的元素,元素的样式必须是行内样式
 *它的style.left和style.top值将随着用户的拖动而改变
 *
 *event：mousedown事件对象
 **/


    function drag(elementToDrag, event) { //初始鼠标位置，转换为文档坐标
    var startX = event.clientX;
    var startY = event.clientY; //在文档坐标下，待拖动元素的初始位置
    //因为elementToDrag是绝对定位的，
    //所以我们可以假设它的offsetParent就是文档的body元素
    var origX = parseFloat(elementToDrag.style.left);
    var origY = parseFloat(elementToDrag.style.top); //计算mousedown事件和元素左上角之间的距离
    //我们将它另存为鼠标移动的距离
    if (document.addEventListener) { //标准事件模型
        //在document对象上注册捕获事件处理程序
        document.addEventListener("mousemove", moveHandler, true);
        document.addEventListener("mouseup", upHandler, true);
    }
    //我们处理了这个事件，不让任何其他元素看到它
    if (event.stopPropagation) event.stopPropagation(); //标准模型
    else event.cancelBubble = true; //IE
    //现在阻止任何默认操作
    if (event.preventDefault) event.preventDefault(); //标准模型
    else event.returnValue = false; //IE
    /**
     * 当元素正在被拖动时， 这就是捕获mousemove事件的处理程序
     *它用于移动这个元素 
     **/
    function moveHandler(e) {
        if (!e) e = window.event; //IE事件模型
        //移动这个元素到当前鼠标位置，
        //通过滚动条的位置和初始单击的偏移量来调整
        var targetLeft = e.clientX - startX + origX;
        var targetTop = e.clientY - startY + origY;
        var minLeft = 0;
        var minTop = 0;
        var maxLeft = (document.documentElement.clientWidth || document.body.clientWidth) - elementToDrag.offsetWidth;
        var maxTop = (document.documentElement.clientHeight || document.body.clientHeight) - elementToDrag.offsetHeight;
        targetLeft = targetLeft > maxLeft ? maxLeft : (targetLeft < minLeft ? minLeft : targetLeft);
        targetTop = targetTop > maxTop ? maxTop : (targetTop < minTop ? minTop : targetTop);
        elementToDrag.style.left = targetLeft + "px";
        elementToDrag.style.top = targetTop + "px";
        if (e.stopPropagation) e.stopPropagation(); //标准
        else e.cancelBubble = true; //IE
    }
    /**
     *这是捕获在拖动结束时发生的最终mouseup事件的处理程序
     **/
    function upHandler(e) {
        if (!e) e = window.event; //IE事件模型
        //注销捕获事件处理程序
        if (document.removeEventListener) { //DOM事件模型
            document.removeEventListener("mouseup", upHandler, true);
            document.removeEventListener("mousemove", moveHandler, true);
        }
        //并且不让事件进一步传播
        if (e.stopPropagation) e.stopPropagation(); //标准模型
        else e.cancelBubble = true; //IE
    }
    }


### 每三位数加逗号

    function commafy(num) {
    return num && num
        .toString()
        .replace(/(\d)(?=(\d{3})+\.)/g, function($1, $2) {
            return $2 + ',';
        });
       }


### 递归实现一个深拷贝

    function deepClone(source) {
    if (!source || typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone');
    }
    var targetObj = source.constructor === Array ? [] : {};
    for (var keys in source) {
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = deepClone(source[keys]);
            } else {
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
    }
    
    // test example
    
    var o1 = {
    arr: [1, 2, 3],
    obj: {
        key: 'value'
    },
    func: function() {
        return 1;
    }
    };
    var o3 = deepClone(o1);
    
    console.log(o3 === o1); // => false
    
    console.log(o3.obj === o1.obj); // => false
    
    console.log(o2.func === o1.func); // => true




### 利用JSON序列化实现一个深拷贝

    function deepClone(source) {
    return JSON.parse(JSON.stringify(source));
    }
    var o1 = {
    arr: [1, 2, 3],
    obj: {
        key: 'value'
    },
    func: function() {
        return 1;
    }
    }
    var o2 = deepClone(o1);
    console.log(o2); // => {arr: [1,2,3], obj: {key: 'value'}}

### 过身份证号码识别“生日”和“性别

    function getBirthday(iIdNo) {
    if (iIdNo.length == 15) {
        tmpStr = iIdNo.substr(6, 6);
        tmpStr = "19" + tmpStr;
        tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
    } else {
        tmpStr = iIdNo.substr(6, 8);
        tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
    }
    console.log(tmpStr);
    }
    
    getBirthday("441481199303163875");
    
    function getSex(iIdNo) {
    if (iIdNo.length == 18) {
        sexno = iIdNo.substring(16, 17)
    } else if (iIdNo.length == 15) {
        sexno = iIdNo.substring(14, 15)
    }
    var tempid = sexno % 2;
    if (tempid == 0) {
        sex = '女';
    } else {
        sex = '男';
    }
    console.log(sex);
    }
    
    getSex("441481199303163875");
    
    
### 当元素滚动到一定距离时固定在顶部



    var elem = ('.test').eq(0);
    var offset_top = $elem.offset().top;
    var window = (window);
    $window.on('scroll resize', function() {
    if ($window.scrollTop() >= offset_top) {
        $elem.addClass('fixed');
    } else {
        $elem.removeClass('fixed');
    }
    }).trigger('scroll');


### 测试css属性浏览器是否支持，如果支持使用css3属性，不支持使用js

#### Sticky属性



    function isSupportSticky() {
    var prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
    var stickyText = '';
    for (var i = 0; i < prefixTestList.length; i++) {
        stickyText += 'position:' + prefixTestList[i] + 'sticky;';
    }
    // 创建一个dom来检查
    var div = document.createElement('div');
    var body = document.body;
    div.style.cssText = 'display:none;' + stickyText;
    body.appendChild(div);
    isSticky = /sticky/i.test(window.getComputedStyle(div).position);
    body.removeChild(div);
    div = null;
    return isSticky;
    }
    var nav = ('#nav');
    // 如果不支持
    if (!isSupportSticky()) {
    // 添加jshack
    $nav.addClass('nav-hack').append('<span>，不支持sticky</span>');
    var offset_top = $nav.offset().top;
    var $window = $(window);
    $window.on('scroll resize', function() {
        if ($window.scrollTop() >= offset_top) {
            $nav.addClass('nav-fixed');
            // 显示占位,其实不应该js频繁操作dom
            $('#nav-pl').show();
        } else {
            // 隐藏占位,其实不应该js频繁操作dom
            $('#nav-pl').hide();
            $nav.removeClass('nav-fixed');
        }
    }).trigger('scroll');
    } else {
    $nav.append('<span>，你支持sticky</span>');
    }

### 滚动到可视页面加载图片



    let imgs = document.getElementsByTagName("img");
    let n = 0; //存储加载图片索引
    let lazyload = () => {
    let cHeight = document.documentElement.clientHeight;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //滚动条距离顶部高度
    for (let i = n, l = imgs.length; i < l; i++) {
        let img = imgs[i];
        if (img.offsetTop < cHeight + scrollTop) {
            img.src = img.src == 'loading.gif' ? img.getAttribute('data-src') : img.src;
            n = i + 1;
        }
    }
    }
    window.onscroll = lazyload;


### 节流防抖函数

#### 防抖函数

    function debounce(fn, wait) {
    var timer = null;
    return function() {
        var context = this
        var args = arguments
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function() {
            fn.apply(context, args)
        }, wait)
    }
    }
    var fn = function() {
    console.log('boom')
    }
    setInterval(debounce(fn, 500), 1000) // 第一次在1500ms后触发，之后每1000ms触发一次
    setInterval(debounce(fn, 2000), 1000) // 不会触发一次（我把函数防抖看出技能读条，如果读条没完成就用技能，便会失败而且重新读条）
### 节流函数


    function throttle(fn, gapTime) {
    let _lastTime = null;
    return function() {
        let _nowTime = +new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn();
            _lastTime = _nowTime
        }
    }
    }
    let fn = () => {
    console.log('boom')
    }
    setInterval(throttle(fn, 1000), 10)