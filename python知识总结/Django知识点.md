### 开发遇到问题记录

```
数据库迁移是不能新建表解决办法： python3 manage.py makemigrations --empty foodsapp
```



### 创建 Django 工程

```
常用命令：
新建一个项目：django-admin.py startproject project-name
新建一个app：python manage.py startapp app-name
同步数据库：python manage.py syncdb，python manage.py makemigrations，python manage.py migrate
使用开发服务器：python manage.py runserver
清空数据库：python manage.py flush
创建超级管理员：python manage.py createsuperuser
导出数据导入数据：python manage.py dumpdata appname > appname.json，python manage.py loaddata appname.json
django项目环境终端：python manage.py shell
数据库命令行：python manage.py dbshell
```

### Django请求生命周期

```
#wsgi, 他就是socket服务端，用于接收用户请求并将请求进行初次封装，然后将请求交给web框架（Flask、Django）
#中间件，帮助我们对请求进行校验或在请求对象中添加其他相关数据，例如：csrf、request.session 
#路由匹配 
#视图函数，在视图函数中进行业务逻辑的处理，可能涉及到：orm、templates => 渲染
#中间件，对响应的数据进行处理。
#wsgi,将响应的内容发送给浏览器。
```



### 更改链接数据库地址

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'djangodb',
        'USER':'root',
        'PASSWORD':'mao15897610067',
        'HOST':'localhost',
        'PORT':'3306',
    }
}
```

### Django ORM操作数据库

```
class employee(models.Model):
	id = model.AutoField(primary_key=True)
	name = models.charField(max_length=12)
	gender = models.BooleanField()
	birthday = models.DateField()
	department = models.charField(max_length=32)
	salary = models.DecimalField(max_digits=8,decimal_places=2)

操作数据
添加记录：
emp =  employee(name="lee",gender=True,birthday="2019-10-10",department="前端")
emp.save()
查询记录：
employee.objects.filter(age=24)
更新一条表记录：
employee.object.filter(id=1).update(birthday="2019-10-90")
删除一条表记录：
employee.object.filter(name="lee1").delete()
```

### 对应的mysql操作

```
创建表：
CREATE TABLE employee(
	id INT PRIMAARY KEY anto_increment,
	name VARCHAR(20)
	gender BIT default 1
	birthday DATA
	department VARCHAR(20)
	salary DECIMAL(8,2) unsigned
)
添加一条表记录：
INSERT employee (name,gender,birthday,salary,department) VALUES("lee",1,"2019-10-10",0000,"前端")
查询一条表：
SELECT * FROM employee WHERE age=23
更新一条表记录：
UPDATE employee SET birthday="2019-10-10" where id=1
删除一条表记录：
DELETE FEOM employee WHERE name="lee"
```

### 模型字段参数说明

```
<1> CharField
#字符串字段, 用于较短的字符串.CharField 要求必须有一个参数 maxlength, 用于从数据库层和Django校验层限制该字段所允许的最大字符数.
 
<2> IntegerField
#用于保存一个整数.
 
<3> FloatField
#一个浮点数. 必须 提供两个参数: 
参数    描述
        max_digits    总位数(不包括小数点和符号)
        decimal_places    小数位数
                举例来说, 要保存最大值为 999 (小数点后保存2位),你要这样定义字段:
                models.FloatField(..., max_digits=5, decimal_places=2)
                要保存最大值一百万(小数点后保存10位)的话,你要这样定义:  
                models.FloatField(..., max_digits=19, decimal_places=10)
                admin 用一个文本框(<input type="text">)表示该字段保存的数据.
 
<4> AutoField
# 一个 IntegerField, 添加记录时它会自动增长. 你通常不需要直接使用这个字段;
        自定义一个主键：my_id=models.AutoField(primary_key=True)
        如果你不指定主键的话,系统会自动添加一个主键字段到你的 model.
 
<5> BooleanField
#A true/false field. admin 用 checkbox 来表示此类字段.
 
<6> TextField
#一个容量很大的文本字段.admin 用一个 <textarea> (文本区域)表示该字段数据.(一个多行编辑框).
 
<7> EmailField
        一个带有检查Email合法性的 CharField,不接受 maxlength 参数.
 
<8> DateField
#一个日期字段. 共有下列额外的可选参数:
        Argument    描述
        auto_now    当对象被保存时,自动将该字段的值设置为当前时间.通常用于表示 "last-modified" 时间戳.
        auto_now_add    当对象首次被创建时,自动将该字段的值设置为当前时间.通常用于表示对象创建时间.
        （仅仅在admin中有意义...)
 
<9> DateTimeField
#一个日期时间字段. 类似 DateField 支持同样的附加选项.
 
<10> ImageField
#类似 FileField, 不过要校验上传对象是否是一个合法图片.#它有两个可选参数:height_field和width_field,
如果提供这两个参数,则图片将按提供的高度和宽度规格保存.    
        
<11> FileField
#一个文件上传字段.要求一个必须有的参数: upload_to, 一个用于保存上载文件的本地文件系统路径. 这个路径必须包含 strftime #formatting,该格式将被上载文件的 date/time，替换(so that uploaded files don't fill up the given directory).admin 用一个<input type="file">部件表示该字段保存的数据(一个文件上传部件) .
 注意：在一个 model 中使用 FileField 或 ImageField 需要以下步骤:
（1）在你的 settings 文件中, 定义一个完整路径给 MEDIA_ROOT 以便让 Django在此处保存上传文件.
 (出于性能考虑,这些文件并不保存到数据库.) 定义MEDIA_URL 作为该目录的公共 URL. 要确保该目录对
 WEB服务器用户帐号是可写的.
 （2） 在你的 model 中添加 FileField 或 ImageField, 并确保定义了 upload_to 选项,以告诉 Django
  使用 MEDIA_ROOT 的哪个子目录保存上传文件.你的数据库中要保存的只是文件的路径(相对于 MEDIA_ROOT).
  出于习惯你一定很想使用 Django 提供的 get_<#fieldname>_url 函数.举例来说,如果你的 ImageField
   叫作 mug_shot, 你就可以在模板中以 {{ object.#get_mug_shot_url }} 这样的方式得到图像的绝对路径.
 
<12> URLField
      用于保存 URL. 若 verify_exists 参数为 True (默认), 给定的 URL 会预先检查是否存在( 即URL是否被有效装入且
      没有返回404响应).
      admin 用一个 <input type="text"> 文本框表示该字段保存的数据(一个单行编辑框)
 
<13> NullBooleanField
#类似 BooleanField, 不过允许 NULL 作为其中一个选项. 推荐使用这个字段而不要用 BooleanField 加 null=True 选项，admin 用一个选择框 <select> (三个可选择的值: "Unknown", "Yes" 和 "No" ) 来表示这种字段数据.
 
<14> SlugField
#"Slug" 是一个报纸术语. slug 是某个东西的小小标记(短签), 只包含字母,数字,下划线和连字符.#它们通常用于URLs
若你使用 Django 开发版本,你可以指定 maxlength. 若 maxlength 未指定, Django 会使用默认长度: 50.  #在
以前的 Django 版本,没有任何办法改变50 这个长度.这暗示了 db_index=True.
它接受一个额外的参数: prepopulate_from, which is a list of fields from which to auto-#populate
       the slug, via JavaScript,in the object's admin form: models.SlugField
       (prepopulate_from=("pre_name", "name"))prepopulate_from 不接受 DateTimeFields.
 
<13> XMLField
一个校验值是否为合法XML的 TextField,必须提供参数: schema_path, 它是一个用来校验文本的 RelaxNG schema #的文件系统路径.
 
<14> FilePathField
 可选项目为某个特定目录下的文件名. 支持三个特殊的参数, 其中第一个是必须提供的.
        参数    描述
        path    必需参数. 一个目录的绝对文件系统路径. FilePathField 据此得到可选项目.
        Example: "/home/images".
        match    可选参数. 一个正则表达式, 作为一个字符串, FilePathField 将使用它过滤文件名. 
        注意这个正则表达式只会应用到 base filename 而不是
        路径全名. Example: "foo.*\.txt^", 将匹配文件 foo23.txt 却不匹配 bar.txt 或 foo23.gif.
        recursive可选参数.要么 True 要么 False. 默认值是 False. 是否包括 path 下面的全部子目录.
        这三个参数可以同时使用.
        match 仅应用于 base filename, 而不是路径全名. 那么,这个例子:
        FilePathField(path="/home/images", match="foo.*", recursive=True)
        ...会匹配 /home/images/foo.gif 而不匹配 /home/images/foo/bar.gif
 
<15> IPAddressField
#一个字符串形式的 IP 地址, (i.e. "24.124.1.30").

<16> CommaSeparatedIntegerField
#用于存放逗号分隔的整数值. 类似 CharField, 必须要有maxlength参数.

（17)null
如果为True，Django 将用NULL 来在数据库中存储空值。 默认值是 False.
 
(18)blank
如果为True，该字段允许不填。默认为False。
要注意，这与 null 不同。null纯粹是数据库范畴的，而 blank 是数据验证范畴的。
如果一个字段的blank=True，表单的验证将允许该字段是空值。如果字段的blank=False，该字段就是必填的。
 
(19)default
字段的默认值。可以是一个值或者可调用对象。如果可调用 ，每有新对象被创建它都会被调用。
 
(20)primary_key
如果为True，那么这个字段就是模型的主键。如果你没有指定任何一个字段的primary_key=True，
Django 就会自动添加一个IntegerField字段做为主键，所以除非你想覆盖默认的主键行为，
否则没必要设置任何一个字段的primary_key=True。
 
(21)unique
如果该值设置为 True, 这个数据字段的值在整张表中必须是唯一的
 
(22)choices
由二元组组成的一个可迭代对象（例如，列表或元组），用来给字段提供选择项。 如果设置了choices ，默认的表单将是一个选择框而不是标准的文本框，<br>而且这个选择框的选项就是choices 中的选项。

```



### ORM通用字段选项

```
#null
设为 True 时，Django 在数据库中把空值存储为 NULL 。默认为 False 。基于字符串的字段，如 CharField 和 TextField ，不应该使用 null ，因为空字符串值始终存储为空字符串，而非 NULL 。对基于字符串和不基于字符串的字段来说，如果想让表单接受空值，还要设定 blank=True 。如果想让 BooleanField 接受 null 值，使用 NullBooleanField

#blank
设为 True 时，字段允许空白值。默认为 False 。注意，这与 null 不同。null 只针对数据库，而 blank 是针对数据验证的

#choices
可迭代的对象（如列表或元组），由两个元组（包括自身）组成的可迭代对象构成（如 [(A, B), (A, B) …] ），用于设定字段的选项。如果设定这个选项，默认的表单小组件将由标准的文本字段变成带选项的选择框。各元组中的第一个元素是真正在模型上设定的值，第二个元素是人类可读的名称。

#db_column 
字段使用的数据库列名称。如未指定，Django 将使用字段的名称

#db_index
设为 True 时，在字段上建立数据库索引。

#db_tablespace
为有索引的字段指定索引使用的数据库表空间（tablespace）名称。默认为项目的 DEFAULT_INDEX_TABLESPACE 设置，或者模型的 db_tablespace 属性。如果数据库后端不支持为索引指定表空间，忽略这个选项

#default
字段的默认值。可以是一个值，也可以是一个可调用对象。为后者时，每次新建对象都会调用一次。默认值不能是可变的（mutable）对象（模型实例、列表、集，等等），因为对那个对象的引用将作为所有新模型实例中字段的默认值。

#editable
设为 False 时，字段不在管理后台或其他 ModelForm 中显示。验证模型时也会跳过。默认为 True

#error_messages
用于覆盖字段抛出异常时的默认消息。值为一个字典，通过键指定想覆盖的错误消息。错误消息键包括 null 、 blank 、 invalid 、invalid_choice 、 unique 和 unique_for_date

#help_text
在表单小组件旁显示的额外帮助文本。即便不在表单中显示，也能用作文档。注意，在自动生成的表单中，不会转义这里的 HTML，因此，如果需要，可以在帮助文本中使用 HTML。

#primary_key
设为 True 时，指定字段为模型的主键。如果模型中没有一个字段设定primary_key=True ，Django 会自动添加一个 AutoField ，用于存储主键，因此，除非想覆盖默认的主键行为，否则无需在任何字段上设定primary_key=True 。主键字段是只读的

#unique
设为 True 时，在表中字段的值必须是唯一的。这一限制由数据库层和模型验证实施。除了 ManyToManyField 、 OneToOneField 和 FileField 之外，其他字段都可以设定这个选项。

#unique_for_date
设为 DateField 或 DateTimeField 字段的名称，确保与所在字段的组合是唯一的。假如有个 title 字段设定了 unique_for_date="pub_date" ，那么Django 不允许出现 title 和 pub_date 都相同的两条记录。这个限制在验
证模型时由 Model.validate_unique() 实施，而不在数据库层实施

#unique_for_month 
类似于 unique_for_date ，不过验证唯一性时考虑的是月份

#unique_for_year
类似于 unique_for_date ，不过验证唯一性时考虑的是年份

#verbose_name
字段的人类可读名称。如果未设定，Django 将使用字段的属性名称（下划线转换成空格）自动生成一个。

#validators 
用于验证字段的验证器列表
```



### ORM查询 API

```
<1> all():                       
查询所有结果

<2> filter(**kwargs):              　 
它包含了与所给筛选条件相匹配的对象

<3> get(**kwargs):          　　　　 
返回与所给筛选条件相匹配的对象，返回结果有且只有一个，
如果符合筛选条件的对象超过一个或者没有都会抛出错误。
  
<4> exclude(**kwargs):      　　　　　　 
它包含了与所给筛选条件不匹配的对象
 
<5> order_by(*field):       　　　 　　 
对查询结果排序
  
<6> reverse():              　　
对查询结果反向排序
  
<7> count():                      
返回数据库中匹配查询(QuerySet)的对象数量。
  
<8> first():                      
返回第一条记录
  
<9> last():                      
返回最后一条记录
  
<10> exists():                     
如果QuerySet包含数据，就返回True，否则返回False
 
<11> values(*field):        　　　　  
返回一个ValueQuerySet——一个特殊的QuerySet，运行后得到的并不是一系列
model的实例化对象，而是一个可迭代的字典序列

<12> values_list(*field):   　　　　　　  
它与values()非常相似，它返回的是一个元组序列，values返回的是一个字典序列
 
<13> distinct():           　　  
从返回结果中剔除重复纪录

###F查询：
1、来比较同一个 model 实例中两个不同字段的值
Book.objects.filter(commnetNum__lt=F('keepNum'))
2、 F() 对象之间以及 F() 对象和常数之间的加减乘除和取模的操作
Book.objects.filter(commnetNum__lt=F('keepNum')*2)
3、修改操作
Book.objects.all().update(price=F("price")+30)　

###Q查询
1、Q 对象可以使用& 和| 操作符组合起来。当一个操作符在两个Q 对象上使用时，它产生一个新的Q 对象
bookList=Book.objects.filter(Q(authors__name="yuan")|Q(authors__name="egon"))

###常用方法集合：
filter 过滤
exclude 排除
annotate 聚合
order_by 排序
reverse 反向排序
distinct 去除查询结果中重复的行
values 迭代时返回字典而不是模型实例对象
values_list 迭代时返回元组而不是字典
dates 表示特定种类的所有可用日期
datetimes 表示特定种类的所有可用日期
none 不返回任何对象
all 返回所有结果
select_related 外键查询
prefetch_related 在单个批处理中自动检索每个指定查找的相关对象
defer 告诉django不要查询某些字段
using 多个数据库时控制QuerySet在哪个数据库上求值
```

### ORM 模糊查询示例

```
def index(request):
    # ===================基于双下换线的模糊查询=================
    # 1. 大于 小于     100 > x > 50
    ret = Book.objects.filter(price__gt = 50,price__lt = 100)
    print(ret) # <QuerySet [<Book: linux>]>  <QuerySet []>

    # 2.以什么开头
    ret = Book.objects.filter(title__startswith='py')
    print(ret) # <QuerySet [<Book: python红宝书>]>

    # 3.包含什么 大小写敏感
    ret = Book.objects.filter(title__contains='o')
    print(ret) # <QuerySet [<Book: python红宝书>, <Book: go>]>
    # 大小写不敏感
    ret = Book.objects.filter(title__icontains='O')
    print(ret)
    # <QuerySet [<Book: python红宝书>, <Book: go>, <Book: linuxO>]>

    # 4.在什么里面
    ret = Book.objects.filter(price__in=[100,200,50])
    print(ret) # <QuerySet [<Book: python红宝书>, <Book: go>, <Book: linuxO>]>

    # 5. 在什么范围内 100  >=  x >= 50
    ret = Book.objects.filter(price__range = [50,100])
    print(ret)  # <QuerySet [<Book: python红宝书>, <Book: go>, <Book: linuxO>]>

    # 6.在哪一年 哪一月
    ret = Book.objects.filter(pub_date__year=2018)
    print(ret) # <QuerySet [<Book: go>, <Book: linuxO>]>
    ret = Book.objects.filter(pub_date__year=2018,pub_date__month=3)
    print(ret) # <QuerySet []>
    
    return HttpResponse('OK')
    
    # 查询老男孩出版社出版过的价格大于200的书籍
    book_list = Book.objects.filter(publish='老男孩出版社',price__gt = 200)
    # 查询2017年8月出版的所有以py开头的书籍名称
    book_list = Book.objects.filter(title__startswith='py',pub_date__year=2017,pub_date__month=8).values('title')
    #查询价格为50, 100
    # 或者150的所有书籍名称及其出版社名称
    book_list = Book.objects.filter(price__in=[50,100,150]).values('title','publish')
    # 查询价格在100到200之间的所有书籍名称及其价格
    book_list = Book.objects.filter(price__range = [100,200]).values('title','price')
     # 查询所有人民出版社出版的书籍的价格（从高到低排序，去重）
    book_list = Book.objects.filter(publish='人名出版社').values('price').distinct().order_by('-price')
```

### Django session cookie 操作

```
1. 写cookie:
    response.set_cookie(key,value)
2, 读cookie:
    request.COOKIE.get(key)
3. 写session
    request.session[key] = value
        注意django对应得操作
        if request.COOKIE.get('sessionid')：
            在django-session表中更新一条记录：
                session-key                session-data
                2312312sadasdasdas2312     {"is_login":True,"username":'alice'}
        else:
            1. 生成随机字符串
            2. response.set_cookie('sessionid',2312312sadasdasdas2312)
            3. 在django-session表中创建一条记录：
                session-key                session-data
                2312312sadasdasdas2312     {"is_login":True,"username":'yuan'}
4. 读session:
    request.session[key]
        1. request.COOKIE.get('sessionid')  # 2312312sadasdasdas2312
        2. django-session表中得记录过滤
                session-key                session-data
                2312312sadasdasdas2312     {"is_login":True,"username":'yuan'}
            obj = djsngo-session.object.filter(session-key="2312312sadasdasdas2312").first()
        3. obj.session-data.get('is_login')
5. 删session:
    request.session.flush()
        1. session_str = request.COOKIE.get('sessionid')
        2. django-session.object.filter(session-key=session-str).delete()
        3. response.delete_cookie('sessionid')
```

### 缓存系统类型

```
# 全站缓存
MIDDLEWARE_CLASSES = (
    ‘django.middleware.cache.UpdateCacheMiddleware’, #第一
    'django.middleware.common.CommonMiddleware',
    ‘django.middleware.cache.FetchFromCacheMiddleware’, #最后
)

# 视图缓存
from django.views.decorators.cache import cache_page
import time
  
@cache_page(15) #超时时间为15秒
def index(request):
 t=time.time() #获取当前时间
 return render(request,"index.html",locals())
 
# 模板缓存
{% load cache %}
 <h3 style="color: green">不缓存:-----{{ t }}</h3>
  
{% cache 2 'name' %} # 存的key
 <h3>缓存:-----:{{ t }}</h3>
{% endcache %}
```

### Django中csrf实现机制

```
#第一步：django第一次响应来自某个客户端的请求时,后端随机产生一个token值，把这个token保存在SESSION状态中;同时,后端把这个token放到cookie中交给前端页面；
#第二步：下次前端需要发起请求（比如发帖）的时候把这个token值加入到请求数据或者头信息中,一起传给后端；Cookies:{csrftoken:xxxxx}
#第三步：后端校验前端请求带过来的token和SESSION里的token是否一致；
```



























































## 创建应用

```
$ django-admin.py startapp your_app_name
# 或者
$ python manage.py startapp your_app_name

```

python manage.py 和 django-admin 的功能基本一样。不同的是 python manage.py 还设置了 DJANGO_SETTINGS_MODULE 环境变量、将项目的路径加入了 sys.path 中。建议除了创建项目使用 django-admin，其他情况使用 python manage.py。

## 初始化数据

```
$ python manage.py migrate

```

## 创建缓存表

```
$ python manage.py createcachetable [cache_table_name] 
# 默认表名 django_cache

```

## 清除全部数据

```
$ python manage.py  flush --noinput

```

## 在指定端口启动服务

```
$ python manage.py runserver 0.0.0.0:8000
```

## 启动 celery 的后台任务

```
$ python manage.py celery worker --settings=settings -l info -c 4 --autoreload
```

## 启动 celery 的周期任务

```
$ python manage.py celery beat
```

## 安装项目的依赖包

```
$ pip install -r requirements.txt
```

## 关闭全部 Python 进程

```
$ taskkill -f -im python
$ taskkill -f -im python.exe

```

## 关闭全部 uwsgi 进程

```
$ ps aux|grep uwsgi|awk '{print $2}'|xargs kill -9
```

## 使用 uwsgi 启动 Django

```
$ uwsgi --ini uwsgi.ini
```
### 创建超级管理员

```
python manage.py createsuperuser
```

### 进数据库

```
python manage.py dbshell
```





























