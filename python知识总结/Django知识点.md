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





























