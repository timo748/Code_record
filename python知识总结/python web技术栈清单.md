# python web技术栈自测清单

### python基础

```
1、基础语法
2、哪些关键字？解释其作用
3、哪些内置方法？解释其作用
4、什么是动态语言？动态强类型是什么
5、编码规范概念？采用哪种编码规范
6、深拷贝和浅拷贝
7、lambda用法使用场景
8、闭包及其作用
9、实现简单装饰器，用来对某个函数进行缓存
10、python容器差别和使用场景
11、yield用法
12、列表推导式使用和场景
13、常用内置库？举例使用方法
14、魔法函数及其作用
15、面向对象概念及其编程中的作用
16、实现单例模式
17、如何对python对象序列化
18、熟练编写多线程和多进程程序
19、使用socket编写一个简单HTTP服务器，返回scuccess即可
20、python中的GIL，对日程开发有什么影响
21、协程、线程、进程的差别
```

### Django基础

```
1、理解django中的MVC模式
2、django熟悉的模块和作用
3、django admin使用经验
4、WSGI作用
5、实现WSGI协议
6、django migations的作用
7、手动编辑 migations注意事项
8、ORM概念、作用
9、ORM下的N+1问题、发生原因、解决方案
10、django中model的作用
11、model中meta可配置项 作用、日常如何使用
12、Queryset的作用、优化措施
13、pagination的用法
14、model中field作用
15、定制Manager 什么场景须定制
16、django内置提供的权限逻辑及其粒度
17、django中 function view和class-based-view差别和场景
18、如何给class-based-view添加login required装饰器
19、middleware在django系统中的作用
21、setting默认配置的MIDDLEWARES有哪些 作用 是否可以移除
22、django如何判断用户是否为登录用户
23、对于无cookie用户如何实现登录
24、django中的request和httpresponse作用是什么
25、如何处理图片上传的逻辑和展示逻辑
26、django的缓存粒度
27、django中的from作用
28、from中的field和model的field关联
29、如何在from实现对某个字段校验
```

### Django进阶

```
1、如何排查django项目性能问题
2、如何部署django项目
3、部署时如何处理静态文件
4、如何实现自定义登录定义逻辑
5、理解django中model from modelfrom和field、widget关系
6、paginator的原理是什么  如何实现自己分页逻辑
7、model中的field作用
8、什么是sql注入？orm解决方案
9、CSRF全称？如何避免
10、XSS？如何避免
11、signal作用和是实现逻辑
12、DATABASE配置中CONN_MAX_AGE参数作用 使用场景
13、CONN_MAX_AGE实现逻辑
14、django内置的User模型创建用户时，是再可以直接用User(username＝’the5fire',password=’the5fire’) . save ()?
15、上面创建方式有什么问题  如何处理用户密码
16、django-rest-framework如何实现用户认证登录逻辑
17、session模块在django中的作用
18、自定义django中的权限粒度，实现自己的权限
19、如何捕获线上系统的异常
20、如何分析某个接口相应时间过长问题？假设响应时间为2s，一次请求会涉及哪些数据库和缓存查询？
```

### 部署相关

```
1、如何自动化部署项目到生产环境 具体流程？
2、介绍常用的自动化部署工具？
3、用到哪些监控工具？其作用是什么？使用中有什么不足之处？
4、supervisor的作用是什么？为何使用它
5、Gunicorn的作用是什么 为何使用它
6、如何对系统进行压测，如何进行流量预估？
7、Nginx的作用是什么？是否能独立配置？有没有优化经验？
8、项目发版逻辑是什么  如何保证新版本异常时快速回滚？
```

### Mysql数据库

```
1、如何确定哪些字段需要设置索引？
2、什么情况下需要设定字段属性unqiue=true？
3、如何排查某个SQL语句的索引命中情况？
4、如何排查查询过慢的SQL语句？
```

### Redis

```
1、redis特点？为何使用它？
2、redius支持的数据类型？
3、如何合理规划key？
4、比如把所有文章和分类数据写进redius，在django中直接读取redis拿到分类和文章数据，如何规划数据存储？如何处理分页？
5、是否支持事务？
6、有哪些数据淘汰策略？
7、有些redius相应时间太长时，如何排查？可能是什么引起的？
8、用到的redius的部署结构是什么？
9、redius的持久化策略，不同的策略有什么不同？
10、redius主从同步策略？
```

### 常用算法

```
1、python字典类型的实现算法？
2、高级语言的垃圾回收机制有哪些？python中用的是什么？
3、知道的缓存的相关算法？
4、负载均衡的相关算法？
5、数据库索引的相关算法？
```





