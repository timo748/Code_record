```
#设置 GOPATH的意义？
go语言工作目录，值是一个目录的路径

#map操作：
创建：make(map[string]int)
获取元素：m[key]
key不存在是，获得value类型的初始值；
用value,ok :=m[key]判断是否存在key

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

#创建切片四种方式：
 slice1 := make([]int32, 5, 8)
 slice2 := make([]int32, 9)
 slice3 := []int32{}
 slice4 := []int32{1, 2, 3, 4, 5}
 
 #修改字符串
 要修改字符串，可先将其转换成 []rune 或 []byte，完成后再转换为 string
 s := "abcd"
 bs := []byte(s)
 bs[1] = 'B'
 println(string(bs))
 //aBcd
```



