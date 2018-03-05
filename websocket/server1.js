const http = require('http');
const fs = require('fs');
const url = require('url');
const mysql = require('mysql');
const io = require('socket.io');

const regs = require("./libs/regs");

// 连接数据库
let db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nordon'
});

// 启动一个服务
let httpServer = http.createServer((req, res) => {

    // 根据url的参数 进行判断
    // 根据url 解构
    let { pathname, query } = url.parse(req.url, true);

    if (pathname == '/reg') {
        // 注册接口
        console.log('注册', query);

        let { user, pass } = query;

        // 1.校验数据
        if (!/^\w{6,32}$/.test(user)) {
            res.write(JSON.stringify({ code: 1, msg: '用户名不符合规范' }));
            res.end();
        } else if (!/^.{6,32}$/.test(pass)) {
            res.write(JSON.stringify({ code: 1, msg: '密码不符合规范' }));
            res.end();
        } else {
            // 2.检测用户名是否重复
            console.log('检测用户名是否重复');
            db.query('SELECT * FROM user_table where usename=' + user, (err,data) => {
                
                if (err) {
                    res.write(JSON.stringify({ code: 1, msg: '数据库的问题' }));
                    res.end();
                } else if (data.length > 0) {
                    res.write(JSON.stringify({ code: 1, msg: '用户名存在' }));
                    res.end();
                }
                else {
                    // 3.插入数据库
                    db.query(`insert into user_table(usename,password,online) values('${user}','${pass}',0)`, err => {
                        console.log('注册---插入数据库');
                        if (err) {
                            res.write(JSON.stringify({ code: 1, msg: '数据库的问题-插入' }));
                            res.end();
                        } else {
                            res.write(JSON.stringify({ code: 0, msg: '注册成功' }));
                            res.end();
                        }
                    });
                }
            })
        }

    }
    else if (pathname == '/login') {
        // 登陆
        let { user, pass } = query;
        console.log('登陆',user,pass);
        
        // 1. 校验
        if(!/^\w{6,32}$/.test(user)){
            // 校验名称
            res.write(JSON.stringify({ code: 1, msg: '校验名称失败' }));
            res.end();
        }else if(!/^.{6,32}$/.test(pass)){
            // 校验密码
            res.write(JSON.stringify({ code: 1, msg: '校验密码失败' }));
            res.end();
        }else{
            // 2. 数据库读取
            db.query(`select ID,password from user_table where usename='${user}'`, (err,data) => {
                if(err){
                    res.write(JSON.stringify({ code: 1, msg: '数据库的问题' }));
                    res.end();
                }else if(data[0].password != pass){
                    res.write(JSON.stringify({ code: 1, msg: '密码或者账号有问题' }));
                    res.end();
                }else{
                    res.write(JSON.stringify({ code: 0, msg: '登陆成功' }));
                    res.end();
                }
            })
        }


    }
    else {
        // 失败
        console.log('其他');

        fs.readFile(`www${req.url}`, (err, data) => {
            if (err) {
                console.log('err');
                res.writeHead(404);
                res.write('404');
            } else {
                res.write(data);
            }
            res.end();
        })


    }


});


httpServer.listen(8080);

