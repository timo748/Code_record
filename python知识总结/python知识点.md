### python知识点：

```
安装虚拟环境：pip install pipenv
安装：pipenv install
启动：python3 -m pipenv shell
镜像安装：pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple django
```



### 装饰器闭包讲解

```
Python高级编程——装饰器Decorator超详细讲解：
[https://mp.weixin.qq.com/s/5gFl2BQSzTNbGR4fZQn1Xg](超链接地址 "https://mp.weixin.qq.com/s/5gFl2BQSzTNbGR4fZQn1Xg")
[https://mp.weixin.qq.com/s/HVZymCKnU5bJrQ3BRiH8rw](超链接地址 "https://mp.weixin.qq.com/s/HVZymCKnU5bJrQ3BRiH8rw")
[https://mp.weixin.qq.com/s/dziy9MUMN_nGbPyQvuZJ9Q](超链接地址 "https://mp.weixin.qq.com/s/dziy9MUMN_nGbPyQvuZJ9Q")
[https://mp.weixin.qq.com/s/ff2DEmIhBZ0huYs9mBTbhA](超链接地址 "https://mp.weixin.qq.com/s/ff2DEmIhBZ0huYs9mBTbhA")
```



### lambda函数

```
lambda 函数是一个可以接收任意多个参数(包括可选参数)并且返回单个表达式值的函数。 lambda 函数不能包含命令，它们所包含的表达式不能超过一个。不要试图向lambda 函数中塞入太多的东西；如果你需要更复杂的东西，应该定义一个普通函数，然后想让它多长就多长。
f = lambda x,y:x+y # 求两个函数的和。 x,y是参数，x+y是函数返回值
```



### map

```
作用是将一个序列通过分 function 映射到另一个序列。即对可迭代对象中的每一个元素应用function方法，将结果作为 list 返回。如下所示：

>>> def add100(x):
...     return x+100
...
>>> hh = [11,22,33]
>>> map(add100,hh)
[111, 122, 133]
```



### reduce

```
reduce(function, sequence, startValue)

作用是将一个列表归纳为一个输出。具体是将一个可迭代的对象应用到一个带有两个参数的方法上，遍历这个可迭代对象，将其中的元素依次作为 function 的参数。如果给定 startValue 值，则第一次传入的是 startValue 和可迭代对象的第一个元素；如果没有给定，则传入可迭代对象的前两个参数。

>>> def foo(x, y):
...     return x + y
...
>>> l = range(1, 10)
>>> reduce(foo, l)
45
>>> reduce(foo, l, 10)
55
```



### filter

```
filter(function, sequence)

作用是按照所定义的函数过滤掉列表中的一些元素。如下所示：

>>> def foo(x):
...     return x % 2 != 0
...
>>> def hoo(x):
...     if x > 5 and x < 10:
...         return x
...     
...
>>> l = range(1, 10)
>>> filter(foo, l)
[1, 3, 5, 7, 9]
>>> filter(hoo, l)
[6, 7, 8, 9]
```



### 列表推导式

```
基本形式：

[x for item in sequence <if (conditions)>]

列表推导式又称列表解析，是一个非常有用, 简单, 而且灵活的工具, 可以用来动态地创建列表。例如获得1~10中所有奇数平方的列表：

[x ** 2 for x in range(1, 10) if x % 2 == 1 ]
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


1. __doc__
类的描述信息，即文档字符串。

2. __module__ 和 __class__
__module__ 表示当前操作的对象所属模块
__class__ 表示当前操作的对象所属的类
3. __init__
构造方法，初始化实例，通过类创建对象时，自动触发执行。

4. ` del`
析构方法，当对象在内存中被释放时，自动触发执行。

5. __call__
让实例对象可调用，也就是如果类中定义了该方法，则可以将实例作为函数使用。

6. __dict__
类或对象中的所有成员。

7. __setattr__、 __getattr__、 ` delattr`
用于动态的向实例中添加、获取、删除属性。

8. __str__、 __repr__
__str__：返回一个可以用来表示对象的可打印的对人友好的字符串；
__repr__：返回一个可以用来表示对象的可打印的对 Python 友好的字符串。
9. __getitem__、__setitem__、__delitem__
创建类似于映射的类时用于索引操作，如实现一个类字典的数据结构。以上分别表示获取、设置、删除数据。

10. __getslice__、__setslice__、__delslice__
创建类似于序列的类时这三个方法用于切片操作，如实现一个类序列的数据结构。

11. __iter__
用于创建迭代器。

12. __slots__
在动态语言中，可以随意给一个实例绑定任何的属性和方法，Python 也是如此。在面向对象编程中，为了限制 class 的属性，可使用特殊的__slots__变量来声明可添加的属性。使用 __slots__ 要注意，其定义的属性仅对当前类起作用，对继承的子类不起作用。

13. __new__
新式类中添加的方法，用于生成实例，在类准备将自身实例化时调用。至少要有一个参数cls，代表要实例化的类，其始终都是类的静态方法，即使没有被加上静态方法装饰器。必须要有返回值，返回实例化出来的实例，可以 return 父类 __new__ 出来的实例，或者直接是 object 的 __new__ 出来的实例。

14. __metaclass__
用于自定义元类。
```

### 切片说明

```
切片的书写形式：[i : i+n : m] ；其中，i 是切片的起始索引值，为列表首位时可省略；i+n 是切片的结束位置，为列表末位时可省略；m 可以不提供，默认值是1，不允许为0 ，当m为负数时，列表翻转。注意：这些值都可以大于列表长度，不会报越界

li = [1, 4, 5, 6, 7, 9, 11, 14, 16]

# 以下写法都可以表示整个列表，其中 X >= len(li)
li[0:X] == li[0:] == li[:X] == li[:]
== li[::] == li[-X:X] == li[-X:]

li[1:5] == [4,5,6,7] # 从1起，取5-1位元素
li[1:5:2] == [4,6] # 从1起，取5-1位元素，按2间隔过滤
li[-1:] == [16] # 取倒数第一个元素
li[-4:-2] == [9, 11] # 从倒数第四起，取-2-(-4)=2位元素
li[:-2] == li[-len(li):-2]
== [1,4,5,6,7,9,11] # 从头开始，取-2-(-len(li))=7位元素

# 步长为负数时，列表先翻转，再截取
li[::-1] == [16,14,11,9,7,6,5,4,1] # 翻转整个列表
li[::-2] == [16,11,7,5,1] # 翻转整个列表，再按2间隔过滤
li[:-5:-1] == [16,14,11,9] # 翻转整个列表，取-5-(-len(li))=4位元素
li[:-5:-3] == [16,9] # 翻转整个列表，取-5-(-len(li))=4位元素，再按3间隔过滤

# 切片的步长不可以为0
li[::0]  # 报错（ValueError: slice step cannot be zero）


```













































