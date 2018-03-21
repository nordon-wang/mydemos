-- 创建外键

create table my_foreign1(
id int primary key auto_increment,
name varchar(20) not null comment '学生姓名',
c_id int comment '班级id',	-- 普通字段
-- 增加外键
foreign key(c_id) references my_class(id)
)charset utf8;

-- 创建表
create table my_foreign2(
id int primary key auto_increment,
name varchar(20) not null comment '学生姓名',
c_id int comment '班级id'	-- 普通字段
)charset utf8;

-- 增加外键
alter table my_foreign2 add
-- 指定外键名
constraint student_class_1
-- 指定外键字段
foreign key(c_id)
-- 引用父表主键
references my_class(id);

-- 删除外键
alter table my_foreign1 drop  foreign key my_foreign1_ibfk_1;

-- 插入数据：外键字段在父表中不存在
insert into my_foreign2 values(null,'张自忠',4); -- 没有4班级
insert into my_foreign2 values(null,'项羽',1); 
insert into my_foreign2 values(null,'刘邦',2); 
insert into my_foreign2 values(null,'韩信',2); 

-- 更新父表记录
update my_class set id = 4 where id = 1; -- 失败: id=1记录已经被学生引用
update my_class set id = 4 where id = 3; -- 可以: 没有引用

-- 插入数据
insert into my_foreign1 values(null,'马超',3);
-- 增加外键
alter table my_foreign1 add foreign key(c_id) references my_class(id);

-- 创建外键: 指定模式: 删除置空,更新级联
create table my_foreign3(
id int primary key auto_increment,
name varchar(20) not null,
c_id int,
-- 增加外键
foreign key(c_id)
-- 引用表
references my_class(id)
-- 指定删除模式
on delete set null
-- 指定更新默认
on update cascade)charset utf8;

-- 插入数据
insert into my_foreign3 values(null,'刘备',1),
(null,'曹操',1),
(null,'孙权',1),
(null,'诸葛亮',2),
(null,'周瑜',2);

-- 更新父表主键
update my_class set id = 3 where id = 1;

-- 删除父表主键
delete from my_class where id = 2;

-- 联合查询
select * from my_class
union -- 默认去重
select * from my_class;

select * from my_class
union all -- 不去重
select * from my_class;

select id,c_name,room from my_class
union all -- 不去重
select name,number,id from my_student;

-- 需求: 男生升序,女生降序(年龄)
(select * from my_student where sex = '男' order by age asc limit 9999999)
union 
(select * from my_student where sex = '女' order by age desc limit 9999999);

-- 标量子查询
select * from my_student where c_id = (select id from my_class where c_name = 'PHP0710');
select * from my_student having c_id = (select id from my_class where c_name = 'PHP0710');

-- 列子查询
select * from my_student where c_id in(select id from my_class);

-- any,some,all
select * from my_student where c_id =any(select id from my_class);
select * from my_student where c_id =some(select id from my_class);
select * from my_student where c_id =all(select id from my_class);

select * from my_student where c_id !=any(select id from my_class); -- 所有结果(null除外)
select * from my_student where c_id !=some(select id from my_class); -- 所有结果(null除外)
select * from my_student where c_id !=all(select id from my_class); -- 2(null除外)


select * from my_student where
age = (select max(age) from my_student)
and
height  = (select max(height) from my_student);

-- 行子查询
select * from my_student where 
-- (age,height)称之为行元素
(age,height) = (select max(age),max(height) from my_student);

-- 表子查询
select * from my_student group by c_id order by height desc;
select * from (select * from my_student order by height desc) as student group by c_id;

-- exists子查询
select * from my_student where 
exists(select * from my_class where id = 1);

select * from my_student where 
exists(select * from my_class where id = 2);

-- 视图: 单表+多表
create view my_v1 as 
select * from my_student;

create view my_v2 as 
select * from my_class;

create view my_v3 as 
select * from my_student as s left join my_class c on s.c_id = c.id; -- id重复

-- 多表视图
create view my_v3 as 
select s.*,c.c_name,c.room from my_student as s 
left join my_class c 
on s.c_id = c.id;

-- 查看视图创建语句
show create view my_v3\G

-- 视图使用
select * from my_v1;
select * from my_v2;
select * from my_v3;

-- 修改视图
alter view my_v1 as
select id,name,age,sex,height,c_id from my_student;

-- 删除视图
drop view my_v4;

-- 多表视图插入数据
insert into my_v3 values(null,'itcast0008','张三丰','男',150,180,1,'PHP0326','D306');

-- 单表视图插入数据: 视图不包含所有不允许为空字段(学号)
insert into my_v1 values(null,'张无忌',68,'男',174,2);

-- 单表视图插入数据
insert into my_v2 values(2,'PHP0326','D306');

-- 多表视图删除数据
delete from my_v3 where id = 1;

-- 单表视图删除数据
delete from my_v2 where id = 4;

-- 多表视图更新数据
update my_v3 set c_id = 3 where id = 5;

-- 视图: age字段限制更新
create view my_v4 as 
select * from my_student where age > 30 with check option;
-- 表示视图的数据来源都是年龄大于30岁:where age > 30决定
-- with check option: 决定通过视图更新的时候,不能将已经得到的数据age > 30的改成小于30的

-- 将视图可以查到的数据改成小于30
update my_v4 set age = 29 where id = 1;

-- 可以修改数据让视图可以查到: 可以改,但是无效果
update my_v4 set age = 32 where id = 6;


-- 获取所有班级中最高的一个学生
create view my_v5 as 
select * from my_student order by height desc;

select * from my_v5 group by c_id;

-- 指定算法为临时表
create algorithm=temptable view my_v6 as 
select * from my_student order by height desc;

select * from my_v6 group by c_id;

-- 创建myisam表
create table my_myisam(
id int)charset utf8 engine = myisam;

-- 单表数据备份
select * into outfile 'D:/server/temp/student.txt' from my_student;
select * into outfile 'D:/server/temp/class.txt' from my_class;

-- 指定备份处理方式
select * into outfile 'D:/server/temp/class1.txt'
-- 字段处理
fields 
enclosed by '"' -- 数据使用双引号包裹
terminated by '|' -- 使用竖线分隔字段数据
-- 行处理
lines
starting by 'START:'

from my_class;

-- 还原数据
load data infile 'D:/server/temp/class1.txt'
into table my_class
-- 字段处理
fields 
enclosed by '"' -- 数据使用双引号包裹
terminated by '|' -- 使用竖线分隔字段数据
-- 行处理
lines
starting by 'START:';

-- SQL 备份
mysqldump -uroot -proot mydatabase my_student > D:/server/temp/student.sql

-- 整库备份
mysqldump -uroot -proot mydatabase > D:/server/temp/mydatabase.sql

-- 还原数据:mysql客户端还原
mysql -uroot -proot mydatabase < D:/server/temp/student.sql

-- SQL 指令还原SQL备份
source D:/server/temp/student.sql;