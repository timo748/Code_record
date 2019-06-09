### 轮播

```javascript
//模板
<div class="carousel_box">//最外层的元素
      <div class="carousel_one">//其中一个轮播图的所在元素
        <img :src="bgImg" alt="" class="carousel_one">//为图片设置样式
      </div>
      <div class="carousel_li_box">//切换按钮区域
        <div v-bind:class="{'carousel_li1': counter==index, 'carousel_li2': counter!=index}" v-for="(item,index) in carouselData"></div>//一个按钮
      </div>
    </div>

//数据

data() {
      return {
        bgImg:'../image/index/csdn.jpg',//当前背景图片
        carouselData:[{//轮播数据源
          name:'CSDN',
          url:'https://www.csdn.net',
          img: '../image/index/csdn.jpg',
        },{
          name:'GitHub',
          url:'https://github.com/',
          img:'../image/index/github.jpg',
        },{
          name:'GitChat',
          url:'http://gitbook.cn/',
          img:'../image/index/gitchat.png',
        }],
        counter:0//计数器
      }
    }
    
//逻辑
runCarousel:function () {//循环轮播
        var that=this;
        setInterval(function () {
          that.counter ++;
          var dataLen=that.carouselData.length;
          if(that.counter==dataLen){//判断如果计数器记录了一个周期之后重置为0
            that.counter=0
          }
          that.bgImg=that.carouselData[that.counter].img;//通过更改bgImg变量来实现图片的更改
        },2000)//每2000毫米执行一次
      },
      pageJump:function () {
        var url=this.carouselData[this.counter].url;
        window.location.href=url//外部链接的跳转（路由跳转的方法将在后面为大家讲解）
      },
      liBtn:function (index) {//小按钮的点击事件，index为渲染数据对应的下标
        this.counter=index;//将计数器的值设置为选中的下标
        this.bgImg=this.carouselData[this.counter].img;//将当前的图片地址设置为数据源中对应的图片
      }
    
```

