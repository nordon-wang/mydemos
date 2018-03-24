-- 双中划线+空格: 注释(单行注释),也可以使用#号

-- 创建数据库
create database mydatabase charset utf8;

-- 创建关键字数据库
create database database charset utf8;

-- 使用反引号
create database `database` charset utf8;

-- 创建中文数据库
create database 中国 charset utf8;
create database `中国` charset utf8;

-- 解决方案: 告诉服务器当前中文的字符集是什么
set names gbk;
create database 中国 charset utf8;

-- 查看所有数据库
show databases;

-- 创建数据库
create database informationtest charset utf8;

-- 查看以information_开始的数据库: _需要被转义
show databases like 'information\_%';
show databases like 'information_%';	-- 相当于information%

-- 查看数据库创建语句
show create database mydatabase;
show create database `database`;	-- 关键字需要使用反引号

-- 修改数据库informationtest的字符集
alter database informationtest charset GBK;

-- 删除数据库
drop database informationtest;

-- 创建表
create table if not exists mydatabase.student(	-- 显示的将student表放到mydatabase数据库下
name varchar(10),
gender varchar(10),
number varchar(10),
age int
)charset utf8;

-- 创建数据表
-- 进入数据库
use mydatabase;

-- 创建表
create table class(
name varchar(10),
room varchar(10)
)charset utf8;

-- 查看所有表
show tables;

-- 查看以s结尾的表
show tables like '%s';

-- 查看表创建语句
show create table student\g	-- \g ==== ;
show create table student\G	-- 将查到的结构旋转90度变成纵向

-- 查看表结构
desc class;
describe class;
show columns from class;

-- 重命名表: student表 -> my_student(取数据库名字前两个字母)
rename table student to my_student;

-- 修改表选项: 字符集
alter table my_student charset = GBK;

-- 给学生表增加ID放到第一个位置
alter table my_student
add column id int
first;	-- mysql会自动寻找分号: 语句结束符

-- 将学生表中的number学号字段变成固定长度,且放到第二位(id之后)
alter table my_student
modify number char(10) after id;

-- 修改学生表中的gender字段为sex
alter table my_student
change gender sex varchar(10);

-- 删除学生表中的年龄字段(age)
alter table my_student drop age;

-- 删除数据表
drop table class;

-- 插入数据
insert into my_student values(1,'itcast0001','Jim','male'),
(2,'itcast0002','Hanmeimei','female');

-- 插入数据: 指定字段列表
insert into my_student(number,sex,name,id) values
('itcast0003','male','Tom',3),
('itcast0004','female','Lily',4);

-- 查看所有数据
select * from my_student;

-- 查看指定字段,指定条件数据
select id,number,sex,name from my_student where id = 1;	-- 查看满足id为1的学生信息

-- 更新数据
update my_student set sex  = 'female' where name = 'jim';

-- 删除数据
delete from my_student where sex = 'male';

-- 插入数据(中文)
insert into my_student values(5,'itcast0005','张越','男');

-- 查看所有字符集
show character set;

-- 查看服务器默认的对外处理的字符集
show variables like 'character_set%';

-- 修改服务器认为的客户端数据的字符集为GBK
set character_set_client = gbk;

-- 修改服务器给定数据的字符集为GBK
set character_set_results = gbk;

-- 快捷设置字符集
set names gbk;


-- 查看所有校对集
show collation;

-- 创建表使用不同的校对集
create table my_collate_bin(
name char(1)
)charset utf8 collate utf8_bin;

create table my_collate_ci(
name char(1)
)charset utf8 collate utf8_general_ci;

-- 插入数据
insert into my_collate_bin values('a'),('A'),('B'),('b');
insert into my_collate_ci values('a'),('A'),('B'),('b');

-- 排序查找
select * from my_collate_bin order by name;
select * from my_collate_ci order by name;

-- 有数据后修改校对集
alter table my_collate_ci collate = utf8_bin;
alter table my_collate_ci collate = utf8_general_ci;


SELECT class,count(class),AVG(score),max(score),min(score),sum(score) from demo_table where class = 1 group by class order by AVG(score) desc;

-- 子句是有顺序的  WHERE ... GROUP BY ... ORDER BY ... (ACS/DESC) LIMIT ...;