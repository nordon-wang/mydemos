-- 增加主键

create table my_pri1(
name varchar(20) not null comment '姓名',
number char(10) primary key comment '学号: itcast + 0000, 不能重复'
)charset utf8;

-- 复合主键
create table my_pri2(
number char(10) comment '学号: itcast + 0000',
course char(10) comment '课程代码: 3901 + 0000',
score tinyint unsigned default 60 comment '成绩',
-- 增加主键限制: 学号和课程号应该是个对应的,具有唯一性
primary key(number,course)
)charset utf8;

-- 追加主键
create table my_pri3(
course char(10) not null comment '课程编号: 3901 + 0000',
name varchar(10) not null comment '课程名字'
);

alter table my_pri3 modify course char(10) primary key comment '课程编号: 3901 + 0000';
alter table my_pri3 add primary key(course);

-- 向pri1表插入数据
insert into my_pri1 values('古学星','itcast0001'),('蔡仁湾','itcast0002');
insert into my_pri2 values('itcast0001','39010001',90),('itcast0001','39010002',85),('itcast0002','39010001',92);

-- 主键冲突(重复)
insert into my_pri1 values('刘辉','itcast0002'); -- 不可以: 主键冲突
insert into my_pri2 values('itcast0001','39010001',100); -- 不可以:冲突

-- 删除主键
alter table my_pri3 drop primary key;

-- 自增长
create table my_auto(
id int primary key auto_increment comment '自动增长',
name varchar(10) not null
)charset utf8;

-- 触发自增长
insert into my_auto(name) values('邓立军');
insert into my_auto values(null,'龚森');
insert into my_auto values(default,'张滔');

-- 指定数据
insert into my_auto values(6,'何思华');
insert into my_auto values(null,'陈少炼');


-- 修改表选项的值
alter table my_auto auto_increment = 4; -- 向下修改(小)
alter table my_auto auto_increment = 10; -- 向上修改 

-- 查看自增长变量
show variables like 'auto_increment%';

-- 修改自增长步长
set auto_increment_increment = 5;

-- 插入记录: 使用自增长
insert into my_auto values(null,'刘阳');
insert into my_auto values(null,'邓贤师');

-- 删除自增长
alter table my_auto modify id int primary key; -- 错误: 主键理论是单独存在
alter table my_auto modify id int; -- 有主键的时候,千万不要再加主键

-- 唯一键
create table my_unique1(
number char(10) unique comment '学号: 唯一,允许为空',
name varchar(20) not null
)charset utf8;

create table my_unique2(
number char(10) not null comment '学号',
name varchar(20) not null,
-- 增加唯一键
unique key(number)
)charset utf8;

create table my_unique3(
id int primary key auto_increment,
number char(10) not null,
name varchar(20) not null)charset utf8;

-- 追加唯一键
alter table my_unique3 add unique key(number);

-- 插入数据
insert into my_unique1 values(null,'曾光'),('itcast0001','晁松'),(null,'李帅');
insert into my_unique1 values('itcast0001','周江');

-- 删除唯一键
alter table my_unique3 drop index number;

-- 插入数据
insert into my_class values('PHP0810','B203');
insert into my_class values('PHP0810','B205');
insert into my_class values('PHP0710','B203');

-- 主键冲突: 更新
insert into my_class values('PHP0810','B205')
-- 冲突处理
on duplicate key update
-- 更新教室
room = 'B205';

-- 主键冲突:替换
replace into my_class values('PHP0710','A203');
replace into my_class values('PHP0910','B207');

-- 复制创建表
create table my_copy like my_gbk;

-- 蠕虫复制
insert into my_copy select * from my_collate_bin;
insert into my_copy select * from my_copy;


-- 更新部分a变成c
update my_copy set name = 'c' where name = 'a' limit 3;


-- 删除数据:限制记录数为10
delete from my_copy where name = 'b' limit 10;

-- 清空表: 重置自增长
truncate my_student;

-- select选项
select * from my_copy;
select all * from my_copy;

-- 去重
select distinct * from my_copy;


insert into my_student values(null,'itcast0001','张三','男'),
(null,'itcast0002','李四','男'),
(null,'itcast0003','王五','女'),
(null,'itcast0004','赵六','男'),
(null,'itcast0005','小明','男');

-- 字段别名
select 
id,
number as 学号,
name as 姓名,
sex 性别 from my_student;

-- 多表数据源
select * from my_student,my_class;


-- 子查询
select * from (select * from my_student) as s;

-- 增加age和height字段
alter table my_student add age tinyint unsigned;
alter table my_student add height tinyint unsigned;

-- 增加值: rand取得一个0到1之间的随机数, floor向下取整
update my_student set age=floor(rand() * 20 + 20),height = floor(rand()*20 + 170);

-- 找学生id为1,3,5的学生
select * from my_student where id = 1 || id = 3 || id = 5; -- 逻辑判断
select * from my_student where id in(1,3,5); -- 落在集合中

-- 找身高在180到190之间的学生
select * from my_student where height >= 180 and height <= 190;
select * from my_student where height between 180 and 190;

select * from my_student where height between 190 and 180;

-- 根据性别分组
select * from my_student group by sex;

-- 分组统计: 身高高矮,年龄平均和总年龄
select sex,count(*),max(height),min(height),avg(age),sum(age) from my_student group by sex;
select sex,count(*),count(age),max(height),min(height),avg(age),sum(age) from my_student group by sex;
select sex,count(*),count(age),max(height),min(height),avg(age),sum(age) from my_student group by sex desc;

-- 多字段分组: 先班级,后男女
select c_id,sex,count(*),group_concat(name) from my_student group by c_id,sex; -- 多字段排序


-- 统计
select c_id,count(*) from my_student group by c_id;

-- 回溯统计
select c_id,count(*) from my_student group by c_id with rollup;

-- 多字段分组回溯统计
select c_id,sex,count(*),group_concat(name) from my_student group by c_id,sex; -- 多字段排序
select c_id,sex,count(*),group_concat(name) from my_student group by c_id,sex with rollup;


-- 求出所有班级人数大于等于2的学生人数
select c_id,count(*) from my_student group by c_id having count(*) >= 2;
select c_id,count(*) from my_student where count(*) >= 2 group by c_id ;

select c_id,count(*) as total from my_student group by c_id having total >= 2;
select c_id,count(*) as total from my_student where total >= 2 group by c_id ;

-- 排序
select * from my_student group by c_id;
select * from my_student order by c_id;

-- 多字段排序: 先班级排序,后性别排序
select * from my_student order by c_id, sex desc;

-- 查询学生: 前两个
select * from my_student limit 2;

-- 查询学生: 前两个
select * from my_student limit 0,2; -- 记录数是从0开始编号
select * from my_student limit 2,2;
select * from my_student limit 4,2;