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

给部分字段插入数据

```
insert into + 表名(字段列表) + values(值列表)[,(值列表)];
insert into test(age,name) values(18,'guo');
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













