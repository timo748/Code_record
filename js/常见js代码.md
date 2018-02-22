/*************************************************************************************数组去重*******************************************************************************/

Array.prototype.unique = function unique() {

​    var obj = {};

​    for (var i = 0; i < this.length; i++) {

​        var current = this[i];

​        if (obj[current] === current) {

​            current = this[this.length - 1];

​            this.length--;

​            i--;

​            continue;

​        }

​        obj[current] = current

​    }

​    obj = null;

​    return this;

}

// es6数组去重

var arr = [10, 3, 4, 5, 6, 3, 4, 5, 6, 11, 14];

function fillter(arrth) {

​    return arrth.filter(function(ele, index, array) {

​        return arrth.indexOf(ele) === index

​    })

}

console.log(fillter(arr));