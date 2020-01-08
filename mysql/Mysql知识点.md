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



### MYSQL函数大全

```
数学函数：
ABS(x)         --返回x的绝对值
BIN(x)         --返回x的二进制（OCT返回八进制，HEX返回十六进制）
CEILING(x)     --返回大于x的最小整数值
EXP(x)         --返回值e（自然对数的底）的x次方
FLOOR(x)       --返回小于x的最大整数值
GREATEST(x1,x2,...,xn)
                --返回集合中最大的值
LEAST(x1,x2,...,xn)   
                --返回集合中最小的值
LN(x)           --返回x的自然对数
LOG(x,y)        --返回x的以y为底的对数
MOD(x,y)        --返回x/y的模（余数）
PI()            --返回pi的值（圆周率）
RAND()          --返回０到１内的随机值,可以通过提供一个参数(种子)使RAND()随机数生成器生成一个指定的值。
ROUND(x,y)      --返回参数x的四舍五入的有y位小数的值
SIGN(x)         --返回代表数字x的符号的值
SQRT(x)         --返回一个数的平方根
TRUNCATE(x,y)   --返回数字x截短为y位小数的结果



聚合函数：
AVG(X)           --返回指定列的平均值
COUNT(X)         --返回指定列中非NULL值的个数
MIN(X)           --返回指定列的最小值
MAX(X)           --返回指定列的最大值
SUM(X)           --返回指定列的所有值之和
GROUP_CONCAT(X)  --返回由属于一组的列值连接组合而成的结果，非常有用


字符串函数：
ASCII(char)       --返回字符的ASCII码值
BIT_LENGTH(str)   --返回字符串的比特长度
CONCAT(s1,s2...,sn) 
                  --将s1,s2...,sn连接成字符串
CONCAT_WS(sep,s1,s2...,sn)
                  --将s1,s2...,sn连接成字符串，并用sep字符间隔
INSERT(str,x,y,instr) 
                  --将字符串str从第x位置开始，y个字符长的子串替换为字符串instr，返回结果
FIND_IN_SET(str,list)
                  --分析逗号分隔的list列表，如果发现str，返回str在list中的位置
LCASE(str)或LOWER(str) 
                  --返回将字符串str中所有字符改变为小写后的结果
LEFT(str,x)       --返回字符串str中最左边的x个字符
LENGTH(s)         --返回字符串str中的字符数
LTRIM(str)        --从字符串str中切掉开头的空格
POSITION(substr,str) 
                  --返回子串substr在字符串str中第一次出现的位置
QUOTE(str)        --用反斜杠转义str中的单引号
REPEAT(str,srchstr,rplcstr)
                  --返回字符串str重复x次的结果
REVERSE(str)      --返回颠倒字符串str的结果
RIGHT(str,x)      --返回字符串str中最右边的x个字符
RTRIM(str)        --返回字符串str尾部的空格
STRCMP(s1,s2)     --比较字符串s1和s2
TRIM(str)         --去除字符串首部和尾部的所有空格
UCASE(str)或UPPER(str) 
                  --返回将字符串str中所有字符转变为大写后的结果
                  


日期时间函数：
CURDATE()或CURRENT_DATE() 
                  --返回当前的日期
CURTIME()或CURRENT_TIME() 
                  --返回当前的时间
DATE_ADD(date,INTERVAL int keyword)
                  --返回日期date加上间隔时间int的结果(int必须按照关键字进行格式化)
例如
SELECT DATE_ADD(CURRENT_DATE,INTERVAL 6 MONTH);

DATE_FORMAT(date,fmt)  
                  --依照指定的fmt格式格式化日期date值
DATE_SUB(date,INTERVAL int keyword)
                  --返回日期date加上间隔时间int的结果(int必须按照关键字进行格式化)
例如
SELECT DATE_SUB(CURRENT_DATE,INTERVAL 6 MONTH);

DAYOFWEEK(date)   --返回date所代表的一星期中的第几天(1~7)
DAYOFMONTH(date)  --返回date是一个月的第几天(1~31)
DAYOFYEAR(date)   --返回date是一年的第几天(1~366)
DAYNAME(date)     --返回date的星期名，如：SELECT DAYNAME(CURRENT_DATE);
FROM_UNIXTIME(ts,fmt)  
                  --根据指定的fmt格式，格式化UNIX时间戳ts
HOUR(time)        --返回time的小时值(0~23)
MINUTE(time)      --返回time的分钟值(0~59)
MONTH(date)       --返回date的月份值(1~12)
MONTHNAME(date)   --返回date的月份名，如：SELECT MONTHNAME(CURRENT_DATE);
NOW()             --返回当前的日期和时间
QUARTER(date)     --返回date在一年中的季度(1~4)
例如
SELECT QUARTER(CURRENT_DATE);

WEEK(date)        --返回日期date为一年中第几周(0~53)
YEAR(date)        --返回日期date的年份(1000~9999)
例如，获取当前系统时间
SELECT FROM_UNIXTIME(UNIX_TIMESTAMP());
SELECT EXTRACT(YEAR_MONTH FROM CURRENT_DATE);
SELECT EXTRACT(DAY_SECOND FROM CURRENT_DATE);
SELECT EXTRACT(HOUR_MINUTE FROM CURRENT_DATE);

返回两个日期值之间的差值(月数)
SELECT PERIOD_DIFF(200302,199802);

在Mysql中计算年龄：
SELECT DATE_FORMAT(FROM_DAYS(TO_DAYS(NOW())-TO_DAYS(birthday)),'%Y')+0 AS age FROM employee;
这样，如果Brithday是未来的年月日的话，计算结果为0。
下面的SQL语句计算员工的绝对年龄，即当Birthday是未来的日期时，将得到负值。
SELECT DATE_FORMAT(NOW(), '%Y') 
- DATE_FORMAT(birthday, '%Y') 
-(DATE_FORMAT(NOW(), '00-%m-%d') 
< DATE_FORMAT(birthday, '00-%m-%d')) AS age from employee



加密函数：
AES_ENCRYPT(str,key)  
                  --返回用密钥key对字符串str利用高级加密标准算法加密后的结果，调用AES_ENCRYPT的结果是一个二进制字符串，以BLOB类型存储
AES_DECRYPT(str,key)  
                  --返回用密钥key对字符串str利用高级加密标准算法解密后的结果
DECODE(str,key)   --使用key作为密钥解密加密字符串str
ENCRYPT(str,salt) --使用UNIXcrypt()函数，用关键词salt(一个可以惟一确定口令的字符串，就像钥匙一样)加密字符串str
ENCODE(str,key)   --使用key作为密钥加密字符串str，调用ENCODE()的结果是一个二进制字符串，它以BLOB类型存储
MD5()             --计算字符串str的MD5校验和
PASSWORD(str)     --返回字符串str的加密版本，这个加密过程是不可逆转的，和UNIX密码加密过程使用不同的算法。
SHA()             --计算字符串str的安全散列算法(SHA)校验和

例如
SELECT ENCRYPT('root','salt');
SELECT ENCODE('xufeng','key');
SELECT DECODE(ENCODE('xufeng','key'),'key');#加解密放在一起
SELECT AES_ENCRYPT('root','key');
SELECT AES_DECRYPT(AES_ENCRYPT('root','key'),'key');
SELECT MD5('123456');
SELECT SHA('123456');


控制流函数：
CASE WHEN [test1] THEN [result1]...ELSE [default] END 
                    --如果test1是真，则返回result1，否则返回default
CASE [test] WHEN [val1] THEN [result]...ELSE [default] END  
                    --如果test和valN相等，则返回result，否则返回default
IF(test,t,f)        --如果test是真，返回t；否则返回f
IFNULL(arg1,arg2)   --如果arg1不是空，返回arg1，否则返回arg2
NULLIF(arg1,arg2)   --如果arg1=arg2返回NULL；否则返回arg1

这些函数的第一个是IFNULL()，它有两个参数，并且对第一个参数进行判断。
如果第一个参数不是NULL，函数就会向调用者返回第一个参数；
如果是NULL,将返回第二个参数。
例如
SELECT IFNULL(1,2), 
IFNULL(NULL,10),
IFNULL(4*NULL,'false');

NULLIF()函数将会检验提供的两个参数是否相等，如果相等，则返回NULL，
如果不相等，就返回第一个参数。
例如
SELECT NULLIF(1,1),
NULLIF('A','B'),
NULLIF(2+3,4+1);

MySQL的IF()函数也可以建立一个简单的条件测试，
这个函数有三个参数，第一个是要被判断的表达式，
如果表达式为真，IF()将会返回第二个参数，
如果为假，IF()将会返回第三个参数。
例如
SELECT IF(1<10,2,3),IF(56>100,'true','false');
IF()函数在只有两种可能结果时才适合使用。
然而，在现实世界中，我们可能发现在条件测试中会需要多个分支。
在这种情况下，它和PHP及Perl语言的switch-case条件例程一样。

CASE函数的格式有些复杂，通常如下所示：
CASE [expression to be evaluated]
WHEN [val 1] THEN [result 1]
WHEN [val 2] THEN [result 2]
WHEN [val 3] THEN [result 3]
......
WHEN [val n] THEN [result n]
ELSE [default result]
END
这里，第一个参数是要被判断的值或表达式，接下来的是一系列的WHEN-THEN块，
每一块的第一个参数指定要比较的值，如果为真，就返回结果。
所有的WHEN-THEN块将以ELSE块结束，当END结束了所有外部的CASE块时，
如果前面的每一个块都不匹配就会返回ELSE块指定的默认结果。
如果没有指定ELSE块，而且所有的WHEN-THEN比较都不是真，MySQL将会返回NULL。
CASE函数还有另外一种句法，有时使用起来非常方便，如下：
CASE
WHEN [conditional test 1] THEN [result 1]
WHEN [conditional test 2] THEN [result 2]
ELSE [default result]
END
这种条件下，返回的结果取决于相应的条件测试是否为真。
例如：
SELECT CASE 'green'
     WHEN 'red' THEN 'stop'
     WHEN 'green' THEN 'go' END;

SELECT CASE 9 
WHEN 1 THEN 'a'
WHEN 2 THEN 'b' ELSE 'N/A' END;

SELECT CASE WHEN (2+2)=4 THEN 'OK' 
WHEN (2+2)<>4 THEN 'not OK' END AS STATUS;

SELECT Name,IF((IsActive = 1),'已激活','未激活') AS RESULT 
FROM UserLoginInfo;

SELECT fname,lname,(math+sci+lit) AS total,
CASE WHEN (math+sci+lit) < 50 THEN 'D'
     WHEN (math+sci+lit) BETWEEN 50 AND 150 THEN 'C'
     WHEN (math+sci+lit) BETWEEN 151 AND 250 THEN 'B'
ELSE 'A' END AS grade FROM marks;

SELECT IF(ENCRYPT('sue','ts')=upass,'allow','deny') AS LoginResult
FROM users WHERE uname = 'sue';


格式化函数：
DATE_FORMAT(date,fmt)  
                  --依照字符串fmt格式化日期date值
FORMAT(x,y)       --把x格式化为以逗号隔开的数字序列，y是结果的小数位数
INET_ATON(ip)     --返回IP地址的数字表示
INET_NTOA(num)    --返回数字所代表的IP地址
TIME_FORMAT(time,fmt)  
                  --依照字符串fmt格式化时间time值
其中最简单的是FORMAT()函数，
它可以把大的数值格式化为以逗号间隔的易读的序列。
例如
SELECT FORMAT(34234.34323432,3);
SELECT DATE_FORMAT(NOW(),'%W,%D %M %Y %r');
SELECT DATE_FORMAT(NOW(),'%Y-%m-%d');
SELECT DATE_FORMAT(19990330,'%Y-%m-%d');
SELECT DATE_FORMAT(NOW(),'%h:%i %p');
SELECT INET_ATON('10.122.89.47');
SELECT INET_NTOA(175790383);


类型转化函数：
为了进行数据类型转化，MySQL提供了CAST()函数，
它可以把一个值转化为指定的数据类型。
类型有：BINARY,CHAR,DATE,TIME,DATETIME,SIGNED,UNSIGNED
例如
SELECT CAST(NOW() AS SIGNED INTEGER),CURDATE()+0;
SELECT 'f'=BINARY 'F','f'=CAST('F' AS BINARY);


系统信息函数：
DATABASE()        --返回当前数据库名
BENCHMARK(count,expr)  
                  --将表达式expr重复运行count次
CONNECTION_ID()   --返回当前客户的连接ID
FOUND_ROWS()      --返回最后一个SELECT查询进行检索的总行数
USER()或SYSTEM_USER()  
                  --返回当前登陆用户名
VERSION()         --返回MySQL服务器的版本
例如
SELECT DATABASE(),VERSION(),USER();
SELECTBENCHMARK(9999999,LOG(RAND()*PI()));# 
该例中,MySQL计算LOG(RAND()*PI())表达式9999999次。
```

