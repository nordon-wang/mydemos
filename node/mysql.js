const mysql = require('mysql');

// let db = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'nordon'
// });

let db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'nordon'
});




db.query('SELECT * FROM user_table', (err,data) => {
    if(err){
console.log(err);

    }else{
        console.log(data);
    }
});

// 增加  INSERT INTO user_table (usename,password,online) VALUES ('WY','123123',1);


// 删除 DELETE FROM user_table WHERE ID=3

// 改   UPDATE user_table SET password='666666'  WHERE ID=2; 

// 查 SELECT * FROM user_table;
// 查 SELECT usename,online FROM user_table WHERE ID=1;

