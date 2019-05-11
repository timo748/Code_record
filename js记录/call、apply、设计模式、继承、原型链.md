### call、apply用法

```
1、间接调用函数，改变this的值；
2、劫持其他对象的方法；
var foo = {
  name:"张三",
  logName:function(){
    console.log(this.name);
  }
}
var bar={
  name:"李四"
};
foo.logName.call(bar);//李四
实质是call改变了foo的this指向为bar,并调用该函数

3、两个函数实现继承
function Animal(name){   
  this.name = name;   
  this.showName = function(){   
    console.log(this.name);   
  }   
}   
function Cat(name){  
  Animal.call(this, name);  
}    
var cat = new Cat("Black Cat");   
cat.showName(); //Black Cat

4、为类数组添加数组方法push、pop
(function(){
  Array.prototype.push.call(arguments,'王五');
  console.log(arguments);//['张三','李四','王五']
})('张三','李四')

5、合并数组
let arr1=[1,2,3]; 
let arr2=[4,5,6]; 
Array.prototype.push.apply(arr1,arr2); //将arr2合并到了arr1中

6、求数组最大值
Math.max.apply(null,arr)

7、判断字符串类型
Object.prototype.toString.call({})


bind() 
bind以后代码重新绑定了func内部的this指向,不会调用方法
var name = '李四'
 var foo = {
   name: "张三",
   logName: function(age) {
   console.log(this.name, age);
   }
 }
 var fooNew = foo.logName;
 var fooNewBind = foo.logName.bind(foo);
 fooNew(10)//李四,10
 fooNewBind(11)//张三,11  因为bind改变了fooNewBind里面的this指向
```

### js常见设计模式

```
1、工厂模式
function CreatePerson(name,age,sex) {
    var obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.sex = sex;
    obj.sayName = function(){
        return this.name;
    }
    return obj;
}
var p1 = new CreatePerson("longen",'28','男');
var p2 = new CreatePerson("tugenhua",'27','女');
console.log(p1.name); // longen
console.log(p1.age);  // 28
console.log(p1.sex);  // 男
console.log(p1.sayName()); // longen

console.log(p2.name);  // tugenhua
console.log(p2.age);   // 27
console.log(p2.sex);   // 女
console.log(p2.sayName()); // tugenhua  

2、单例模式    
只能被实例化(构造函数给实例添加属性与方法)一次
var Singleton = function(name){
    this.name = name;
};
Singleton.prototype.getName = function(){
    return this.name;
}
// 获取实例对象
var getInstance = (function() {
    var instance = null;
    return function(name) {
        if(!instance) {//相当于一个一次性阀门,只能实例化一次
            instance = new Singleton(name);
        }
        return instance;
    }
})();
// 测试单体模式的实例,所以a===b
var a = getInstance("aa");
var b = getInstance("bb");


var person = (function(){
    //定义一个变量，用来保存实例
    var instance = null;
    var name = 'pan';
    var age = 18;

    //初始化方法
    function init() {
        return{
            getName: function() { return name;},
            getAge: function() { return age;}
        }
    }
    return {
        getInstance: function() {
                if(!instance){
                    instance = init()
                }
                return instance
            }
    }
})();

//只在使用时获取实例
var p1 = person.getInstance();

3、沙箱模式
将一些函数放到自执行函数里面,但要用闭包暴露接口,用变量接收暴露的接口,再调用里面的值,否则无法使用里面的值
let sandboxModel=(function(){
    function sayName(){};
    function sayAge(){};
    return{
        sayName:sayName,
        sayAge:sayAge
    }
})()

4、订阅发布模式
  var shoeObj = {}; // 定义发布者
    shoeObj.list = []; // 缓存列表 存放订阅者回调函数

    // 增加订阅者
    shoeObj.listen = function(fn) {
        shoeObj.list.push(fn); // 订阅消息添加到缓存列表
    }

    // 发布消息
    shoeObj.trigger = function() {
            for (var i = 0, fn; fn = this.list[i++];) {
                fn.apply(this, arguments);//第一个参数只是改变fn的this,
            }
        }
     // 小红订阅如下消息
    shoeObj.listen(function(color, size) {
        console.log("颜色是：" + color);
        console.log("尺码是：" + size);
    });

    // 小花订阅如下消息
    shoeObj.listen(function(color, size) {
        console.log("再次打印颜色是：" + color);
        console.log("再次打印尺码是：" + size);
    });
    shoeObj.trigger("红色", 40);
    shoeObj.trigger("黑色", 42);  
```

### 原型链

```
创建实例的方法
1、字面量
let obj = {};
2、object构造函数创建
let obj = new object();
3、使用工厂模式创建对象
function createPerson(name){
 var o = new Object();
 o.name = name;
 };
 return o; 
}
var person1 = createPerson('张三');
4、使用构造函数创建对象
function Person(name){
 this.name = name;
}
var person1 = new Person('张三');
```

### 继承

```
1、原型链继承
// 定义一个动物类
function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃：' + food);
};

子类:
function Cat(){ 
}
Cat.prototype = new Animal();
Cat.prototype.name = 'cat';

//&emsp;Test Code
var cat = new Cat();
console.log(cat.name);//cat
console.log(cat.eat('fish'));//cat正在吃：fish  undefined
console.log(cat.sleep());//cat正在睡觉！ undefined
console.log(cat instanceof Animal); //true 
console.log(cat instanceof Cat); //true

2、构造继承
利用call来改变Cat中的this指向
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}

3、ES6继承
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}  
```

































