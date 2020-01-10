### linux进入mysql

```
mysql -uroot -pf447b20a7f
mysql -uroot -p$(cat /root/.pw)
```



### 字段数据类型

```
int：整型

double：浮点型，例如double(5,2)表示最多5位，其中必须有2位小数，即最大值为999.99；

char：固定长度字符串类型； char(10)  'abc       '

varchar：可变长度字符串类型；varchar(10) 'abc'

text：字符串类型;

blob：字节类型；

date：日期类型，格式为：yyyy-MM-dd；

time：时间类型，格式为：hh:mm:ss

timestamp：时间戳类型 yyyy-MM-dd hh:mm:ss  会自动赋值

datetime:日期时间类型 yyyy-MM-dd hh:mm:ss

```



### 字段规范

```

InnoDB表是索引聚集组织表（IOT）， 所有的行数据（row data）都是以主键（严格意义讲，是聚集索引）逻辑顺序存储，而二级索引（或称辅助索引，secondary index）的value则同时包含主键。
InnoDB的最小I/O单位是data page（默认一个data page大小是16KB），在buffer pool中的最小单位是data page（而不是每行数据哦）。因此也可以这么理解，一个data page里的热点数据越多，其在buffer pool的命中率就会越高。
MySQL复制环境中，如果binlog format是row的，则从库上的数据更新时是以主键为依据进行apply的，如果没有主键则将可能会有灾难性的后果。

此外，强烈建议每张表三个必加字段：aid（int/bigint unsigned类型，自增长列，并且作为主键），create_time（timestamp或int unsigned）、update_time（和create_time相同）用于记录行创建时间以及最后更新时间，在业务上以及日常维护上会有很多便利；
`create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
`update_time` timestamp(2) NOT NULL DEFAULT CURRENT_TIMESTAMP(2) ON UPDATE CURRENT_TIMESTAMP(2) COMMENT '修改时间',


个表建议不超过30-50个字段
优先选择utf8mb4字符集，它的兼容性最好，而且还支持emoji字符。如果对存储容量比较敏感的，可以改成latin1字符集
严禁在数据库中明文存储用户密码、身份证、信用卡号（信用卡PIN码）等核心机密数据，务必先行加密
存储整型数据时，默认加上UNSIGNED，扩大存储范围
建议用INT UNSIGNED存储IPV4地址，查询时再利用INET_ATON()、INET_NTOA()函数转换
如果遇到BLOB、TEXT字段，则尽量拆出去，再用主键做关联
在够用的前提下，选择尽可能小的字段，用于节省磁盘和内存空间
涉及精确金额相关用途时，建议扩大N倍后，全部转成整型存储（例如把分扩大百倍），避免浮点数加减出现不准确问

字符类型建议采用varchar数据类型（InnoDB建议用varchar替代char）
金额货币科学计数建议采用decimal数据类型，如果运算在数据库中完成可以考虑使用bigint存储，单位：分
自增长标识建议采用int或bigint数据类型，如果该表有大量的删除及再写入就使用bigint,反之int就够用
时间类型建议采用为datetime/timestamp数据类型
禁止使用text、longtext等的数据类型
字段值如果为非负数，就加上unsigned定语，提升可用范围


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

***内连接查询：
左表 + [inner] + join + 右表 + on + 左表.字段 = 右表.字段;
select * from student inner join class on student.grade = class.grade;

SELECT employee.name,dept.name FROM employee,dept WHERE employee.deptId=dept.id;
SELECT e.name,d.name FROM employee e INNER JOIN dept d ON e.deptId=d.id;

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

查询时去除重复(distinct)：
selete DISTINCT address from student;

条件查询 and or：
查询学生的id为1，且姓名为张三的学生
selete * from student where id=1 and name='张三';(交集)


聚合查询：
Max()取最大值  min()取最小值  avg()取平均值  count()统计标的记录数量 sum()求和

需求:查询servlet的最高分

SELECT MAX(servlet) FROM student;

需求:查询mysql的最低分

SELECT MIN(mysql) FROM student;

需求:查询servlet的平均分

SELECT AVG(servlet) FROM student;

需求:查询当前有几个学生

SELECT COUNT(*) FROM student;

需求:查询servlet成绩的总和

SELETE SUM(servlet) from student;


排序查询：
按多列排序:先按照age排序，如果年纪相同，则按照薪资排序
SELECT * from employee ORDER BY age,salary DESC;


分组查询(group by)

需求:查询每个地区有多少人

SELECT address,COUNT(*) FROM student GROUP BY address;

需求:统计男女的人数

注意:where条件必须放在group by 分组之前

SELECT gender,COUNT(*) FROM student WHERE gender IS NOT NULL AND gender<>'' GROUP BY gender;



分组后筛选(having)

需求:查询哪些地区的人数是大于2个的地区

查询哪些地区多少人 2)筛选人数大于2的地区

注意:having使用在group by分组之后，对分组后的条件进行筛选

SELECT address,COUNT(*) FROM student GROUP BY address HAVING COUNT(*)>2;



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

添加外键约束(foreign key)
Constraint employee_dept_fk foreign key(deptId) references dept(id)

          　　　外键名                     外键字段  


外键约束在什么情况下会起作用？

插入数据:当往副表插入了主表中不存在的数据时，外键起作用

修改数据:当往副表中修改主表中不存在的数据时，外键起作用

删除数据:副表中有关联主表数据的情况下，当删除主表数据时，外键起作用


当有了外键之后，应该如何管理数据呢？

插入数据:先插入主表的数据，再插入副表数据

修改数据:先修改主表数据，再修改副表数据

删除数据:先删除副表数据，再删除主表数据


级联:当有了外键的时候，我们希望修改或删除数据的时候，修改或删除主表数据时，同时能够影响副表的数据，这时就可以使用级联

Create table employee(

　　Id int primary key auto_increment,

　　name varchar(20),

　　deptId int,

　　添加外键约束(foreign key)

　　添加级联修改:on update cascade

　　添加级联修改:on delete cascade

　　Constraint employee_dept_fk(外键名) foreign key(deptId) ( 外键字段 ) references dept(id) on update cascade on delete cascade
);
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



### 添加索引

```
ALTER table 表名 ADD INDEX 索引名字(字段)
```



### 索引设计

```
非唯一索引按照“i_字段名称_字段名称[_字段名]”进行命名。

唯一索引按照“u_字段名称_字段名称[_字段名]”进行命名。

索引名称使用小写。

索引中的字段数不超过5个。

唯一键由3个以下字段组成，并且字段都是整形时，使用唯一键作为主键。

没有唯一键或者唯一键不符合5中的条件时，使用自增（或者通过发号器获取）id作为主键。

唯一键不和主键重复。

索引字段的顺序需要考虑字段值去重之后的个数，个数多的放在前面。

ORDER BY，GROUP BY，DISTINCT的字段需要添加在索引的后面。

单张表的索引数量控制在5个以内，若单张表多个字段在查询需求上都要单独用到索引，需要经过DBA评估。查询性能问题无法解决的，应从产品设计上进行重构。

使用EXPLAIN判断SQL语句是否合理使用索引，尽量避免extra列出现：Using File Sort，Using Temporary。

UPDATE、DELETE语句需要根据WHERE条件添加索引。

对长度大于50的VARCHAR字段建立索引时，按需求恰当的使用前缀索引，或使用其他方法。

下面的表增加一列url_crc32，然后对url_crc32建立索引，减少索引字段的长度，提高效率。

CREATE TABLE all_url(ID INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
url VARCHAR(255) NOT NULL DEFAULT 0,      
url_crc32 INT UNSIGNED NOT NULL DEFAULT 0,
index idx_url(url_crc32));
合理创建联合索引（避免冗余），(a,b,c) 相当于 (a) 、(a,b) 、(a,b,c)。

合理利用覆盖索引。
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



### mysql常用字符串函数

```
#CANCAT(S1,S2,…Sn）   		连接 S1,S2,…Sn 为一个字符串
#INSERT(str,x,y,instr)		 将字符串 str 从第 x 位置开始，y 个字符长的子串替换为字符串 instr
#LOWER(str) 				将字符串 str 中所有字符变为小写
#UPPER(str) 				将字符串 str 中所有字符变为大写
#LEFT(str ,x) 				返回字符串 str 最左边的 x 个字符
#RIGHT(str,x) 				返回字符串 str 最右边的 x 个字符
#LPAD(str,n ,pad) 			用字符串 pad 对 str 最左边进行填充，直到长度为 n 个字符长度
#RPAD(str,n,pad) 			用字符串 pad 对 str 最右边进行填充，直到长度为 n 个字符长度
#LTRIM(str) 			    去掉字符串 str 左侧的空格
#RTRIM(str) 				去掉字符串 str 行尾的空格
#REPEAT(str,x) 				返回 str 重复 x 次的结果
#REPLACE(str,a,b) 			用字符串 b 替换字符串 str 中所有出现的字符串 a
#STRCMP(s1,s2) 				比较字符串 s1 和 s2
#TRIM(str) 					去掉字符串行尾和行头的空格
#SUBSTRING(str,x,y)          返回从字符串 str x 位置起 y 个字符长度的字串
```



### 单表查询

```
from 说明是来自那一张表
where 条件 后面可以跟比较运算符 between and in(. ). like（%表示任意字符 _表示一个字符）逻辑运算符 
group by 以某个字段的值进行分组，发生在where之后，查看组类信息依赖于聚合函数max min avg sum count
having 过滤，在group by 后面的条件筛选
order by 排序 asc升序 desc降序
limite 限制查询 记录数 limte a, b. a表示从第a个开始，b表示查询b条
```

### 多表查询

```
语法：select 字段 from t1 inner/left/right join t2 on t1.字段=t2.字段；
inner 表示只显示连接匹配的行
left：优先显示左表的全部记录
right：优先显示右表的全部记录

子查询中的关键字
in/not in：查询的结果是否在子表中
运算符：= < > !=
exits:表示存在，使用此关键字时，内层查询语句不返回查询的记录，而是返回一个布尔值，当此布尔值为真时外层语句进查询，反之不进行查询
```





