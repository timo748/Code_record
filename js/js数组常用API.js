//数组方法说明：分为对象继承方法、数组转换方法、栈和队列方法、数组排序方法、数组拼接方法、
//创建子数组方法、数组删改方法、数组位置方法、数组归并方法和数组迭代方法共10类

Array.from([1, 2, 3], x => x *= 2) //与map方法类似
    // [2, 4, 6]

//将字符串组变成数组
Array.of(1) // [1]
Array.of = function() {
        return Array.prototype.slice.call(arguments);
    }
    [1, 2, 3].fill(4) // [4, 4, 4]
    [1, 2, 3].fill(4, 1, 2) // [1, 4, 3]

//过滤符合函数方法
Array.fillter
filter() //方法使用指定的函数测试所有元素， 并创建一个包含所有通过测试的元素的新数组。[1, 2, 3, 4, 5, 6].filter((x) => x % 2 === 0)
    // [2, 4, 6]


Array.find //如果数组中某个元素满足测试条件， find() 方法就会返回那个元素的值， 如果没有满足条件的元素， 则返回 undefined。
var inventory = [
    { name: 'apples', quantity: 2 },
    { name: 'bananas', quantity: 0 },
    { name: 'cherries', quantity: 5 }
];

function findCherries(fruit) {
    return fruit.name === 'cherries';
}
console.log(inventory.find(findCherries)); // { name: 'cherries', quantity: 5 }


Array.findIndex()
findIndex() //方法用来查找数组中某指定元素的索引, 如果找不到指定的元素, 则返回 - 1


//与for循环类似
//Array.forEach()
var users = [{
        lastName: 'Li',
        firstName: 'Lei'
    },
    {
        lastName: 'Han',
        firstName: 'Meimei'
    }
];
users.forEach(function(user, index, arr) {
    console.log((user.fullName = user.lastName + user.firstName) + index);
});


//Array.map
map() //方法返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组。
var data = [1, 2, 3, 4];
var arr = data.map(function(x) {
    return x * x;
});
alert(arr); // 1, 4, 9, 16


var flattened = [
    [0, 1],
    [2, 3],
    [4, 5]
].reduce(function(a, b) {
    return a.concat(b);
});
// flattened is [0, 1, 2, 3, 4, 5]

//Arrar.reverse()
reverse() //方法颠倒数组中元素的位置。 第一个元素会成为最后一个， 最后一个会成为第一个。


Array.slice()
slice() //方法会浅复制（ shallow copy） 数组的一部分到一个新的数组， 并返回这个新数组。返回数组的起始和结束位置的项——但不包括结束位置的项

Array.splice()
splice() //方法用新元素替换旧元素， 以此修改数组的内容。
    //1、删除任意数量的项   2个参数   要删除第一项的位置和删除的项数
    //2、指定位置插入任意数量的项  3个参数  起始位置、0（要删除的项数）、要插入的项   eg（splice（2,0 ,a,b）当前数组的的位置2插入a、b）
Array.from([1, 2, 3], x => x *= 2) //与map方法类似
    // [2, 4, 6]

//将字符串组变成数组
Array.of(1) // [1]
Array.of = function() {
        return Array.prototype.slice.call(arguments);
    }
    [1, 2, 3].fill(4) // [4, 4, 4]
    [1, 2, 3].fill(4, 1, 2) // [1, 4, 3]

//过滤符合函数方法
Array.fillter
filter() //方法使用指定的函数测试所有元素， 并创建一个包含所有通过测试的元素的新数组。[1, 2, 3, 4, 5, 6].filter((x) => x % 2 === 0)
    // [2, 4, 6]


Array.find //如果数组中某个元素满足测试条件， find() 方法就会返回那个元素的值， 如果没有满足条件的元素， 则返回 undefined。
var inventory = [
    { name: 'apples', quantity: 2 },
    { name: 'bananas', quantity: 0 },
    { name: 'cherries', quantity: 5 }
];

function findCherries(fruit) {
    return fruit.name === 'cherries';
}
console.log(inventory.find(findCherries)); // { name: 'cherries', quantity: 5 }


Array.findIndex()
findIndex() //方法用来查找数组中某指定元素的索引, 如果找不到指定的元素, 则返回 - 1


//与for循环类似
//Array.forEach()
var users = [{
        lastName: 'Li',
        firstName: 'Lei'
    },
    {
        lastName: 'Han',
        firstName: 'Meimei'
    }
];
users.forEach(function(user, index, arr) {
    console.log((user.fullName = user.lastName + user.firstName) + index);
});


//Array.map
map() //方法返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组。
var data = [1, 2, 3, 4];
var arr = data.map(function(x) {
    return x * x;
});
alert(arr); // 1, 4, 9, 16

//Array.reduce()
reduce() //方法接收一个函数作为累加器（ accumulator）， 数组中的每个值（ 从左到右） 开始合并， 最终为一个值。
    //化简函数接受四个参数，分别是：
    //【1】初始变量，默认为数组的第一个元素值。函数第一次执行后的返回值作为函数第二次执行的初始变量，依次类推
    //【2】当前变量，如果指定了第二个参数，则该变量为数组的第一个元素的值，否则，为第二个元素的值
    //【3】当前变量对应的元素在数组中的索引(从0开始)
    //【4】原数组对象

var flattened = [
    [0, 1],
    [2, 3],
    [4, 5]
].reduce(function(a, b) {
    return a.concat(b);
});
// flattened is [0, 1, 2, 3, 4, 5]

//Arrar.reverse()
reverse() //方法颠倒数组中元素的位置。 第一个元素会成为最后一个， 最后一个会成为第一个。


Array.slice()
slice() //方法会浅复制（ shallow copy） 数组的一部分到一个新的数组， 并返回这个新数组。返回数组的起始和结束位置的项——但不包括结束位置的项

Array.splice()
splice() //方法用新元素替换旧元素， 以此修改数组的内容。
    //1、删除任意数量的项   2个参数   要删除第一项的位置和删除的项数
    //2、指定位置插入任意数量的项  3个参数  起始位置、0（要删除的项数）、要插入的项   eg（splice（2,0 ,a,b）当前数组的的位置2插入a、b）
    //3、替换 向指定位置插入任意数量的项  3个参数  起始位置、要删除的项数、要插入的项   eg(splice(2,1,a,b)删除当前位置2的项，再从2的位置插入a，b)


//【filter()】
// filter()方法对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组。该方法常用于查询符合条件的所有数组项
[1, 2, 3, 4, 5].filter(function(elem) {
    return (elem > 3);
}); // [4, 5]



//使用sort()方法创建一个随机数组
function compare() {
    return Math.random() - 0.5;
}
var array = [1, 2, 3, 4, 5];
console.log(array.sort(compare)); //[2,1,5,4,3]



substring()
    //substring() 方法用于提取字符串中介于两个指定下标之间的字符。
    //第一个参数提取的字符在字符串的位置
    //第二个参数比要提取的子串的最后一个字符在字符串的位置多1
var str = "Hello world!"
document.write(str.substring(3, 7)) //lo w

split()
    //将一个字符串分割成字符串数组
    //第一个参数是字符创或正则表达式
    //第二个参数是指定返回的数组的最大长度

replace()
    //在字符创中用一些字符串替代另一些字符串
    //第一个参数规定字符串或要替换的的模式
    //第二个参数要替换字符串的值


    //for……in
    // index索引为字符串数字 ，不能直接进行几何运算；
    //遍历顺序不是实际数组的顺序；
    //for in 枚举所有的属性，包括原型
    //for in适合遍历对象，不要去遍历数组

    ///for……of
    //遍历数组元素值