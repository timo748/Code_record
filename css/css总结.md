## css3过渡动画

```
transition:设置四个过渡属性；
元素动画过渡时间：transition-duration: 2s;
元素过渡等待时间：transition-delay：2s
元素过渡属性名称：transition-property：width;
元素过渡速度：transition-timing-function：ease-in;
简写：transition: width 1s linear 2s;
```

## 动画

```
animation：动画名称，一个周期花费时间，运动曲线（默认ease），动画延迟（默认0），播放次数（默认1）infinite，是否反向播放动画（默认normal），是否暂停动画（默认running）

      简写的姿势排序
      @keyframes name : 动画名
      duration 持续时间
      timing-function 动画频率
      delay 延迟多久开始
      iteration-count 循环次数
      direction 动画方式,往返还是正向
      fill-mode  一般用来处理停留在某一帧
      play-state running 开始,paused 暂停 ...
      
沿着x轴旋转度数：translate:rotoateX(180deg)；
移动位置距离：transform:translateX(100px)；
缩放倍数：transform:scaleX(0.5);
倾斜角度：transform: skew(10deg,10deg);
X轴3D旋转：transform:rotateX(180deg);
3D旋转：transform:rotate3d(10,10,10,90deg);
在动画显示之前，应用开始属性值：animation-fill-mode:backwards；
```

## 阴影

```
box-shadow: 水平阴影的位置 垂直阴影的位置 模糊距离 阴影的大小 阴影的颜色 阴影开始方向（默认是从里往外，设置inset就是从外往里）;
```

## 倒影

```
-webkit-box-reflect:方向[ above-上 | below-下 | right-右 | left-左 ]，偏移量，遮罩图片
```

## 渐变

```
线性渐变：-moz-linear-gradient( [<point> || <angle>,]? <stop>, <stop> [, <stop>]* )
径向渐变：radial-gradient
圆锥渐变：background: conic-gradient(deeppink, yellowgreen);
参数：其共有三个参数，第一个参数表示线性渐变的方向，top是从上到下、left是从左到右，如果定义成left top，那就是从左上角到右下角。第二个和第三个参数分别是起点颜色和终点颜色。你还可以在它们之间插入更多的参数，表示多种颜色的渐变。
eg：background: repeating-conic-gradient(deeppink015deg, yellowgreen030`deg);
conic-gradient(#f1462c` `0` `12.5%, #fba73e` `0` `25%, #e0fa4e` `0` `37.5%, #12dd7e` `0` `50%, #0a6e3f` `0` `62.5%, #fff` `0` `100%);
```

### css实现计数

    /* counter-reset:属性创建或重置一个或多个计数器 */
    /* counter-increment:属性递增一个或多个计数器
    content：与:before及:after伪元素配合使用，来插入生成内容 */
    .choose {
    counter-reset: fruit;
    }
    .choose input:checked {
    counter-increment: fruit;
    }
    .count::before {
    content: counter(fruit);
    }



body{}

 <div class="choose"><label><input type=":checked">香蕉</label></div>   多个选择

### 移动端惯性滑动：

### -webkit-overflow-scrolling:touch;

### 表单中有样式选择：

 <label for="question11" class="answer">
  <input type="radio" name="question1" id="question11" value="" class="val-error" data-required="question1">

    <span class="radio-span"><i class="circle"></i>AAA</span>
</label>
<label for="question12" class="answer">
   <input type="radio" name="question1" id="question12" value="" class="val-error" data-required="question1">
     <span class="radio-span">BBB</span>
</label>
css：
.form-container .sex-radio .raido-span {
    font-size: 1.6rem;
    color: #333;
}
.form-container .sex-radio input[type="radio"]:checked+.raido-span:before {
    color: #f2a809;
}

### 更改光标的颜色

input{
  caret-color:red;   /*改变光标颜色*/
  color: #000;
}


手机video 都可以在页面中播放，而不是全屏播放了。
<video src="test.mp4" webkit-playsinline="true"></video>


使用clearfix 清除浮动，解决父类高度崩塌。
.clearfix {
    zoom: 1;
}
.clearfix:after {
     visibility: hidden;
     display: block;
     font-size: 0;
     content: " ";
     clear: both;
     height: 0;
 }


 user-select 禁止用户选中文本
 div {
    user-select: none; /* Standard syntax */
}


使用CSS transforms 或者 animations时可能会有页面闪烁的bug
-webkit-backface-visibility: hidden;


-webkit-touch-callout 禁止长按链接与图片弹出菜单
-webkit-touch-callout: none;


transform-style: preserve-3d 让元素支持3d
div {
    transform: rotateY(60deg);
    transform-style: preserve-3d;
}


这个属性的存在决定你看到的元素是2d还是3d。一般设置在包裹元素的父类上。
.div-box {
    perspective: 400px; 
}


css实现不换行、自动换行、强制换行
//不换行
white-space:nowrap;
//自动换行
word-wrap: break-word; 
word-break: normal; 
//强制换行
word-break:break-all;


box-sizing 让元素的宽度、高度包含border和padding
{
    box-sizing: border-box;
}



css3 linear-gradient 线性渐变
默认开始在top, 也可以自定义方向。
div {
    linear-gradient(red, yellow)
}

background: linear-gradient(direction, color-stop1, color-stop2, ...);


CSS3 filter Property 图片过滤


    img {
    filter: grayscale(100%); //灰度
    filter: blur(5px); //模糊
    filter:brightness(200%); //高亮
    filter:saturate(8); //饱和
    filter:sepia(100%); //怀旧
    ...
    }
### 使用css创建三角形

div {
    border-bottom: 10px solid white;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    height: 0px; 
    width: 0px; 
}


clip属性，截取你想要显示的图片

img {
    position: absolute;
    clip: rect(0px,60px,200px,0px);
}


常见动画网站:
http://isux.tencent.com/css3/

### 有弹窗锁定背景：

```
方法一：
.lock-back{
height: 100%;
overflow: hidden;
}
// 弹出时
$('html, body').addClass('lock-back');
// 隐藏时
$('html, body').removeClass('lock-back');
方法二：
// 弹出时
$('body').css({
position: 'fixed',
top: -document.body.scrollTop + 'px'
});
// 隐藏式
var top = -document.body.style.top.replace('px');
$('body').css({
position: static
});
window.scrollTo(0, top);
```



用position:absolute/fixed;把一个按钮固定在页面的底部，在android系统中，当调用输入法时，该按钮会被顶起
解决办法：使用媒体查询@media screen and (max-width:400px){}当页面高度小于某一个值时，给元素一个top值

IOS系统调用第三方输入法时，系统无法监测到input的input、focus、change、blur事件
解决办法:计算input值的length的长度，判断input的值是否变化

使用url传参时，特殊字符无法识别？如"#"
解决办法: 传参时,使用encodeURIComponent(url)转义，解析url用
decodeURIComponent(url)



### flex三格布局

```
.box {
       display: flex;
       flex-wrap: wrap;
       width: 100%;
     }
     .box div {
        width: calc(100% / 3 - 2px);
        height: 100px;
        border: 1px solid black;
     }
```





















































