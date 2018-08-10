## 创建 Django 工程

```
$ django-admin startproject your_project_name

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