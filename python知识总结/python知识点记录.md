### python知识点：

```
安装虚拟环境：pip install pipenv
安装：pipenv install
启动：python3 -m pipenv shell
镜像安装：pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple django
```

### flask

```
其他机器访问地址设置：app.run(host='0.0.0.0',port=9000)

http方法：
@app.route('/login/',methods=['GET','POST'])
def login():
    return 'login'
    
 传递多个路径:
 @app.route('/<any(article,blog):url_path>/')
def item(url_path):
    return url_path
    
重定向：
@app.route('/profile/',methods=['GET','POST'])
def profile():
    name = request.args.get('name')
    if not name:
        # 如果没有name，说明没有登录，重定向到登录页面
        return redirect(url_for('login'))
    else:
        return name
        
 开启调试模式：
 app.config.update(
DEBUG=True,
SECRET_KEY='...'
)

模板循环：
{% for item in navigation %}
<li><a href="{{ item.href }}">{{ item.caption }}</a></li>
{% endfor %}

模板继承：
{% block footer %}
&copy; Copyright 2008 by <a href="http://domain.invalid/">you</a>
{% endblock %}

模板引用静态文件：<link href="{{ url_for('static',filename='about.css') }}">




 
 
```

### SQL

```
from sqlalchemy import create_engine

# 数据库的配置变量
HOSTNAME = '127.0.0.1'
PORT = '3306'
DATABASE = 'xt_flask'
USERNAME = 'root'
PASSWORD = 'root'
DB_URI = 'mysql+mysqldb://{}:{}@{}:{}/{}'.format(USERNAME,PASSWORD,HOSTNAME,PORT,DATABASE)

# 创建数据库引擎
engine = create_engine(DB_URI)

#创建连接
with engine.connect() as con:
    rs = con.execute('SELECT 1')
    print rs.fetchone()
sqlalchemy连接：dialect+driver://username:password@host:port/database?charset=utf8

```

### scrapy

```
启动scrapy项目：scrapy startproject  "项目名称"
执行爬虫：scrapy crawl "名称"
本地模拟请求：scrapy shell "请求地址"  
eg:print(response.xpath("\\title"));
放置本地资源：view(response)
配置文件uft8：FEED_EXPORT_ENCODING = 'utf-8'
```

### lambda函数

```
lambda 函数是一个可以接收任意多个参数(包括可选参数)并且返回单个表达式值的函数。 lambda 函数不能包含命令，它们所包含的表达式不能超过一个。不要试图向lambda 函数中塞入太多的东西；如果你需要更复杂的东西，应该定义一个普通函数，然后想让它多长就多长。
f = lambda x,y:x+y # 求两个函数的和。 x,y是参数，x+y是函数返回值
```

### python实现单例模式

```
#方法3:本质上是方法1的升级（或者说高级）版
#使用__metaclass__（元类）的高级python用法
class Singleton2(type):
    def __init__(cls, name, bases, dict):
        super(Singleton2, cls).__init__(name, bases, dict)
        cls._instance = None
    def __call__(cls, *args, **kw):
        if cls._instance is None:
            cls._instance = super(Singleton2, cls).__call__(*args, **kw)
        return cls._instance
 
class MyClass3(object):
    __metaclass__ = Singleton2
 
one = MyClass3()
two = MyClass3()
 
two.a = 3
print one.a
#3
print id(one)
#31495472
print id(two)
#31495472
print one == two
#True
print one is two
#True
```

### 如何用Python来进行查询和替换一个文本字符串

```
可以使用sub()方法来进行查询和替换，sub方法的格式为：sub(replacement, string[, count=0])

replacement是被替换成的文本

string是需要被替换的文本

count是一个可选参数，指最大被替换的数量
```

### python中is和==区别？

```
 is 表示的是对象标示符（object identity），而 == 表示的是相等（equality）。is 的作用是用来检查对象的标示符是否一致，也就是比较两个对象在内存中的地址是否一样，而 == 是用来检查两个对象是否相等。
 在检查 a is b 的时候，其实相当于检查 id(a) == id(b)。而检查 a == b 的时候，实际是调用了对象 a 的 __eq()__ 方法，a == b 相当于 a.__eq__(b)。
一般情况下，如果 a is b 返回True的话，即 a 和 b 指向同一块内存地址的话，a == b 也返回True，即 a 和 b 的值也相等
is 是检查两个对象是否指向同一块内存空间，而 == 是检查他们的值是否相等。可以看出，is 是比 == 更严格的检查，is 返回True表明这两个对象指向同一块内存，值也一定相同。
```

### python小技巧

```
#翻转一个字符串  
s = 'abcde'  
ss = s[::-1]

#去掉list中的重复元素  
old_list = [1,1,1,3,4]  
new_list = list(set(old_list)) 

#用两个元素之间有对应关系的list构造一个dict  
names = ['jianpx', 'yue']  
ages = [23, 40]  
m = dict(zip(names,ages))


#将数量较多的字符串相连，如何效率较高，为什么  
fruits = ['apple', 'banana']  
result = ''.join(fruits)  

#交换两个变量值  
a,b = b,a 

#得到列表的交集和差集
>>> list1 = [1, 3, 4, 6]
>>> list2 = [1, 2, 3, 4]
>>> [i for i in list1 if i not in list2]
[6]
>>> [i for i in list1 if i in list2]

#用切片来删除序列的某一段
>>> a = [1, 2, 3, 4, 5, 6, 7]
>>> a[1:4] = []
>>> a
[1, 5, 6, 7]

#str方法总结
#方法                                   #描述  
-------------------------------------------------------------------------------------------------  
S.capitalize()                          #返回首字母大写的字符串的副本  
S.center(width[,fillchar])              #返回一个长度为max(len(S),width),S居中，两侧fillchar填充  
S.count(sub[,start[,end]])              #计算子字符串sub的出现次数，可将搜索范围限制为S[start:end]  
S.decode([encoding[,error]])            #返回使用给定编码方式的字符串的解码版本，由error指定错误处理方式  
S.endswith(suffix[start[,end]])         #检查S是否以suffix结尾，可给定[start:end]来选择匹配的范围  
S.expandtabs([tabsize])                 #返回字符串的副本，其中tab字符会使用空格进行扩展，可选择tabsize  
S.find(sun[,start[,end]])               #返回子字符串sub的第一个索引，不存在则为-1,可选择搜索范围  
S.index(sub[,start[,end]])              #返回子字符串sub的第一个索引，不存在则引发ValueError异常.  
S.isalnum()                             #检查字符串是否由字母或数字字符组成  
S.isalpha()                             #检查字符串是否由字母字符组成  
S.isdigit()                             #检查字符串是否由数字字符组成  
S.islower()                             #检查字符串是否由小写字母组成  
S.isspace()                             #检查字符串是否由空格组成  
S.istitle()                             #检查字符串时候首字母大写  
S.isupper()                             #检查字符串是否由大写字母组成  
S.join(sequence)                        #返回其中sequence的字符串元素由S连接的字符串  
S.ljust(width[,fillchar])               #返回S副本左对齐的字符串,长度max(len(S),W),右侧fillchar填充  
S.lower()                               #返回所有字符串都为小写的副本  
S.lstrip([char])                        #向左移除所有char，默认移除(空格,tab,\n)  
S.partition(seq)                        #在字符串中搜索seq并返回  
S.replace(old,new[,max])                #将new替换olad,最多可替换max次  
S.rfind(sub[,start[,end]])              #返回sub所在的最后一个索引，不存在则为-1,可定搜索范围S[start:end]  
S.rindex(sub[,start[,end]])             #返回sub所在的最后一个索引，不存在则会引发ValueError异常。  
S.rjust(width[,fillchar])               #返回S副本右对齐的字符串,长度max(len(S),W),左侧fillchar填充  
S.rpartition(seq)                       #同Partition,但从右侧开始查找  
S.rstip([char])                         #向右移除所有char，默认移除(空格,tab,\n)  
S.rsplit(sep[,maxsplit])                #同split,但是使用maxsplit时是从右往左进行计数  
S.split(sep[,maxsplit])                 #使用sep做为分割符,可使用maxsplit指定最大切分数  
S.zfill(width)                          #在S的左侧以0填充width个字符  
S.upper()                               #返回S的副本，所有字符大写  
S.splitlines([keepends])                #返回S中所有行的列表，可选择是否包括换行符  
S.startswith(prefix[,start[,end]])      #检查S是否以prefix开始，可用[start,end]来定义范围  
S.strip([chars])                        #移除所有字符串中含chars的字符，默认移除(空格，tab,\n)  
S.swapcase()                            #返回S的副本，所有大小写交换  
S.title()                               #返回S的副本，所有单词以大写字母开头  
S.translate(table[,deletechars])        #返回S的副本，所有字符都使用table进行的转换，可选择删除出现在deletechars中的所有字符 


```

###  --new--和--init--区别

```
new()方法用来实例化最终的类对象，在类创建之前被调用，它在类的主体被执行完后开始执行。 
init()方法是在类被创建之后被调用，用来执行其他的一些输出化工作 

__new__是一个静态方法,而__init__是一个实例方法.
__new__方法会返回一个创建的实例,而__init__什么都不返回.
只有在__new__返回一个cls的实例时后面的__init__才能被调用.
当创建一个新实例时调用__new__,初始化一个实例时用__init__.

__new__至少要有一个参数cls，代表当前类，此参数在实例化时由Python解释器自动识别
__new__必须要有返回值，返回实例化出来的实例，这点在自己实现__new__时要特别注意，可以return父类（通过super(当前类名, cls)）__new__出来的实例，或者直接是object的__new__出来的实例
__init__有一个参数self，就是这个__new__返回的实例，__init__在__new__的基础上可以完成一些其它初始化的动作，__init__不需要返回值
如果__new__创建的是当前类的实例，会自动调用__init__函数，通过return语句里面调用的__new__函数的第一个参数是cls来保证是当前类实例，如果是其他类的类名，；那么实际创建返回的就是其他类的实例，其实就不会调用当前类的__init__函数，也不会调用其他类的__init__函数。
```



### 网络三次握手

```
客户端通过向服务器端发送一个SYN来创建一个主动打开，作为三路握手的一部分。客户端把这段连接的序号设定为随机数 A。
服务器端应当为一个合法的SYN回送一个SYN/ACK。ACK 的确认码应为 A+1，SYN/ACK 包本身又有一个随机序号 B。
最后，客户端再发送一个ACK。当服务端受到这个ACK的时候，就完成了三路握手，并进入了连接创建状态。此时包序号被设定为收到的确认号 A+1，而响应则为 B+1。
```

### 标准库os常用方法

```

os.remove()删除文件
os.rename()重命名文件
os.walk()生成目录树下的所有文件名
os.chdir()改变目录
os.mkdir/makedirs创建目录/多层目录
os.rmdir/removedirs删除目录/多层目录
os.listdir()列出指定目录的文件
os.getcwd()取得当前工作目录
os.chmod()改变目录权限
os.path.basename()去掉目录路径，返回文件名
os.path.dirname()去掉文件名，返回目录路径
os.path.join()将分离的各部分组合成一个路径名
os.path.split()返回（dirname(),basename())元组
os.path.splitext()(返回filename,extension)元组
os.path.getatime\ctime\mtime分别返回最近访问、创建、修改时间
os.path.getsize()返回文件大小
os.path.exists()是否存在
os.path.isabs()是否为绝对路径
os.path.isdir()是否为目录
os.path.isfile()是否为文件
```



### 标准库sys常用方法

```
sys.argv           命令行参数List，第一个元素是程序本身路径  
sys.modules.keys() 返回所有已经导入的模块列表  
sys.exc_info()     获取当前正在处理的异常类,exc_type、exc_value、exc_traceback当前处理的异常详细信息  
sys.exit(n)        退出程序，正常退出时exit(0)  
sys.hexversion     获取Python解释程序的版本值，16进制格式如：0x020403F0  
sys.version        获取Python解释程序的版本信息  
sys.maxint         最大的Int值  
sys.maxunicode     最大的Unicode值  
sys.modules        返回系统导入的模块字段，key是模块名，value是模块  
sys.path           返回模块的搜索路径，初始化时使用PYTHONPATH环境变量的值  
sys.platform       返回操作系统平台名称  
sys.stdout         标准输出 
sys.stdin          标准输入 
sys.stderr         错误输出 
sys.exc_clear()    用来清除当前线程所出现的当前的或最近的错误信息 
sys.exec_prefix    返回平台独立的python文件安装的位置 
sys.byteorder      本地字节规则的指示器，big-endian平台的值是'big',little-endian平台的值是'little' 
sys.copyright      记录python版权相关的东西 
sys.api_version    解释器的C的API版本 
sys.version_info 
--------------------- 
```

### 计算一个文件中大写字母的数量

```
>>> import os

>>> os.chdir('C:\\Users\\lifei\\Desktop')
>>> with open('Today.txt') as today:
    count=0
    for i in today.read():
        if i.isupper():
            count+=1
print(count)
```

### python魔法函数

```
__new__(cls [,...])	instance = MyClass(arg1, arg2)	__new__ 在创建实例的时候被调用
__init__(self [,...])	instance = MyClass(arg1, arg2)	__init__ 在创建实例的时候被调用
__cmp__(self, other)	self == other, self > other, 等。	在比较的时候调用
__pos__(self)	+self	一元加运算符
__neg__(self)	-self	一元减运算符
__invert__(self)	~self	取反运算符
__index__(self)	X[self]	对象被作为索引使用的时候
__nonzero__(self)	Bool(self)	对象的布尔值
__getattr__(self, name)	self.name # name 不存在	访问一个不存在的属性时
__setattr__(self, name, val)	self.name = val	对一个属性赋值时
__delattr__(self, name)	del self.name	删除一个属性时
__getattribute(self, name)	self.name	访问任何属性时
__getitem__(self, key)	self[key]	使用索引访问元素时
__setitem__(self, key, val)	self[key] = val	对某个索引值赋值时
__delitem__(self, key)	del self[key]	删除某个索引值时
__iter__(self)	for x in self	迭代时
__contains__(self, value)	value in self, value not in self	使用 in 操作测试关系时
__concat__(self, value)	self + other	连接两个对象时
__call__(self [,...])	self(args)	“调用”对象时
__enter__(self)	with self as x:	with 语句环境管理
__exit__(self, exc, val, trace)	with self as x:	with 语句环境管理
__getstate__(self)	pickle.dump(pkl_file, self)	序列化
__setstate__(self)	data = pickle.load(pkl_file)	序列化
```















































