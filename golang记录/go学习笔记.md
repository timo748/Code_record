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



### 字符串常见用法

```go
func main() {
    p("Contains: ", s.Contains("test", "es")) //是否包含 true
    p("Count: ", s.Count("test", "t")) //字符串出现字符的次数 2
    p("HasPrefix: ", s.HasPrefix("test", "te")) //判断字符串首部 true
    p("HasSuffix: ", s.HasSuffix("test", "st")) //判断字符串结尾 true
    p("Index: ", s.Index("test", "e")) //查询字符串位置 1
    p("Join: ", s.Join([]string{"a", "b"}, "-"))//字符串数组 连接 a-b
    p("Repeat: ", s.Repeat("a", 5)) //重复一个字符串 aaaaa
    p("Replace: ", s.Replace("foo", "o", "0", -1)) //字符串替换 指定起始位置为小于0,则全部替换 f00
    p("Replace: ", s.Replace("foo", "o", "0", 1)) //字符串替换 指定起始位置1 f0o
    p("Split: ", s.Split("a-b-c-d-e", "-")) //字符串切割 [a b c d e]
    p("ToLower: ", s.ToLower("TEST")) //字符串 小写转换 test
    p("ToUpper: ", s.ToUpper("test")) //字符串 大写转换 TEST
    p()
    p("Len: ", len("hello")) //字符串长度
    p("Char:", "hello"[1]) //标取字符串中的字符，类型为byte
}



//详细用法
package main

import (
    "fmt"
    "strings"
    //"unicode/utf8"
)

func main() {
    fmt.Println("查找子串是否在指定的字符串中")
    fmt.Println(" Contains 函数的用法")
    fmt.Println(strings.Contains("seafood", "foo")) //true
    fmt.Println(strings.Contains("seafood", "bar")) //false
    fmt.Println(strings.Contains("seafood", "")) //true
    fmt.Println(strings.Contains("", "")) //true 这里要特别注意
    fmt.Println(strings.Contains("我是中国人", "我")) //true

    fmt.Println("")
    fmt.Println(" ContainsAny 函数的用法")
    fmt.Println(strings.ContainsAny("team", "i")) // false
    fmt.Println(strings.ContainsAny("failure", "u & i")) // true
    fmt.Println(strings.ContainsAny("foo", "")) // false
    fmt.Println(strings.ContainsAny("", "")) // false

    fmt.Println("")
    fmt.Println(" ContainsRune 函数的用法")
    fmt.Println(strings.ContainsRune("我是中国", '我')) // true 注意第二个参数，用的是字符

    fmt.Println("")
    fmt.Println(" Count 函数的用法")
    fmt.Println(strings.Count("cheese", "e")) // 3
    fmt.Println(strings.Count("five", "")) // before & after each rune result: 5 , 源码中有实现

    fmt.Println("")
    fmt.Println(" EqualFold 函数的用法")
    fmt.Println(strings.EqualFold("Go", "go")) //大小写忽略

    fmt.Println("")
    fmt.Println(" Fields 函数的用法")
    fmt.Println("Fields are: %q", strings.Fields(" foo bar baz ")) //["foo" "bar" "baz"] 返回一个列表

    //相当于用函数做为参数，支持匿名函数
    for _, record := range []string{" aaa*1892*122", "aaataat", "124|939|22"} {
        fmt.Println(strings.FieldsFunc(record, func(ch rune) bool {
                switch {
                case ch > '5':
                    return true
                }
                return false
            }))
    }

    fmt.Println("")
    fmt.Println(" HasPrefix 函数的用法")
    fmt.Println(strings.HasPrefix("NLT_abc", "NLT")) //前缀是以NLT开头的

    fmt.Println("")
    fmt.Println(" HasSuffix 函数的用法")
    fmt.Println(strings.HasSuffix("NLT_abc", "abc")) //后缀是以NLT开头的

    fmt.Println("")
    fmt.Println(" Index 函数的用法")
    fmt.Println(strings.Index("NLT_abc", "abc")) // 返回第一个匹配字符的位置，这里是4
    fmt.Println(strings.Index("NLT_abc", "aaa")) // 在存在返回 -1
    fmt.Println(strings.Index("我是中国人", "中")) // 在存在返回 6

    fmt.Println("")
    fmt.Println(" IndexAny 函数的用法")
    fmt.Println(strings.IndexAny("我是中国人", "中")) // 在存在返回 6
    fmt.Println(strings.IndexAny("我是中国人", "和")) // 在存在返回 -1

    fmt.Println("")
    fmt.Println(" Index 函数的用法")
    fmt.Println(strings.IndexRune("NLT_abc", 'b')) // 返回第一个匹配字符的位置，这里是4
    fmt.Println(strings.IndexRune("NLT_abc", 's')) // 在存在返回 -1
    fmt.Println(strings.IndexRune("我是中国人", '中')) // 在存在返回 6

    fmt.Println("")
    fmt.Println(" Join 函数的用法")
    s := []string{"foo", "bar", "baz"}
    fmt.Println(strings.Join(s, ", ")) // 返回字符串：foo, bar, baz

    fmt.Println("")
    fmt.Println(" LastIndex 函数的用法")
    fmt.Println(strings.LastIndex("go gopher", "go")) // 3

    fmt.Println("")
    fmt.Println(" LastIndexAny 函数的用法")
    fmt.Println(strings.LastIndexAny("go gopher", "go")) // 4
    fmt.Println(strings.LastIndexAny("我是中国人", "中")) // 6

    fmt.Println("")
    fmt.Println(" Map 函数的用法")
    rot13 := func(r rune) rune {
        switch {
        case r >= 'A' && r <= 'Z':
            return 'A' + (r-'A'+13)%26
        case r >= 'a' && r <= 'z':
            return 'a' + (r-'a'+13)%26
        }
        return r
    }
    fmt.Println(strings.Map(rot13, "'Twas brillig and the slithy gopher..."))

    fmt.Println("")
    fmt.Println(" Repeat 函数的用法")
    fmt.Println("ba" + strings.Repeat("na", 2)) //banana

    fmt.Println("")
    fmt.Println(" Replace 函数的用法")
    fmt.Println(strings.Replace("oink oink oink", "k", "ky", 2))
    fmt.Println(strings.Replace("oink oink oink", "oink", "moo", -1))

    fmt.Println("")
    fmt.Println(" Split 函数的用法")
    fmt.Printf("%qn", strings.Split("a,b,c", ","))
    fmt.Printf("%qn", strings.Split("a man a plan a canal panama", "a "))
    fmt.Printf("%qn", strings.Split(" xyz ", ""))
    fmt.Printf("%qn", strings.Split("", "Bernardo O'Higgins"))

    fmt.Println("")
    fmt.Println(" SplitAfter 函数的用法")
    fmt.Printf("%qn", strings.SplitAfter("/home/m_ta/src", "/")) //["/" "home/" "m_ta/" "src"]

    fmt.Println("")
    fmt.Println(" SplitAfterN 函数的用法")
    fmt.Printf("%qn", strings.SplitAfterN("/home/m_ta/src", "/", 2)) //["/" "home/m_ta/src"]
    fmt.Printf("%qn", strings.SplitAfterN("#home#m_ta#src", "#", -1)) //["/" "home/" "m_ta/" "src"]

    fmt.Println("")
    fmt.Println(" SplitN 函数的用法")
    fmt.Printf("%qn", strings.SplitN("/home/m_ta/src", "/", 1))

    fmt.Printf("%qn", strings.SplitN("/home/m_ta/src", "/", 2)) //["/" "home/" "m_ta/" "src"]
    fmt.Printf("%qn", strings.SplitN("/home/m_ta/src", "/", -1)) //["" "home" "m_ta" "src"]
    fmt.Printf("%qn", strings.SplitN("home,m_ta,src", ",", 2)) //["/" "home/" "m_ta/" "src"]

    fmt.Printf("%qn", strings.SplitN("#home#m_ta#src", "#", -1)) //["/" "home/" "m_ta/" "src"]

    fmt.Println("")
    fmt.Println(" Title 函数的用法") //这个函数，还真不知道有什么用
    fmt.Println(strings.Title("her royal highness"))

    fmt.Println("")
    fmt.Println(" ToLower 函数的用法")
    fmt.Println(strings.ToLower("Gopher")) //gopher

    fmt.Println("")
    fmt.Println(" ToLowerSpecial 函数的用法")

    fmt.Println("")
    fmt.Println(" ToTitle 函数的用法")
    fmt.Println(strings.ToTitle("loud noises"))
    fmt.Println(strings.ToTitle("loud 中国"))

    fmt.Println("")
    fmt.Println(" Replace 函数的用法")
    fmt.Println(strings.Replace("ABAACEDF", "A", "a", 2)) // aBaACEDF
    //第四个参数小于0，表示所有的都替换， 可以看下golang的文档
    fmt.Println(strings.Replace("ABAACEDF", "A", "a", -1)) // aBaaCEDF

    fmt.Println("")
    fmt.Println(" ToUpper 函数的用法")
    fmt.Println(strings.ToUpper("Gopher")) //GOPHER

    fmt.Println("")
    fmt.Println(" Trim 函数的用法")
    fmt.Printf("[%q]", strings.Trim(" !!! Achtung !!! ", "! ")) // ["Achtung"]

    fmt.Println("")
    fmt.Println(" TrimLeft 函数的用法")
    fmt.Printf("[%q]", strings.TrimLeft(" !!! Achtung !!! ", "! ")) // ["Achtung !!! "]

    fmt.Println("")
    fmt.Println(" TrimSpace 函数的用法")
    fmt.Println(strings.TrimSpace(" tn a lone gopher ntrn")) // a lone gopher

}
```





### go方法调用

```go
type A struct{
  a int
}

func (this A) test(){
  fmt.print("this.a")
}

var t A
t.test()
```



### json序列化与反序列化

```go
main{
  	res:=make(map[string]interface{})
	res["code"] =200
	res["msg"]="success"
	res["data"]= map[string]interface{}{
		"username":"tom",
		"age":"30",
		"hobby":[]string{"读书","爬山"},
	}
	fmt.Println("map data:",res)
	// 序列化
	jsons,errs := json.Marshal(res)
	if errs != nil {
		fmt.Println(errs)
	} 
	fmt.Println(string(jsons))

	// 反序列化
	res2 :=make(map[string]interface{})
	errs = json.Unmarshal([]byte(jsons),&res2)
	if errs != nil {
		fmt.Println(errs)
	}
	fmt.Println(res2)
}
```



### chan使用实例

```go
main{
  fmt.Println("3333")
	ch := make(chan string,3)
	go pru(ch)
	go cut(ch)
	time.Sleep(time.Second*1)
	fmt.Println("44444")
}

func pru(ch chan string){
	fmt.Println("111111")
	ch <-"a"
	ch <-"b"
	ch <-"c"
	ch <-"d"
	fmt.Println("2222")
}

func cut(ch chan string){
	for{
		msg := <-ch
		fmt.Println(msg)
	}
}
```

## 指针说明

```
什么时候用”*“？
在定义指针类型时用

什么时候用”&“？
在需要把实体转化为指针时 （ 从来不在定义时用”&“）

为什么要把实体转化为指针?
如果函数的参数和返回值是指针，而你现有的是实体（Dog{}), 那么你要先转换才能传递参数或返回（&Dog{}）

在访问指针和实体的成员时有区别吗？
没有，不论Dog{} 是实体还是指针，都可以用"Dog.Leg". 这是Go出众的设计，省去许多麻烦。
为什么要把函数的参数和返回值定义为指针？
为了能在函数中修改参数的值
当返回值为空时，指针可以设为nil，很容易。实体要设为空值（结构体的空值），很麻烦。
Go规定，当在结构体（struct）中定义方法（method）时， 每个方法有一个接受器（receiver）。对于一个结构的所有方法，要么接受器全是指针类型，要么接受器全是实体类型。所以一般的原则是都定义成指针类型

除了定义时用"*", 还什么时候用它？
当你已有指针类型，但需要返回实体类型，这时需要把指针转化为实体，要用”*“,相当于”&“的反操作。

```

















