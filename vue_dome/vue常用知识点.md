##### 路由跳转：

（@click="switchNav(extend1.url,extend1.tag)"）

```
switchNav(url,tag){
    //标识当前导航
    this.currentTag = tag;
    //router导航
    this.$router.push({
        'path': url,
        'query': {
            "tag": tag
        }
    });
}
```







































