### 连接数据库

```go
package main

import "github.com/jinzhu/gorm"
import _ "github.com/jinzhu/gorm/dialects/mysql"//导入连接MySQL数据库的驱动包

//DSN
const DSN = "root:123456@tcp(localhost:3306)/test?charset=utf8&parseTime=True&loc=Local"
//指定驱动
const DRIVER = "mysql"

var db *gorm.DB

func init() {
    var err error
    db,err = gorm.Open(DRIVER,DSN)
    if err != nil{
        panic(err)
    }
}

func main(){
    defer db.Close()//退出前执行关闭
    //调用db执行具体的逻辑
}
```

### 定义模型

```go
type User struct {
    Id       int   //对应数据表的自增id
    Username string
    Password string
    Email    string
    Phone    string
}
```

### 创建

```go
func (s *DB) Create(value interface{}) *DB  //创建一行
func (s *DB) NewRecord(value interface{}) bool //根据自增id判断主键是否存在


func main() {
    defer db.Close()
    //具体的逻辑
    u := &User{Username: "test_one", Password: "testOne123456", Email: "test_one@163.com", Phone: "13711112222"}
    db.Create(u)
    if db.NewRecord(u){
        fmt.Println("写入失败")
    }else{
    	fmt.Println("写入成功")
    }
}
```

### 增

```

```

### 删

```go
//value如果有主键id，则包含在判断条件内，通过where可以指定其他条件
func (s *DB) Delete(value interface{}, where ...interface{}) *DB


func delete(){
    defer db.Close()
    u := &User{Id: 16}
    db.Delete(u)//根据id
    db.Delete(&User{},"username = ? ","test_one")//根据额外条件删除
}

```

### 改

```go
func (s *DB) Save(value interface{}) *DB

func (s *DB) Model(value interface{}) *DB
//下面的方法需要与Model方法一起使用，通过Model方法指定更新数据的条件
func (s *DB) Update(attrs ...interface{}) *DB
func (s *DB) UpdateColumn(attrs ...interface{}) *DB
func (s *DB) UpdateColumns(values interface{}) *DB
func (s *DB) Updates(values interface{}, ignoreProtectedAttrs ...bool) *DB


//Save()方法示例
func save(){
    u := &User{}
    db.First(u)
    u.Email = "test@163.com"
    db.Save(u)
    fmt.Println(u)
}

//Update方法示例
func update() {
    u := &User{}
    db.First(u)
    db.Model(u).Update("username", "hello")
}

//Updates方法示例
func updates() {
    u := &User{}
    db.First(u)
    db.Model(&u).Updates(map[string]interface{}{"username": "hello2"})
}
```

### 查

```go
//返回第一条
func (s *DB) First(out interface{}, where ...interface{}) *DB
//返回最后一条
func (s *DB) Last(out interface{}, where ...interface{}) *DB
//返回符合条件的内容
func (s *DB) Find(out interface{}, where ...interface{}) *DB
//返回Count(*)结果
func (s *DB) Count(value interface{}) *DB


//Find方法示例
func find() {
    var users = make([]*User, 0)
    db.Model(&User2{}).Find(&users)
    fmt.Println(users)
}

//First方法示例
func first()  {
    var user1,user2 User
    db.First(&user1)
    fmt.Println(user1)
    db.First(&user2,"id = ?",20)
    fmt.Println(user2)
}

//Last方法示例
func last()  {
    var user1,user2 User
    db.Last(&user1)
    fmt.Println(user1)
    db.First(&user2,"id = ?",19)
    fmt.Println(user2)
}

//Count方法示例
func count()  {
    var count int
    db.Model(&User{}).Count(&count)
    fmt.Println(count)
}
```

