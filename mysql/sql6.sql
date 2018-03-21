-- 事务安全

-- 开启事务
start transaction;

-- 事务操作:1李四账户减少
update my_account set money = money - 1000 where id = 2;

-- 事务操作:2张三账户增加
update my_account set money = money + 1000 where id = 1;

-- 提交事务
commit;

-- 回滚点操作
-- 开启事务
start transaction;

-- 事务处理1: 张三加钱
update my_account set money = money + 10000 where id =  1;

-- 设置回滚点
savepoint sp1;

-- 银行扣税
update my_account set money = money - 10000 * 0.05 where id = 2; -- 错误

-- 回滚到回滚点
rollback to sp1;

-- 继续操作
update my_account set money = money - 10000 * 0.05 where id = 1;

-- 查看结果
select * from my_account;

-- 提交结果
commit;

-- 关闭事务自动提交
set autocommit = 0;

-- 查看所有系统变量
show variables;

-- 查看系统变量值
select @@version,@@autocommit,@@auto_increment_offset,@@character_set_results;

-- 修改会话级别变量
set autocommit = 0;

-- 修改会话级别变量
set @@autocommit = 0;

-- 修改全局级别变量
set global autocommit = 0;


-- 定义自定义变量
set @name = '张三';

-- 查看变量
select @name;

-- 定义变量
set @age := 18;

-- 从表中获取数据赋值给变量
select @name := name,name from my_student;

select name,age from my_student where id = 2 into @name,@age;

-- 创建表
create table my_goods(
id int primary key auto_increment,
name varchar(20) not null,
price decimal(10,2) default 1,
inv int comment '库存数量')charset utf8;

insert into my_goods values(null,'iPhone6s',5288,100),(null,'s6','6088',100);

create table my_order(
id int primary key auto_increment,
g_id int not null comment '商品ID',
g_number int comment '商品数量'
)charset utf8;

-- 触发器: 订单生成一个, 商品库存减少

-- 临时修改语句结束符
delimiter $$

create trigger after_order after insert on my_order for each row
begin
    -- 触发器内容开始
    update my_goods set inv = inv - 1 where id = 2;
   
end
-- 结束触发器
$$

-- 修改临时语句结束符
delimiter  ;

-- 查看所有触发器
show triggers\G

-- 查看触发器创建语句
show create trigger after_order\G

-- 插入订单
insert into my_order values(null,1,2);

-- 删除触发器
drop trigger after_order;


-- 触发器: 订单生成一个, 商品库存减少

-- 临时修改语句结束符
delimiter $$

create trigger after_order after insert on my_order for each row
begin
    -- 触发器内容开始: 新增一条订单: old没有,new代表新的订单记录
    update my_goods set inv = inv - new.g_number where id = new.g_id;
   
end
-- 结束触发器
$$

-- 修改临时语句结束符
delimiter  ;

-- 触发器: 订单生成之前要判断库存是否满足

-- 修改语句结束符
delimiter %%

create trigger before_order before insert on my_order for each row
begin
	-- 判断商品库存是否足够

	-- 获取商品库存: 商品库存在表中
	select inv from my_goods where id = new.g_id into @inv;

	-- 比较库存
	if @inv < new.g_number then
		-- 库存不够: 触发器没有提供一个能够阻止事件发生的能力(暴力报错)
		insert into XXX values(XXX);
		
	end if;

end
%%
-- 改回语句结束符
delimiter ;

-- 插入订单
insert into my_order values(null,1,1000);

-- 定义两个变量
set @cn = '世界你好';
set @en = 'hello world';

-- 字符串截取
select substring(@cn,1,1);
select substring(@en,1,1);
-- 字符串长度
select char_length(@cn),char_length(@en),length(@cn),length(@en);

-- 字符串寻找
select instr(@cn,'界'),instr(@en,'ll'),instr(@cn,'拜拜');

-- 字符串填充
select lpad(@cn,20,'欢迎'),lpad(@en,20,'hello');

-- 字符串替换
select insert(@en,3,3,'y'),@en;


-- 字符串比较
set @f = 'hello';
set @s = 'hey';
set @t = 'HEY';

select strcmp(@f,@s),strcmp(@s,@t),strcmp(@s,@f);

-- 创建函数
create function display1() returns int
return 100;

-- 调用函数
select display1();

-- 查看所有函数
show function status\G

-- 查看函数创建语句
show create function display1;

-- 删除函数
drop function display1;

-- 做函数: 计算1-指定数之间的和
delimiter $$
create function display1(int_1 int) returns int
begin
	-- 定义条件变量
	set @i = 1;	-- @定义的变量是全局变量,没有的可以理解为局部变量
	set @res = 0; -- 保存结果

	-- 循环求和
	while @i <= int_1 do
		-- 求和: 任何变量要修改必须使用set关键字
		-- mysql中没有+=,没有++
		set @res = @res + @i;

		-- 修改循环变量
		set @i = @i + 1;
	end while;

	-- 返回值
	return @res;
end
$$	-- 函数结束
delimiter ;


-- 求和: 1-到指定数之间的和,要求5的倍数不加
delimiter $$
create function display2(int_1 int) returns int
begin
	-- 声明变量: 循环变量, 结果变量
	declare i int default 1;
	declare res int default 0; -- 定义局部变量可以有属性

	-- 循环判断
	mywhile:while i <= int_1 do
		-- 相加: 判断
		if i % 5 = 0 then
			-- 修改循环条件
			set i = i + 1;
			-- 不符合条件: 循环重新来过
			iterate mywhile;
		end if;

		-- 相加
		set res = res + i;

		-- 改变循环变量
		set i = i + 1;
	
	end while;

	-- 返回结果
	return res;
end
$$
delimiter ;

create function display3() returns int
return 'a'; -- 错误: 编译阶段不会出错,执行阶段出错


-- 创建存储过程
create procedure pro1() -- 假设过程中需要显示数据: 使用select
select * from my_student;


-- 查看过程
show procedure status like 'pro%'\G

-- 查看过程创建语句
show create procedure pro1;

-- 调用过程
call pro1();

-- 删除过程
drop procedure pro1;

-- 过程参数
delimiter $$
create procedure pro1(in int_1 int,out int_2 int,inout int_3 int)
begin
	-- 先查看三个变量
	select int_1,int_2,int_3; -- int_2的值一定是NULL
end
$$
delimiter ;

-- 设置变量
set @int_1 := 1;
set @int_2 := 2;
set @int_3 := 3;

select @int_1,@int_2,@int_3;
call pro1(@int_1,@int_2,@int_3);
select @int_1,@int_2,@int_3;


-- 过程参数
delimiter $$
create procedure pro2(in int_1 int,out int_2 int,inout int_3 int)
begin
	-- 先查看三个变量
	select int_1,int_2,int_3; -- int_2的值一定是NULL(三个当前是局部变量)

	-- 修改局部变量
	set int_1 = 10;
	set int_2 = 100;
	set int_3 = 1000;

	-- 查看局部变量
	select int_1,int_2,int_3; 

	-- 查看全局变量
	select @int_1,@int_2,@int_3; 

	-- 修改全局变量
	set @int_1 = 'a';
	set @int_2 = 'b';
	set @int_3 = 'c';

	-- 查看全局变量
	select @int_1,@int_2,@int_3; 
end
$$
delimiter ;

-- 设置变量
set @int_1 := 1;
set @int_2 := 2;
set @int_3 := 3;

call pro2(@int_1,@int_2,@int_3); 

