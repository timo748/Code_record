### datetime

```
datetime.min、datetime.max：datetime所能表示的最小值与最大值；
datetime.resolution：datetime最小单位；
datetime.today()：返回一个表示当前本地时间的datetime对象；
datetime.now([tz])：返回一个表示当前本地时间的datetime对象，如果提供了参数tz，则获取tz参数所指时区的本地时间；
datetime.utcnow()：返回一个当前utc时间的datetime对象；
datetime.fromtimestamp(timestamp[, tz])：根据时间戮创建一个datetime对象，参数tz指定时区信息；
datetime.utcfromtimestamp(timestamp)：根据时间戮创建一个datetime对象；
datetime.combine(date, time)：根据date和time，创建一个datetime对象；
datetime.strptime(date_string, format)：将格式字符串转换为datetime对象，data 与 time 类没有提供该方法。
```



### OS

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



### sys

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
```

### math

```
函数	说明
math.acos(x)	返回 x 的反余弦
math.acosh(x)	返回 x 的反双曲余弦
math.asin(x)	返回 x 的反正弦
math.asinh(x)	返回 x 的反双曲正弦
math.atan(x)	返回 x 的反正切
math.atan2(y, x)	返回 y/x 的反正切
math.atanh(x)	返回 x 的反双曲正切
math.ceil(x)	返回 ≧ x 的最小整數，例：math.floor(3.4) = 4
math.copysign(x, y)	返回与 y 同号的 x 值， 例：math.copysign(1.0, -0.0) = -1.0
math.cos(x)	返回 x 的余弦
math.cosh(x)	返回 x 的双曲余弦
math.degrees(x)	將 x (弧长) 转成角度，与 radians 为反函数
math.e	常数 e = 2.7128…
math.exp(x)	返回 math.e**x
math.fabs(x)	返回 x 的绝对值
math.factorial(x)	返回 x! 阶乘
math.floor(x)	返回 ≦ x 的最大整数，例：math.floor(3.4) = 3
math.fmod(x, y)	返回 x 对 y 取模的余数
math.frexp(x)	ldexp 的反函数，返回一個 2 元組
math.fsum(x)	返回 x 阵列值的各項和，例： math.fsum([2, 3, 5]) = 10
math.hypot(x, y)	返回 x2 + y2 的根
math.isinf(x)	如果 x = ±inf 也就是 ±∞， 返回 True
math.isnan(x)	如果 x = Nan (not a number) 返回 True
math.ldexp(m, n)	返回 m**2n, 与 frexp 是反函数， 例：math.ldexp(2, 2)
math.log(x, a)	返回 log 以 a 为底 x 的对数，若不给定 a 则底默认为 e
math.log2(x)	返回 log 以 2 为底 x 的对数
math.log10(x)	返回 log 以 10 为底 x 的对数
math.loglp(x)	返回 log 以 e 为底 1+x 的对数
math.modf(x)	返回 x 的小数部份与整数部份，例：math.modf(13.14) = （14.0， 13.0）
math.pi	返回常数 π (3.14159…)
math.pow(x,y)	返回 x**y
math.radians(d)	將 x(角度) 转成弧长，与 degrees 为反函数
math.sin(x)	返回 x 的正弦
math.sinh(x)	返回 x 的双曲正弦
math.sqrt(x)	返回 x 的根
math.tan(x)	返回 x 的正切
math.tanh(x)	返回 x 的双曲正切
math.trunc(x)	返回 x 的整数部份，等同 int
```

### random中常见函数

```
import random

print( random.randint(1,10) )        # 产生 1 到 10 的一个整数型随机数  
print( random.random() )             # 产生 0 到 1 之间的随机浮点数
print( random.uniform(1.1,5.4) )     # 产生  1.1 到 5.4 之间的随机浮点数，区间可以不是整数
print( random.choice('tomorrow') )   # 从序列中随机选取一个元素
print( random.randrange(1,100,2) )   # 生成从1到100的间隔为2的随机整数

a=[1,3,5,6,7]                # 将序列a中的元素顺序打乱
random.shuffle(a)
print(a)
```

### 常用字符串函数

```
capitalize()      将字符串的第一个字符转换为大写
center(width, fillchar)    返回一个指定的宽度 width 居中的字符串，fillchar 为填充的字符，默认为空格。
count(str, beg= 0,end=len(string)) 		返回 str 在 string 里面出现的次数，如果 beg 或者 end 指定则返回指定范围内 str 出现的次数
bytes.decode(encoding="utf-8", errors="strict") 		Python3 中没有 decode 方法，但我们可以使用 bytes 对象的 decode() 方法来解码给定的 bytes 对象，这个 bytes 对象可以由 str.encode() 来编码返回。
encode(encoding='UTF-8',errors='strict')		以 encoding 指定的编码格式编码字符串，如果出错默认报一个ValueError 的异常，除非 errors 指定的是'ignore'或者'replace'
endswith(suffix, beg=0, end=len(string))		检查字符串是否以 obj 结束，如果beg 或者 end 指定则检查指定的范围内是否以 obj 结束，如果是，返回 True,否则返回 False.
expandtabs(tabsize=8)		把字符串 string 中的 tab 符号转为空格，tab 符号默认的空格数是 8 。
find(str, beg=0 end=len(string))		检测 str 是否包含在字符串中，如果指定范围 beg 和 end ，则检查是否包含在指定范围内，如果包含返回开始的索引值，否则返回-1	
index(str, beg=0, end=len(string))		跟find()方法一样，只不过如果str不在字符串中会报一个异常.
isalnum()		如果字符串至少有一个字符并且所有字符都是字母或数字则返 回 True,否则返回 False
isalpha()		如果字符串至少有一个字符并且所有字符都是字母则返回 True, 否则返回 False
isdigit()		如果字符串只包含数字则返回 True 否则返回 False..
islower()		如果字符串中包含至少一个区分大小写的字符，并且所有这些(区分大小写的)字符都是小写，则返回 True，否则返回 False
isnumeric()		如果字符串中只包含数字字符，则返回 True，否则返回 False
isspace()		如果字符串中只包含空白，则返回 True，否则返回 False.
istitle()		如果字符串是标题化的(见 title())则返回 True，否则返回 False
isupper()		如果字符串中包含至少一个区分大小写的字符，并且所有这些(区分大小写的)字符都是大写，则返回 True，否则返回 False
join(seq)		以指定字符串作为分隔符，将 seq 中所有的元素(的字符串表示)合并为一个新的字符串
len(string)		返回字符串长度
ljust(width[, fillchar])		返回一个原字符串左对齐,并使用 fillchar 填充至长度 width 的新字符串，fillchar 默认为空格。
lower()			转换字符串中所有大写字符为小写.	
lstrip()		截掉字符串左边的空格或指定字符。
maketrans()		创建字符映射的转换表，对于接受两个参数的最简单的调用方式，第一个参数是字符串，表示需要转换的字符，第二个参数也是字符串表示转换的目标。
max(str)		返回字符串 str 中最大的字母。
min(str)		返回字符串 str 中最小的字母。
replace(old, new [, max])		把 将字符串中的 str1 替换成 str2,如果 max 指定，则替换不超过 max 次。
rfind(str, beg=0,end=len(string))		类似于 find()函数，不过是从右边开始查找.
rindex( str, beg=0, end=len(string))	类似于 index()，不过是从右边开始
rjust(width,[, fillchar])		返回一个原字符串右对齐,并使用fillchar(默认空格）填充至长度 width 的新字符串
rstrip()		删除字符串字符串末尾的空格.
split(str="", num=string.count(str))		num=string.count(str)) 以 str 为分隔符截取字符串，如果 num 有指定值，则仅截取 num+1 个子字符串
splitlines([keepends])		按照行('\r', '\r\n', \n')分隔，返回一个包含各行作为元素的列表，如果参数 keepends 为 False，不包含换行符，如果为 True，则保留换行符。
startswith(substr, beg=0,end=len(string))		检查字符串是否是以指定子字符串 substr 开头，是则返回 True，否则返回 False。如果beg 和 end 指定值，则在指定范围内检查
strip([chars])		在字符串上执行 lstrip()和 rstrip()
swapcase()		将字符串中大写转换为小写，小写转换为大写
title()		返回"标题化"的字符串,就是说所有单词都是以大写开始，其余字母均为小写(见 istitle())
translate(table, deletechars="")		根据 str 给出的表(包含 256 个字符)转换 string 的字符, 要过滤掉的字符放到 deletechars 参数中
upper()			转换字符串中的小写字母为大写
zfill (width)		返回长度为 width 的字符串，原字符串右对齐，前面填充0
isdecimal()			检查字符串是否只包含十进制字符，如果是返回 true，否则返回 false。
```





















