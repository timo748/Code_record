```
###设置 GOPATH的意义？
go语言工作目录，值是一个目录的路径

###map操作：
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

###创建切片四种方式：
 slice1 := make([]int32, 5, 8)
 slice2 := make([]int32, 9)
 slice3 := []int32{}
 slice4 := []int32{1, 2, 3, 4, 5}
 
 new 和 make 均是用于分配内存
 make 用来创建map、slice、channel
 new 用来创建值类型
 
 字符串基本操作：
 ###修改字符串
 要修改字符串，可先将其转换成 []rune 或 []byte，完成后再转换为 string
 s := "abcd"
 bs := []byte(s)
 bs[1] = 'B'
 println(string(bs))
 //aBcd
 
 ###替换字符串
 //trings.Replace("原字符串", "被替换的内容", "替换的内容", 替换次数)
 
 ###元素重复次数
 //countTime0 := strings.Count(str, "o")
 
 ###去掉空格
 strings.TrimSpace(str)
 
 ###去掉指定字符
 strings.Trim(str, "hi")
 
 ###转为小写
 strings.ToLower(str)
 
 ###连接字符串
 strings.Join(str, "++")
 
 ###分割字符串
 strings.Split(str, "o")
 
 
 
 
```



