```go
//###设置 GOPATH的意义？
go语言工作目录，值是一个目录的路径

//###slice
创建slice方式：
直接声明：var slice []int
new：slice := *new([]int)
字面量：slice := []int{1,2,3,4,5}
make：slice := make([]int, 5, 10)
从切片或数组“截取”：slice := array[1:5] 或 slice := sourceSlice[1:5]

切片中使用了索引号，直接赋值，这样，其他未注明的元素则默认 0 值
eg：	s1 := []int{0, 1, 2, 3, 8: 100}
    fmt.Println(s1, len(s1), cap(s1))
    
切片追加容量示例：
var s1 = []int{1,2,3,4,5}
 fmt.Println(s1, len(s1), cap(s1))
 // 对满容的切片进行追加会分离底层数组
 var s2 = append(s1, 6)
 fmt.Println(s1, len(s1), cap(s1))
 fmt.Println(s2, len(s2), cap(s2))
 // 对非满容的切片进行追加会共享底层数组
 var s3 = append(s2, 7)
 fmt.Println(s2, len(s2), cap(s2))
 fmt.Println(s3, len(s3), cap(s3))
 
•切片是对底层数组的一个抽象，描述了它的一个片段
•切片实际上是一个结构体，它有三个字段：长度，容量，底层数据的地址
•多个切片可能共享同一个底层数组，这种情况下，对其中一个切片或者底层数组的更改，会影响到其他切片。
•append 函数会在切片容量不够的情况下，调用 growslice 函数获取所需要的内存，这称为扩容，扩容会改变元素原来的位置。
•扩容策略并不是简单的扩为原切片容量的 2 倍或 1.25 倍，还有内存对齐的操作。扩容后的容量 >= 原容量的 2 倍或 1.25 倍。
•直接用切片作为函数参数时，可以改变切片的元素，不能改变切片本身；想要改变切片本身，可以将改变后的切片返回，函数调用者接收改变后的切片或者将切片指针作为函数参数。



//###map操作：
var map变量名 map[key] value
其中：key为键类型，value为值类型
创建：make(map[string]int)

//创建
m := map[string]string{"key0": "value0", "key1": "value1"}
fmt.Printf("map m : %v\n", m)
//map插入
m["key2"] = "value2"
fmt.Printf("inserted map m : %v\n", m)
//map修改
m["key0"] = "hello world!"
fmt.Printf("updated map m : %v\n", m)
//map查找
val, ok := m["key0"]
if ok {
	fmt.Printf("map's key0 is %v\n", val)
}
// 判断 key 是否存在。
if val, ok = m["key"]; !ok {
	fmt.Println("map's key is not existence")
}

// 删除，如果 key 不存在，不会出错。
if val, ok = m["key1"]; ok {
	delete(m, "key1")
	fmt.Printf("deleted key1 map m : %v\n", m)
}

eg：
if _, ok := map[key]; ok {
//存在
}

demo := map[string]bool{
    "a": false,
}
 
 //错误，a存在，但是返回false
 fmt.Println(demo["a"])
 
 //正确判断方法
 _, ok := demo["a"]
 fmt.Println(ok)
m :=map[string]string {}
m1:=make(map[string]int)   //map[]

//###创建切片四种方式：
 slice1 := make([]int32, 5, 8)
 slice2 := make([]int32, 9)
 slice3 := []int32{}
 slice4 := []int32{1, 2, 3, 4, 5}
 
 new 和 make 均是用于分配内存
 make 用来创建map、slice、channel
 new 用来创建值类型
 
// 字符串基本操作：
// ###修改字符串
 要修改字符串，可先将其转换成 []rune 或 []byte，完成后再转换为 string
 s := "abcd"
 bs := []byte(s)
 bs[1] = 'B'
 println(string(bs))
 //aBcd
 
 //###替换字符串
 //trings.Replace("原字符串", "被替换的内容", "替换的内容", 替换次数)
 
// ###元素重复次数
 //countTime0 := strings.Count(str, "o")
 
// ###去掉空格
 strings.TrimSpace(str)
 
 //###去掉指定字符
 strings.Trim(str, "hi")
 
 //###转为小写
 strings.ToLower(str)
 
 //###连接字符串
 strings.Join(str, "++")
 
 //###分割字符串
 strings.Split(str, "o")
 
 
//###指针
默认值 nil，没有 NULL 常量。
操作符 "&" （取地址符） 取变量地址，"*" （取值符）透过指针访问目标对象。（没有*表示存储地址）
不支持指针运算，不支持 "->" 运算符，直接用 "." 访问目标成员。


//###字典操作
创建
 var fruits = map[string]int {
     "apple": 2,
     "banana": 5,
     "orange": 8,
  }
 // 读取元素
 var score = fruits["banana"]
    fmt.Println(score)

 // 增加或修改元素
    fruits["pear"] = 3
    fmt.Println(fruits)

 // 删除元素
    delete(fruits, "pear")
    fmt.Println(fruits)
}

 
 
```



