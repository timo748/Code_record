/*******************************获取id值*************************************/
function $(id) {
    return document.getElementById(id);
}
$(dome);


/****************当来自服务器的图片出错时替代方法*******************/
//方法1：
$("img").error(function() {
        $("img").replaceWith('img src="a.png"');
    })
    //方法2： 
    //<img src = "图片地址" onerror = "this.style.display='none'" >
    //img src = "图片地址" onerror = "this.src='默认图片地址'" >



//能将具有length属性的对象转成数组
Array.prototype.slice.call(arguments)



//js单例模式：
//1、使用命名空间
var show = {
    a: function() {}
    a: function() {}
};

//方法封装
(function(w) {
    function show(tar) {
        this.setting = {};

        function bindDom() {
            console.log(tar)
        };

        function bindEvents() {};
        this.init = function() {
            bindDom();
            bindEvents();
        };
        this.init();
    }
    show.prototype = function() {}

    w.show = new show;
})(window);
show("111");
show("2222");


// 模块化封装
var page = {
    init: function() {
        this.bingDom();
    },
    bindDom: function() {
        var _this = this;
        console.log(abc);
        // 实现方法
    },
    bingEvent: function() {
        var _this = this;
        // 实现方法
        _this.bindDom();
    }
}

$(function() {
    page.init()
})

//2、使用闭包封装私有变量
var show = (function() {
    var a = 1,
        b = 2;
    return {
        show1: function() {
            return a + b;
        }
    }
})()

console.log(show.show1());


/*****************************js垂直居中**********************/
$("div").css({
    position: "absolute",
    left: ($(window).width() - $("div").width()) / 2,
    top: ($(window).height() - $("div").height()) / 2
});


/*****************************星星评价渲染**********************/
(function() {
    var star = 0.7;
    var sum = star * 10 / 2;
    $(".starSel").html("");
    for (i = 0; i < sum; i++) {
        if (sum < i + 1) {
            $(".starSel").html($(".starSel").html() + "<span class='icon-star-half icon-sm'></span>");
        } else {
            $(".starSel").html($(".starSel").html() + "<span class='icon-star icon-sm style='margin-right:2px;''></span>");
        }
    }
})();


/*****************************解决音乐自动播放**********************/
function audioAutoPlay(id) {
    var audio = document.getElementById(id),
        play = function() {
            audio.play();
            document.removeEventListener("touchstart", play, false);
        };
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function() {
        //微信
        play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function() {
        //易信
        play();
    }, false);
    document.addEventListener("touchstart", play, false);
}
audioAutoPlay('Jaudio');


/********************** 判断是ios还是安卓跳转不同的应用商店*****************/
var u = navigator.userAgent,
    app = navigator.appVersion;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
// 是安卓浏览器
if (isAndroid) {
    window.location.href = ''; // 跳安卓端下载地址
}
// 是iOS浏览器
if (isIOS) {
    //  换成自己的appstore地址
    window.location.href = 'https://itunes.apple.com/app/apple-store/xxxxxx'; // 跳AppStore下载地址
}


/*********************************二维数组进行合并*****************************/
var arr = [
    [1, 2],
    [3, 4, 5],
    [6, 7, 8, 9], 10, 11
];

function flatten(arr) {
    return [].concat(...arr)
}
console.log(flatten(arr)); //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]


/*********************************去重*****************************/
//借助 Map 数据结构
function unique(arr) {
    const seen = new Map()
    return arr.filter((v) = & gt; !seen.has(v) & amp; & amp; seen.set(v, 1));
}
//借助 Set 数据结构
function unique(arr) {
    return Array.from(new Set(arr)) //或 return [...new Set(arr)]
}
unique([1, 2, 3, 4, 3, 2, '1', 'a', 'b', 'a']);
//[1, 2, 3, 4, &quot;1&quot;, &quot;a&quot;, &quot;b&quot;]


// 正反对比
const button = document.querySelector('.like-btn')
const buttonText = button.querySelector('.like-text')
let isLiked = false
button.addEventListener('click', () => {
    isLiked = !isLiked
    if (isLiked) {
        buttonText.innerHTML = '取消'
    } else {
        buttonText.innerHTML = '点赞'
    }
}, false)




/******************************************* ES6实现方法*************************************/

/*****************数组拼接********************/
const ArrayConcat = (arr, ...args) => [].concat(arr, ...args);

/**************随机获取数组的一个元素**************/
const sample = arr => arr[Math.floor(Math.random() * arr.length)];

/**************求数组平均数**************/
const average = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;

/**************平铺多维数组**************/
const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v));

/**************获取数组最大值**************/
const arrayMax = arr => Math.max(...arr);

/**************随机排列数组**************/
const shuffle = arr => arr.sort(() => Math.random() - 0.5);

/**************获取数组交集**************/
const similarity = (arr, values) => arr.filter(v => values.includes(v));
//similarity([1,2,3], [1,2,4]) -> [1,2]

/**************数组求和**************/
const sum = arr => arr.reduce((acc, val) => acc + val, 0);

/**************删除元素最后一个数组*************/
const tail = arr => arr.length > 1 ? arr.slice(1) : arr;

/**************数组去重*************/
const unique = arr => [...new Set(arr)];

/**************获取滚动条位置*************/
const getScrollPos = (el = window) =>
    ({
        x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,
        y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop
    });

/**************回到顶部*************/
const scrollToTop = _ => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};


/**************判断元素在可视窗口可见*************/
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    return partiallyVisible ?
        ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)) :
        top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
// 举个例子，有一个 100x100 可视窗口， 和一个 10x10px 元素定位在 {top: -1, left: 0, bottom: 9, right: 10}
// elementIsVisibleInViewport(el) -> false (not fully visible)
// elementIsVisibleInViewport(el, true) -> true (partially visible)



/**************获取两个日期的天数差*************/
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24);

/**************截断字符串*************/
const truncate = (str, num) =>
    str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

/**************指定范围随机生成数字*************/
const randomInRange = (min, max) => Math.random() * (max - min) + min;


/**************网址参数*************/
const getUrlParameters = url =>
    url.match(/([^?=&]+)(=([^&]*))/g).reduce(
        (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
    );


/**************邮箱验证*************/
const uuid = _ =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );

/**************数字验证*************/
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;


/**************计算元素出现次数*************/
const countOccurrences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
// countOccurrences([1,1,2,1,2,3], 1) -> 3

/**************过滤不唯一元素*************/
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
// filterNonUnique([1,2,2,3,4,4,5]) -> [1,3,5]


/*****************************socket前端代码示例********************************/
//<div>user input：<input type="text"></div>
//<script src="./socket.io.js"></script>
var socket = io('http://www.domain2.com:8080');

// 连接成功处理
socket.on('connect', function() {
    // 监听服务端消息
    socket.on('message', function(msg) {
        console.log('data from server: ---> ' + msg);
    });

    // 监听服务端关闭
    socket.on('disconnect', function() {
        console.log('Server socket has closed.');
    });
});

document.getElementsByTagName('input')[0].onblur = function() {
    socket.send(this.value);
};



/***************************** 单例模式弹窗********************************/
var popup = (function() {
    var div;
    return function() {
        if (!div) {
            div = document.createElement('div');
            div.innerHTML = '我是一个框框';
            div.style.display = 'none';
            document.body.appendChild(div);
        }
        return div;
    }
})();

document.getElementsByTagName('J-popup').onclick = function() {
    var popupInstance = popup();
    popupInstance.style.display = 'block';
}

// 改进----------------
// 定义一个生成单例对象的函数：
var getSingle = function(fn) {
    var instance;
    return function() {
        return instance || (instance = fn.apply(this, arguments));
    }
}

var popup = function() {
    var div = document.createElement('div');
    div.innerHTML = '我是一个框框';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
};

var popupFactory = getSingle(popup);

document.getElementsByTagName('J-popup').onclick = function() {
    var popupInstance = popupFactory();
    popupInstance.style.display = 'block';
}