### 获取参数

```go
获取get参数：
name := c.Query("name")
price:=c.DefaultQuery("price","100")

获取post参数：
name:=c.postForm("name")
price:=c.DefaultPostForm("price","100")

获取get所有参数：
Reqget = c.Request.URL.Query()

获取post所有参数：
Repost = c.Request.PostForm
```

