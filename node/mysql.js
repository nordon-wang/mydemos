const mysql = require('mysql');

let db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'nordon',
    post:3306
});

// 增
db.query(`insert into user_table values(66,'new1111','123123',1) `,(err) => {
    if(err)
        console.log(err);
});

// 查
db.query('select * from user_table where online = 1',(err,data) =>{
    if(err)
        console.log(err);
    else
        console.log(data);
});

// 改
db.query(`update user_table set online = 0 where id = 55`,err =>{

});

// 删
db.query(`delete from user_table where id = 66`,err => {

});


// 增加  INSERT INTO user_table (usename,password,online) VALUES ('WY','123123',1);


// 删除 DELETE FROM user_table WHERE ID=3

// 改   UPDATE user_table SET password='666666'  WHERE ID=2; 

// 查 SELECT * FROM user_table;
// 查 SELECT usename,online FROM user_table WHERE ID=1;

