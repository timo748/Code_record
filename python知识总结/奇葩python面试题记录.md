```
### 现在有2个元组(('a'),('b'),('c'),('d'))，请使用Python中的匿名函数生成列表[{'a':'c'},{'b':'d'}]?
    tu = (('a'),('b'),('c'),('d'))
    tu = list(map(lambda x,y:{x:y},tu[:2],tu[2:]))
    print(tu)
###  def extendlist(val,li=[]):
        li.append(val)
        return li
l1 = extendlist(10)
l2 = extendlist(123,[])
l3 = extendlist('a')
print(l1)
print(l2)
print(l3)
答案：[10,'a']   [123]  [10,'a']

### 1.手写快排；堆排；几种常用排序的算法复杂度是多少；快排平均复杂度多少，最坏情况如何优化； 
2.手写：已知一个长度n的无序列表，元素均是数字，要求把所有间隔为d的组合找出来，你写的解法算法复杂度多少；
3.手写：一个列表A=[A1，A2，…,An]，要求把列表中所有的组合情况打印出来； 
4.手写：用一行python写出1+2+3+…+10**8 ；
5.手写python：用递归的方式判断字符串是否为回文； 
6.单向链表长度未知，如何判断其中是否有环； 
7.单向链表如何使用快速排序算法进行排序； 
8.手写：一个长度n的无序数字元素列表，如何求中位数，如何尽快的估算中位数，你的算法复杂度是多少；
9.如何遍历一个内部未知的文件夹（两种树的优先遍历方式）
1.TCP/IP分别在模型的哪一层；
2.socket长连接是什么意思；
3.select和epoll你了解么，区别在哪；
4.TCP UDP区别；三次握手四次挥手讲一下；
5.TIME_WAIT过多是因为什么；
6.http一次连接的全过程：你来说下从用户发起request——到用户接收到response；
7.http连接方式。get和post的区别，你还了解其他的方式么；
8.restful你知道么；
1.MySQL锁有几种；死锁是怎么产生的；
2.为何，以及如何分区、分表；
3.MySQL的char varchar text的区别；
4.了解join么，有几种，有何区别，A LEFT JOIN B，查询的结果中，B没有的那部分是如何显示的（NULL）；
5.索引类型有几种，BTree索引和hash索引的区别（我没答上来这俩在磁盘结构上的区别）；
6.手写：如何对查询命令进行优化；
7.NoSQL了解么，和关系数据库的区别；redis有几种常用存储类型；
1.讲一下你常用的Linux/git命令和作用；
2.查看当前进程是用什么命令，除了文件相关的操作外，你平时还有什么操作命令；

###1.*args和**kwargs是什么意思？
答：*args表示可变参数（variadic arguments），它允许你传入0个或任意个无名参数，这些参数在函数调用时自动组装为一个tuple； **kwargs表示关键字参数（keyword arguments），它允许你传入0个或任意个含参数名的参数，这些关键字参数在函数内部自动组装为一个dict。同时使用*args和**kwargs的时候，必须保证*args在**kwargs之前。


5.python如何实现单例模式？答：单例模式是一种常用的软件设计模式。在它的核心结构中只包含一个被称为单例类的特殊类。通过单例模式可以保证系统中一个类只有一个单例而且该单例易于外界访问，从而方便对实例个数的控制并节约系统资源。如果希望在系统中某个类的对象只能存在一个，单例模式是最好的解决方案。__new__()在__init__()之前被调用，用于生成实例对象。利用这个方法和累的属性的特点可以实现设计模式的单例模式。单例模式是指创建唯一对象，单例模式设计的类只能实例。
1.使用__new__方法
class Singleton(object):
def __new__(cls, *args, **kw):
if not hasattr(cls, '_instance'):
orig = super(Singleton, cls)
cls._instance = orig.__new__(cls, *args, **kw)
return cls._instance
class MyClass(Singleton):
a = 1
2.共享属性class Borg(object):
_state = {}
def __new__(cls, *args, **kw):
ob = super(Borg, cls).__new__(cls, *args, **kw)
ob.__dict__ = cls._state
return obclass 
MyClass2(Borg):
a = 1
3.装饰器版本def singleton(cls, *args, **kw):
instances = {}
def getinstance():
if cls not in instances:
instances[cls] = cls(*args,**kw)
return instances[cls]
return getinstance@singleton
class MyClass:...
4.import方法
class My_Singleton(object):
def foo(self):
passmy_singleton = My_Singleton()
# to usefrom mysingleton 
import my_singletonmy_singleton.foo()


###、用python实现统计一篇英文文章内每个单词的出现频率，并返回出现频率最高的前10个单词及其出现次数，并解答以下问题？（标点符号可忽略）
（1）创建文件对象f后，解释f的readlines和xreadlines方法的区别？
（2）追加需求：引号内元素需要算作一个单词，如何实现？
阐述一下装饰器，描述符（property）、元类的概念，并列举其应用场景；
（2）如何动态获取和设置对象的属性。
用python编写一个线程安全的单例模式实现。

#打平
a = [1, 2, [3, 4], [[5, 6], [7, 8]]]
fn = lambda x: [y for l in x for y in fn(l)] if type(x) is list else [x]
print（fn(a)）
[1, 2, 3, 4, 5, 6, 7, 8]
```





### python面试指导

```
#python2/3区别
1、print()函数
2、uncode编码
3、列表字典生成器

#二分法查找
def binary_search(sorted_array,val):
	if not sorted_array:
		return -1
	beg = 0
	end = len(sorted_array)-1
	while beg<=end:
		mid = int((beg+end)/2)
		if sorted_array[mid]==val:
			return mid
		elif sorted_array[mid]>val:
			end = mid-1
		else:
			beg = mid+1
	return -1
	
#反转列表
class solution:
	def reverselist(self,head):
		pre = None
		cur = head
		while cur:
			nextNode = cur.next
			cur.next = pre
			pre = cur
			cut = nextnode
		return pre
	
	
	
	
	
	
	
	
```

