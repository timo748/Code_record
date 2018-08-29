### python知识点：

```
安装虚拟环境：pip install pipenv
安装：pipenv install
启动：python3 -m pipenv shell
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
```

