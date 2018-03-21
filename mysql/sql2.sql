-- 创建整型表
create table my_int(
int_1 tinyint,
int_2 smallint,
int_3 int,
int_4 bigint
)charset utf8;

-- 插入数据
insert into my_int values(100,100,100,100);	 -- 有效数据

insert into my_int values('a','b','199','f');	 -- 无效数据: 类型限定

insert into my_int values(255,10000,100000,1000000);	-- 错误: 超出范围

-- 给表增加一个无符号类型
alter table my_int add int_5 tinyint unsigned; -- 无符号类型

-- 插入数据
insert into my_int values(127,1000,10000,1000000,255);


alter table my_int add int_6 tinyint(1) unsigned;-- 指定显示宽度为1;

insert into my_int values(127,0,0,0,255,255);

alter table my_int add int_7 tinyint(2) zerofill; -- 显示宽度为2,0填充

insert into my_int values(1,1,1,1,1,1,1);
insert into my_int values(100,100,100,100,100,100,100);


-- 浮点数表
create table my_float(
f1 float,
f2 float(10,2),	-- 10位在精度范围之外
f3 float(6,2)	-- 6位在精度范围之内
)charset utf8;

-- 插入数据
insert into my_float values(1000.10,1000.10,1000.10); -- 符合条件
insert into my_float values(1234567890,12345678.90,1234.56); -- 符合条件
insert into my_float values(3e38,3.01e7,1234.56);
insert into my_float values(9999999999,99999999.99,9999.99); -- 最大值

-- 超出长度插入数据
insert into my_float values(123456,1234.123456768,123.9876543);	-- 小数部分OK
insert into my_float values(123456,1234.12,12345.56);	-- 整数部分超出

	

-- 创建定点数表
create table my_decimal(
f1 float(10,2),
d1 decimal(10,2)
)charset utf8;

-- 插入数据
insert into my_decimal values(12345678.90,12345678.90); -- 有效数据
insert into my_decimal values(1234.123456,1234.1234356); -- 小数部分超出:ok

insert into my_decimal values(99999999.99,99999999.99); -- 没有问题
insert into my_decimal values(99999999.99,99999999.999); -- 进位超出范围


-- 创建时间日期表
create table my_date(
d1 datetime,
d2 date,
d3 time,
d4 timestamp,
d5 year
)charset utf8;


-- 插入数据
insert into my_date values('2015-9-28 11:50:36','2015-9-28','11:50:54','2015-9-28 11:51:08',2015);

-- 时间使用负数
insert into my_date values('2015-9-28 11:50:36','2015-9-28','-11:50:54','2015-9-28 11:51:08',2015);
insert into my_date values('2015-9-28 11:50:36','2015-9-28','-211:50:54','2015-9-28 11:51:08',2015);
insert into my_date values('2015-9-28 11:50:36','2015-9-28','-2 11:50:54','2015-9-28 11:51:08',2015); -- -2过去2天:48

-- year可以使用2位或者4位
insert into my_date values('2015-9-28 11:50:36','2015-9-28','11:50:54','2015-9-28 11:51:08',69);
insert into my_date values('2015-9-28 11:50:36','2015-9-28','11:50:54','2015-9-28 11:51:08',70);

-- timestamp: 修改记录
update my_date set d1 = '2015-9-28 11:55:45' where d5 = 2069;



-- 创建枚举表
create table my_enum(
gender enum('男','女','保密')
)charset utf8;

-- 插入数据
insert into my_enum values('男'),('保密'); -- 有效数据

-- 错误数据
insert into my_enum values('male');	-- 错误: 没有该元素

-- 将字段结果取出来进行+0运算
select gender + 0, gender from my_enum;

-- 数值插入枚举元素
insert into my_enum values(1),(2);


-- 创建集合表
create table my_set(
hobby set('篮球','足球','乒乓球','羽毛球','排球','台球','网球','棒球')
--		   足球			          台球    网球
-- 集合中: 每一个元素都是对应一个二进制位,被选中为1,没有则为0: 最后反过来
--          0      1       0         0      0       1       1     0
-- 反过来    01100010 = 98

)charset utf8;

-- 插入数据
insert into my_set values('足球,台球,网球');
insert into my_set values(3); 

-- 查看集合数据
select hobby + 0, hobby from my_set;

-- 98转成二进制 = 64 + 32 + 2 = 01100010

-- 颠倒元素出现的顺序
insert into my_set values('网球,台球,足球');

-- 求出varchar在utf8和GBK下的实际最大值
create table my_utf8(
name varchar(21844) -- 21844 * 3 + 2 = 65532 + 2 = 65534
)charset utf8;

create table my_gbk(
name varchar(32766) -- 32766 * 2 + 2 = 65532 + 2 = 65534
)charset gbk;

create table my_utf81(
age tinyint,	    -- 1
name varchar(21844) -- 21844 * 3 + 2 = 65532 + 2 = 65534
)charset utf8;

create table my_gbk1(
age tinyint,	    -- 1	
name varchar(32766) -- 32766 * 2 + 2 = 65532 + 2 = 65534
)charset gbk;

-- 释放NULL
create table my_utf82(
age tinyint not null,	    -- 1
name varchar(21844) not null -- 21844 * 3 + 2 = 65532 + 2 = 65534
)charset utf8;

create table my_gbk2(
age tinyint not null,	    -- 1	
name varchar(32766) not null -- 32766 * 2 + 2 = 65532 + 2 = 65534
)charset gbk;


-- text占用十个字节长度
create table my_text(
name varchar(21841) not null, -- 21841 * 3 + 2 = 65523 + 2 = 65525
content text not null	      -- 10		
)charset utf8;

-- 创建班级表
create table my_class(
name varchar(20) not null,
room varchar(20) null -- 代表允许为空: 不写默认就是允许为空
)charset utf8;

-- 创建表
create table my_teacher(
name varchar(20) not null comment '姓名',
money decimal(10,2) not null comment '工资'
)charset utf8;


-- 默认值
create table my_default(
name varchar(20) not null,
age tinyint unsigned default 0,
gender enum('男','女','保密') default '男'
)charset utf8;

-- 插入数据
insert into my_default (name) values('高强');

insert into my_default values('范立峰',18,default);