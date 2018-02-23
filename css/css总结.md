## css3过渡动画

元素动画过渡时间：transition-duration: 2s;

元素过渡等待时间：transition-delay：2s

元素过渡属性名称：transition-property：width;

元素过渡速度：transition-timing-function：ease-in;

## 动画

```
animation：动画名称，一个周期花费时间，运动曲线（默认ease），动画延迟（默认0），播放次数（默认1）infinite，是否反向播放动画（默认normal），是否暂停动画（默认running）
```

沿着x轴旋转度数：translate:rotoateX(180deg)；

移动位置距离：transform:translateX(100px)；

缩放倍数：transform:scaleX(0.5);

倾斜角度：transform: skew(10deg,10deg);

X轴3D旋转：transform:rotateX(180deg);

3D旋转：transform:rotate3d(10,10,10,90deg);

在动画显示之前，应用开始属性值：animation-fill-mode:backwards；

## 阴影

```
box-shadow: 水平阴影的位置 垂直阴影的位置 模糊距离 阴影的大小 阴影的颜色 阴影开始方向（默认是从里往外，设置inset就是从外往里）;
```

eg： box-shadow: 10px 10px 5px #888888;

## 倒影

```
-webkit-box-reflect:方向[ above-上 | below-下 | right-右 | left-左 ]，偏移量，遮罩图片
```

## 渐变

```
线性渐变：-moz-linear-gradient( [<point> || <angle>,]? <stop>, <stop> [, <stop>]* )
径向渐变：radial-gradient
圆锥渐变：background: conic-gradient(deeppink, yellowgreen);
```

**参数：**其共有三个参数，第一个参数表示线性渐变的方向，top是从上到下、left是从左到右，如果定义成left top，那就是从左上角到右下角。第二个和第三个参数分别是起点颜色和终点颜色。你还可以在它们之间插入更多的参数，表示多种颜色的渐变。

eg：background``: repeating-conic-gradient(deeppink ``0` `15``deg, yellowgreen ``0` `30``deg);`

conic-gradient(``#f1462c` `0` `12.5%``, ``#fba73e` `0` `25%``, ``#e0fa4e` `0` `37.5%``, ``#12dd7e` `0` `50%``, ``#0a6e3f` `0` `62.5%``, ``#fff` `0` `100%``);





















































