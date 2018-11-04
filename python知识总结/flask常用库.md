flask常用库说明：

```
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
```

