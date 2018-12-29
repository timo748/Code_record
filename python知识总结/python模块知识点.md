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

