```go
//用chan实现斐波那契数列
import "fmt"
func fibonacci(c, quit chan int) {
	x, y := 0, 1
	for {
		select {
		case c <- x:
			x, y = y, x+y
		case <-quit:
			fmt.Println("quit")
			return
		}
	}
}
func main() {
	c := make(chan int)
	quit := make(chan int)
	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(<-c)
		}
		quit <- 0
	}()
	fibonacci(c, quit)
}



//字符串的简单映射
func main() {
	rot13 := func(r rune) rune {
		switch {
		case r >= 'A' && r <= 'Z':
			return 'A' + (r-'A'+13)%26
		case r >= 'a' && r <= 'z':
			return 'a' + (r-'a'+13)%26
		}
		return r
	}
	fmt.Println(strings.Map(rot13, "'hello gopher..."))
}


//利用chan做延时(超时)
import "time"
import "fmt"
func main() {
    c1 := make(chan string, 1)
    go func() {
        time.Sleep(time.Second * 2)
        c1 <- "result 1"
    }()
    select {
    case res := <-c1:
        fmt.Println(res)
    case <-time.After(time.Second * 1):
        fmt.Println("timeout 1")
    }
}


//利用闭包输出递增整数的平方
func squares() func() int {
    var x int
    return func() int {
        x++
        return x * x
    }
}
func main() {
    f := squares()
    fmt.Println(f()) // "1"
    fmt.Println(f()) // "4"
    fmt.Println(f()) // "9"
    fmt.Println(f()) // "16"
}


//统计整数包含多少个值为1的2进制数
package main

// pc[i] is the population count of i.
var pc [256]byte

func init() {
	for i := range pc {
		pc[i] = pc[i/2] + byte(i&1)
	}

}

// PopCount returns the population count (number of set bits) of x.
func PopCount(x uint64) int {
	return int(pc[byte(x>>(0*8))] +
		pc[byte(x>>(1*8))] +
		pc[byte(x>>(2*8))] +
		pc[byte(x>>(3*8))] +
		pc[byte(x>>(4*8))] +
		pc[byte(x>>(5*8))] +
		pc[byte(x>>(6*8))] +
		pc[byte(x>>(7*8))])
}

func main() {
	println(PopCount(9))
}


//常量生成器
const (
    _ = 1 << (10 * iota)
    KiB // 1024
    MiB // 1048576
    GiB // 1073741824
    TiB // 1099511627776             (exceeds 1 << 32)
    PiB // 1125899906842624
    EiB // 1152921504606846976
    ZiB // 1180591620717411303424    (exceeds 1 << 64)
    YiB // 1208925819614629174706176
)


//二叉树和利用二叉树排序
package main

import "fmt"

type tree struct {
	value       int
	left, right *tree
}

func Sort(values []int) {
	var root *tree
	for _, v := range values {
		root = add(root, v)
	}
	appendValues(values[:0], root)
}

func appendValues(values []int, t *tree) []int {
	if t != nil {
		values = appendValues(values, t.left)
		values = append(values, t.value)
		values = appendValues(values, t.right)
	}
	return values
}

func add(t *tree, value int) *tree {
	if t == nil {
		t = new(tree)
		t.value = value
		return t
	}
	if value < t.value {
		t.left = add(t.left, value)
	} else {
		t.right = add(t.right, value)
	}
	return t
}

func main() {
	data := []int{1, 5, 6, 3, 2, 7, 8, 9}
	Sort(data)
	fmt.Println(data)
}


//通过方法表达式来操作选用哪个方法
type Point struct{ X, Y float64 }

func (p Point) Add(q Point) Point { return Point{p.X + q.X, p.Y + q.Y} }
func (p Point) Sub(q Point) Point { return Point{p.X - q.X, p.Y - q.Y} }

type Path []Point

func (path Path) TranslateBy(offset Point, add bool) {
    var op func(p, q Point) Point
    if add {
        op = Point.Add
    } else {
        op = Point.Sub
    }
    for i := range path {
        // Call either path[i].Add(offset) or path[i].Sub(offset).
        path[i] = op(path[i], offset)
    }
}


//interface的类型断言
func sqlQuote(x interface{}) string {
    switch x := x.(type) {
    case nil:
        return "NULL"
    case int, uint:
        return fmt.Sprintf("%d", x) // x has type interface{} here.
    case bool:
        if x {
            return "TRUE"
        }
        return "FALSE"
    case string:
        return sqlQuoteString(x) // (not shown)
    default:
        panic(fmt.Sprintf("unexpected type %T: %v", x, x))
    }
}


//ch这个channel的buffer大小是1，所以会交替的为空或为满，所以只有一个case可以进行下去，无论i是奇数或者偶数，它都会打印0 2 4 6 8。
ch := make(chan int, 1)
for i := 0; i < 10; i++ {
    select {
    case x := <-ch:
        fmt.Println(x) // "0" "2" "4" "6" "8"
    case ch <- i:
    }
}


//用const 表示字符格式
const template = `Warning: you are using %d bytes of  storage,%d%% of your quota.`


//反射
func main() {
  hl := hello
  fv := reflect.ValueOf(hl)
  fmt.Println("fv is reflect.Func ?",fv.Kind() == reflect.Func)
  fv.Call(nil)
}


//变长参数
func (engine *Engine) Use(middleware ...HandlerFunc) IRoutes {
	engine.RouterGroup.Use(middleware...)
	engine.rebuild404Handlers()
	engine.rebuild405Handlers()
	return engine
}


//心跳包的简单实现
func worker(start chan bool) {
        heartbeat := time.Tick(30 * time.Second)
        for {
                select {
                     // … do some stuff
                case <- heartbeat:
                    //… do heartbeat stuff
                }
        }
}


//删除某个slice的某个元素
for i := range s {
    if equal(s[i], element) {
    	s = append(s[:i], s[i+1:]...)
    }
}


//把数组转slice
func main() { 
    a := [3]int{1, 2, 3} 
    b := a[:] 
    fmt.Println(b) 
} 
func main(){
    a := [3]int{1, 2, 3}
    b := (&a)[:]
}


//数据转发
func forward(src net.Conn, network, address string, timeout time.Duration) {
	defer src.Close()
	dst, err := net.DialTimeout(network, address, timeout)
	if err != nil {
		log.Printf("dial err: %s", err)
		return
	}
	defer dst.Close()

	cpErr := make(chan error)

	go cp(cpErr, src, dst)
	go cp(cpErr, dst, src)

	select {
	case err = <-cpErr:
		if err != nil {
			log.Printf("copy err: %v", err)
		}
	}

	log.Printf("disconnect: %s", src.RemoteAddr())
}

func cp(c chan error, w io.Writer, r io.Reader) {
	_, err := io.Copy(w, r)
	c <- err
	fmt.Println("cp end")
}


//获取当前目录和父级目录
func substr(s string, pos, length int) string {
	runes := []rune(s)
	l := pos + length
	if l > len(runes) {
		l = len(runes)
	}
	return string(runes[pos:l])
}

func getParentDirectory(dirctory string) string {
	return substr(dirctory, 0, strings.LastIndex(dirctory, "/"))
}

func getCurrentDirectory() string {
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		log.Fatal(err)
	}
	return strings.Replace(dir, "\\", "/", -1)
}


//保存当前程序的pid
func savePid() {
	pidFilename := ROOT + "/pid/" +filepath.Base(os.Args[0]) + ".pid"
	pid := os.Getpid()

	ioutil.WriteFile(pidFilename, []byte(strconv.Itoa(pid)), 0755)
}


//利用struct{}当channel
ch:=make(chan struct{})
ch <- struct{}{}
<-ch


//break加label
OuterLoop:
	for i = 0; i < n; i++ {
		for j = 0; j < m; j++ {
			switch a[i][j] {
			case nil:
				state = Error
				break OuterLoop
			case item:
				state = Found
				break OuterLoop
			}
		}
	}


//Go语言实现http共享文件服务器
package main  
    import (  
            "net/http"  
            "os"  
            "strings"  
    )  
    func shareDir(dirName string,port string,ch chan bool){  
            h := http.FileServer(http.Dir(dirName))  
            err := http.ListenAndServe(":"+port,h)  
            if err != nil {  
                    println("ListenAndServe : ",err.Error())  
                    ch <- false  
            }  
    }  
    func main(){  
            ch := make(chanbool)  
            port := "8000"//Default port  
            iflen(os.Args)>1 {  
                    port = strings.Join(os.Args[1:2],"")  
            }  
            go shareDir(".",port,ch)  
            println("Listening on port ",port,"...")  
            bresult := <-ch  
            iffalse == bresult {  
                    println("Listening on port ",port," failed")  
            }  
    }  


//简单的TCP代理服务器
package main

import (
	"fmt"
	"io"
	"net"
	"os"
)

func main() {
	if len(os.Args) != 3 {
		fatal("usage: netfwd localIp:localPort remoteIp:remotePort")
	}
	localAddr := os.Args[1]
	remoteAddr := os.Args[2]
	local, err := net.Listen("tcp", localAddr)
	if local == nil {
		fatal("cannot listen: %v", err)
	}
	for {
		conn, err := local.Accept()
		if conn == nil {
			fatal("accept failed: %v", err)
		}
		go forward(conn, remoteAddr)
	}
}

func forward(local net.Conn, remoteAddr string) {
	remote, err := net.Dial("tcp", remoteAddr)
	if remote == nil {
		fmt.Fprintf(os.Stderr, "remote dial failed: %v\n", err)
		return
	}
	go io.Copy(local, remote)
	go io.Copy(remote, local)
}

func fatal(s string, a ...interface{}) {
	fmt.Fprintf(os.Stderr, "netfwd: %s\n", fmt.Sprintf(s, a))
	os.Exit(2)
}


//选择排序是不稳定的。算法复杂度是O(n ^2 )。
package main
import (    
    "fmt"
)

type SortInterface interface {
    sort()
}
type Sortor struct {
    name string
}

func main() {
    arry := []int{6, 1, 3, 5, 8, 4, 2, 0, 9, 7}
    learnsort := Sortor{name: "选择排序--从小到大--不稳定--n*n---"}
    learnsort.sort(arry)
    fmt.Println(learnsort.name, arry)
}

func (sorter Sortor) sort(arry []int) {
    arrylength := len(arry)    for i := 0; i < arrylength; i++ {
        min := i        for j := i + 1; j < arrylength; j++ {            if arry[j] < arry[min] {
                min = j
            }
        }
        t := arry[i]
        arry[i] = arry[min]
        arry[min] = t

    }
}

// http://blog.csdn.net/guoer9973/article/details/51924715




//检查文件或目录是否存在
/ 如果由 filename 指定的文件或目录存在则返回 true，否则返回 false
func fileExist(filename string) bool {
    _, err := os.Stat(filename)
    return err == nil || os.IsExist(err)
}


//重定向golang的panic信息
package main

import (
    "log"
    "os"
    "syscall"
)

// redirectStderr to the file passed in
func redirectStderr(f *os.File) {
    err := syscall.Dup2(int(f.Fd()), int(os.Stderr.Fd()))
    if err != nil {
        log.Fatalf("Failed to redirect stderr to file: %v", err)
    }
}



import (
	"code.google.com/p/log4go"
	"os"
	"syscall"
)

var (
	kernel32         = syscall.MustLoadDLL("kernel32.dll")
	procSetStdHandle = kernel32.MustFindProc("SetStdHandle")
)

func SetStdHandle(stdhandle int32, handle syscall.Handle) error {
	r0, _, e1 := syscall.Syscall(procSetStdHandle.Addr(), 2, uintptr(stdhandle), uintptr(handle), 0)
	if r0 == 0 {
		if e1 != 0 {
			return error(e1)
		}
		return syscall.EINVAL
	}
	return nil
}

var f *os.File

func redirect_err() {
	var err error
	f, err = os.Create(`panic.txt`)
	if err != nil {
		log4go.Error("os.Create failed: %v", err)
	}
	err = SetStdHandle(syscall.STD_ERROR_HANDLE, syscall.Handle(f.Fd()))
	if err != nil {
		log4go.Error("SetStdHandle failed: %v", err)
	}
}


//go 执行命令并获取stderr
var stderr io.ReadCloser
    cmd := exec.Command("ping", 
        "localhost"
    )
    stderr, err = cmd.StderrPipe()
	if err != nil {
		glog.Errorln("stderr pipe error: ", err)
	}
	// start cmd
	err = cmd.Start()
	if err != nil {
		glog.Infoln("start cmd error: ", err)
		return err
	}

	glog.Infoln("start ", cmd.Args)
	if stderr != nil {
		reader := bufio.NewReader(stderr)
		go func() {
			for {
				line, err := reader.ReadString(byte('\n'))
				if err != nil || io.EOF == err {
					glog.Infoln("cmd end")
					stderr.Close()
					break
				}
				glog.Infoln("stderr: ", line)
			}
		}()
	}
	err:=cmd.Wait()
	if err!=nil {
	    return err
	}


//判断accept是不是临时错误
for {
    conn,err:=ln.Accept()
    if err, ok := err.(net.Error); ok && err.Temporary() {
        continue
    }
}


//快速遍历当前文件夹和文件
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	upperDirPattern := "./*"
	matches, err := filepath.Glob(upperDirPattern)
	if err != nil {
		panic(err)
	}
	for _, file := range matches {
		fmt.Println(file)
	}
}


//

```

