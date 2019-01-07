### flask基本格式

```
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# 配置数据库的地址
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@localhost:3306/news?charset=utf8mb4'
# 跟踪数据库的修改，不建议开启
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class news(db.Model):
    # 定义表名
    __tablename__ = 'news'
    # 定义字段
    # db.Column 表示是一个字段
    # id = db.Column(db.Integer, primary_key=True)
    # name = db.Column(db.String(16), unique=True)
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.String(2000), nullable=False)
    types = db.Column(db.String(10), nullable=False)
    image = db.Column(db.String(300),)
    autor = db.Column(db.String(20),)
    view_count = db.Column(db.Integer)
    created = db.Column(db.DateTime)
    is_valid = db.Column(db.Boolean)

db.drop_all()
db.create_all()

@app.route('/')
def index():
    return "hahah"

if __name__ == '__main__':
    # 增加数据
    role = news(id=1, title="新闻1", content="内容1", types="123")
    db.session.add(role)
    db.session.commit()

    app.run(debug=True)
   
```



### flask常用库说明：

```
flask-sqlmeche操作数据库：
创建表：db.create_all()
删除表：db.drop_all()
添加数据：u = user(username="st",email="123",password="123")
db.session.add(u)
查询数据：user.query.filter_by(username="st").first()
filter模糊查询：user.query.filter(user.username.endwith("t")).all()
逻辑非查询：user.query.filter(user.username!="st").first()
逻辑或查询：user.query.filter(user.username=="st").first()
返回查询第一个对象：user.qurey.first()
查询所有对象：user.query.all()
删除数据：db.session.delete(user)
更新数据：user = user.query.first()
user.username = "st2"

flask-script
为Flask提供强大的命令行操作，与Django shell类似。

flask-login
Flask user session 管理，提供诸如login_user, logout_user, login_required, current_user等功能，也是其他很多Flask库的基础。

flask-admin
为Flask应用提供操作简单且易于扩展的数据库管理界面，与Django自带的数据库管理app类似。

Flask-WTF
Flask与WTForms的集成，提供强大的Form安全和校验机制，与Django内置的Form功能类似。

flask-principal
Flask强大的权限管理机制，灵活性强，提供了一个权限管理的基础框架，是很多Flask权限相关扩展的基础。

flask-restful
一个强大的Flask RESTful框架，简单好用。

flask-api
相当于Django REST Framework的Flask版，是另一个强大的Flask RESTful框架。

Flask-Mail
Flask-Mail 为Flask应用添加了SMTP 邮件发送功能

Flask-User
Flask-User集成了用户管理相关功能，并允许对功能做定制性修改，其相关功能包括Register, Confirm email, Login, Change username, Change password, Forgot password等。

Flask-User 基于Flask-SQLAlchemy，NoSQL数据库无法使用。

flask-security
Flask-Security让开发者能够很快的为应用添加常用的安全机制，其整合了Flask-Login, Flask-Mail, Flask-Principal, Flask-Script等应用。其安全机制包括：

Session based authentication
Role management
Password encryption
Basic HTTP authentication
Token based authentication
Token based account activation (optional)
Token based password recovery / resetting (optional)
User registration (optional)
Login tracking (optional)
JSON/Ajax Support
flask-babel
Flask国际化和本地化扩展，基于Babel

flask-locale
为Flask应用添加语言包，与flask-babel类似。


配置参数方式：
1、配置文件：flask引入config:app.config.from_pyfile("config.cfg")
2、对象配置参数：class Config(object)：
	DEBUG = TRUE;
	app.config.from_object(Config)
3、直接操作config字典对象：app.config["DEBUG"] = TRUE;

路由提取参数：<int:goodid>	

模板传值：
data = {
  name:"name",
  age:19
}
return render_template("index.html",**data);



其他机器访问地址设置：app.run(host='0.0.0.0',port=9000)
1、配置数据库
	a导入sqlalchemy扩展
	b创建db对象，并配置参数
	c终端数据库创建
2添加书和作者模型
	a模型继承db.model
	b__tablename__：表名
	cdb.colum：字段
	db.relationship:关系引用
3、添加数据模拟
4、使用模板显示数据库查询的数据
	a查询所得到的信息
	b按照模板格式，for循环即可

查询数据：
book = Book.query.get(id)

删除数据：
db.session.delete(id)
db.session.commit()

最常用的SQLAlchemy列类型

类型名	Python类型	说 明
Integer	int	普通整数,一般是 32 位
SmallInteger	int	取值范围小的整数,一般是 16 位
BigInteger	int 或 long	不限制精度的整数
Float	float	浮点数
Numeric	decimal.Decimal	定点数
String	str	变长字符串
Text	str	变长字符串,对较长或不限长度的字符串做了优化
Unicode	unicode	变长 Unicode 字符串
UnicodeText	unicode	变长 Unicode 字符串,对较长或不限长度的字符串做了优化
Boolean	bool	布尔值
Date	datetime.date	日期
Time	datetime.time	时间
DateTime	datetime.datetime	日期和时间
Interval	datetime.timedelta	时间间隔
Enum	str	一组字符串
PickleType	任何 Python 对象	自动使用 Pickle 序列化
LargeBinary	str	二进制文件


最常使用的SQLAlchemy列选项
选项名	说 明
primary_key	如果设为 True ,这列就是表的主键
unique	如果设为 True ,这列不允许出现重复的值
index	如果设为 True ,为这列创建索引,提升查询效率
nullable	如果设为 True ,这列允许使用空值;如果设为 False ,这列不允许使用空值
default	为这列定义默认值


常用的SQLAlchemy关系选项
选项名	说 明
backref	在关系的另一个模型中添加反向引用
primaryjoin	明确指定两个模型之间使用的联结条件。只在模棱两可的关系中需要指定
lazy	指定如何加载相关记录。可选值有 select (首次访问时按需加载)、 immediate (源对象加载后就加载)、 joined (加载记录,但使用联结)、 subquery (立即加载,但使用子查询),noload (永不加载)和 dynamic (不加载记录,但提供加载记录的查询)
uselist	如果设为 Fales ,不使用列表,而使用标量值
order_by	指定关系中记录的排序方式
secondary	指定 多对多 关系中关系表的名字

常用过滤器
过滤器	说 明
filter()	把过滤器添加到原查询上,返回一个新查询
filter_by()	把等值过滤器添加到原查询上,返回一个新查询
limit()	使用指定的值限制原查询返回的结果数量,返回一个新查询
offset()	偏移原查询返回的结果,返回一个新查询
order_by()	根据指定条件对原查询结果进行排序,返回一个新查询
group_by()	根据指定条件对原查询结果进行分组,返回一个新查询


最常使用的SQLAlchemy查询执行函数
方 法	说 明
all()	以列表形式返回查询的所有结果
first()	返回查询的第一个结果,如果没有结果,则返回 None
first_or_404()	返回查询的第一个结果,如果没有结果,则终止请求,返回 404 错误响应
get()	返回指定主键对应的行,如果没有对应的行,则返回 None
get_or_404()	返回指定主键对应的行,如果没找到指定的主键,则终止请求,返回 404 错误响应
count()	返回查询结果的数量
paginate()	返回一个 Paginate 对象,它包含指定范围内的结果

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

