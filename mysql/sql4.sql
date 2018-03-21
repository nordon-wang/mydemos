-- 交叉连接
select * from my_student cross join my_class;
-- my_student cross join my_class是数据源

-- 内连接
select * from my_student inner join my_class on my_student.c_id = my_class.id;
select * from my_student inner join my_class on c_id = my_class.id;
select * from my_student inner join my_class on c_id = id; -- 两张表都有id字段

-- 字段和表别名
select s.*,c.name as c_name,c.room from -- 字段别名
my_student as s inner join my_class as c -- 表别名
on s.c_id = c.id;


-- where代替on
select s.*,c.name as c_name,c.room from -- 字段别名
my_student as s inner join my_class as c -- 表别名
where s.c_id = c.id;

-- 左连接
select s.*,c.name as c_name,c.room from
my_student as s left join my_class as c -- 左表为主表: 最终记录数至少不少于左表已有的记录数
on s.c_id = c.id;

-- 右连接
select s.*,c.name as c_name,c.room from
my_student as s right join my_class as c -- 右表为主表: 最终记录数至少不少于右表已有的记录数
on s.c_id = c.id;


select s.*,c.name as c_name,c.room from
my_class as c right join my_student as s -- 左表为主表: 最终记录数至少不少于左表已有的记录数
on s.c_id = c.id;

-- 自然内连接
select * from my_student natural join my_class;

-- 自然左外连接
select * from my_student natural left join my_class;

-- 外连接模拟自然外连接: using
select * from my_student left join my_class using(id);
