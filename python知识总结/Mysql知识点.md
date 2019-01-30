### flask-sqlchemy

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



### 新增数据库

```
create database + 数据库名称 + [库选项];
reate database TBL_ERROR_CODE charset utf8;
```

### 查询数据库

```
show databases;
show databases like 'pattern';
%：表示匹配多个字符；
_：表示匹配单个字符
```

### 删除数据库

```
drop database + 数据库名称;

```

### 新增表中字段

```
alter table + 表名 + add + [column] + 字段名 + 数据类型 + [列属性][位置]; 
为first（第一个位置）和after + 字段名（指定的字段后，默认为最后一个位置）.
alter table student add column id int first;
```

### 修改字段

```
alter table + 表名 + modify + 字段名 + 数据类型 + [列属性][位置];
alter table student modify name char(10) after id;
```

### 重命名字段

```
alter table + 表名 + change + 旧字段名 + 新字段名 + 数据类型 + [列属性][位置]; 
alter table student change grade class varchar(10);
```

### 删除字段

```
alter table + 表名 + drop+ 字段名;
alter table student drop age;
```

### 给全表字段插入数据

```
insert into + 表名 + values(值列表)[,(值列表)];
insert into test values('charies',18,'3.1');
```

### 给部分字段插入数据

```
insert into + 表名(字段列表) + values(值列表)[,(值列表)];
insert into test(age,name) values(18,'guo');
```

### 清除重复字段

```
select  distinct  name  from  student
```

### 查询数据

```
select * from + 表名 + [where 条件];
select * from test;
查询部分：
select + 字段名称[,字段名称] + from + 表名 + [where 条件];
select name,age,grade from test where age = '18';

select + [select 选项] + 字段列表[字段别名]/* + from + 数据源 + [where 条件] + [1] + [2] + [3]; 
[1] = [group by 子句]
[2] = [order by 子句]
[3] = [limit 子句]

多表查询：
select * from + 表名1,表名2...;

查询语句：
select * from + (select * from + 表名) + [as] + 别名;

查询排序：
SELECT id, name, gender, score FROM students ORDER BY score;
查询反序:DESC
SELECT id, name, gender, score FROM students ORDER BY score DESC;

交叉连接查询：
左表 cross join 右边;
select * from student cross join class;

内连接查询：
左表 + [inner] + join + 右表 + on + 左表.字段 = 右表.字段;
select * from student inner join class on student.grade = class.grade;

外链接查询：
左表 + left\right + join + 右表 + on + 左表.字段 = 右表.字段;
left join：左外连接（左连接），以左表为主表；
right join：右外连接（右连接），以右表为主表。
select s.*,c.id as c_id,c.grade as c_grade,room from student as s left join class as c on s.grade = c.grade;

自然内连接：
左表 + nature + join + 右表;
select * from student natural join class;

自然外链接：
左表 + nature + left/right + join + 右表;
select * from student natural left join class;

联合查询：
select 语句1 + union + [union选项] + select 语句2 + ...; 

查询字段记录总数：
SELECT COUNT(*) FROM students;



```

### 更新数据

```
update + 表名 + set + 字段 = 值 + [where 条件];
update test set age = 20 where name = 'guo';
 update + 表名 + set + 字段 = 值 + [where 条件] + [limit 更新数量];
```

### 删除数据

```
delete from + 表名 + [where 条件];
delete from test where grade = '3.1';
delete + from + 表名 + [where 条件] + [limit 删除数量];	
DELETE FROM students WHERE id>=5 AND id<=7;

```

### 新增外键

```
创建表的时候增加
foreign key(外键字段) + references + 外部表名(主键字段);

创建表之后增加外键：
alter table + 表名 + add[constraint + 外键名字] + foreign key(外键字段) + references + 外部表名(主键字段);

删除外键：
alter table + 表名 + drop foreign key + 外键名字;
```

### 数据备份

```
单表数据备份：
select */字段列表 + into outfile + '文件存储路径' + from 数据源;
select * into outfile 'D:/CoderLife/testMySQL/class.txt' from class;
```

### 插入替换已有数据

```
REPLACE INTO students (id, class_id, name, gender, score) VALUES (1, 1, '小明', 'F', 99);
```

### 数据库导入导出命令

```
导出：
mysqldump -u root -p 库名 >导出的文件.sql
导入：
mysql -u root -p 库名
```

### 查询优化技巧

```
优化策略

优化数据访问:可以缓存就不需要从数据库读取
重写 sql:复杂查询严重降低并发性,建议将复杂查询分为多个简单查询;连接 join 严重降低并发性.
重新设计表:可以增加缓存表,暂存统计数据,增加冗余列,减少连接
添加索引:生产环境80%性能问题是性能问题.

group by/Distinct/order by 语句优化
* 尽量对较少的行进行排序;
* 如果连接多张表, order by 列应该属于连接顺序的第一张表
* 利用索引排序
* groupby,orderby 语句参考的列应该尽量在一张表上,如果不在,可以考虑冗余一些列,要么合并表
* 指定 order by null: 默认 mysql 排序所有 group by 的查询,为避免排序带来消耗,可以指定 order by null
优化 limit 字句 效率差 两点:

1)限制页数,只显示前几页,查过也术后,直接显示更多( more)

2)避免设置 offset 值,也就是避免丢弃记录,可以使用条件限制要排序的结果集
```

### 索引优化技巧

```
索引中字段不超过5个
单张表索引数量建议控制5个以内
唯一键和主键不要重复
索引字段的顺序需要考虑唯一值得个数,选择性高的字段一般放在前面
复合索引的前面部分用于等值查询,后面的部分用于排序
使用 explain 判断 sql 语句是否合理使用了索引,尽量避免 Extra 列出现 Using File Sort,Using Temporary
UPDATE,DELETE 语句需要根据 WHERE 条件添加索引(啥意思)
建议不要使用 like%value 的形式, mysql 仅支持最左前缀索引
对长度过长的 VARCHAR 字段,比如网页地址建立索引时,需要增加散列字段,对varchar 使用散列算法后,散列后字段最好是整型,然后对该字段建立索引.
覆盖索引,覆盖索引一般常驻于内存中,因此可以大大提高查询效率;
把范围条件放到复合索引的最后，WHERE条件中的范围条件(BETWEEN、<、<=、>、>=)会导致后面的条件使用不了索引.。
```

### 表设计优化技巧

```
尽量将字段设置成 not null ,null值存储需要额外空间,且会导致比较运算较为复杂,这会使优化器难以优化 sql
使用更短小的列,比如短整型,短整型执行速度往往更快
存储精确浮点数时,使用decimal 替代 float 和 double
建议使用 unsigned 类型存储非负值
建议使用 INT unsighed 存储 IPV4
整型定义中不添加显示长度的值,比如使用 int, 而不是 int(4)
建议不要使用 ENUM 枚举类型
尽可能不要使用 TEXT,BLOB 类型
字符集建议使用 UTF-8
存储年时使用 YEAR 类型
存储日期时使用 DATE 类型
存储时间时建议使用 TIMESTAMP 类型,
join 字段在不同表上类型和命名要一致
```





