const fs = require('fs');
const url = require('url');
const mysql = require('mysql');
const http = require('http');
const io = require('socket.io');

// 连接数据库
let db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nordon'
});

// 启动一个服务
let httpServer = http.createServer((req, res) => {
    fs.readFile(`www${req.url}`, (err,data) => {
        if(err){
            console.log(err);
            res.writeHead(404);
            res.write('not find');
        }else{
            res.write(data);
        }

        res.end();
    })
});


httpServer.listen(8080);


let wxServer = io.listen(httpServer);

/**
 * 模拟广播
 *  使用有个数组将所有用户添加至这个数据中
 */
let aSock = [];
wxServer.on('connection',function (sock) {

    aSock.push(sock);

    // 当前登陆的用户名 和 ID
    let cur_username = '';
    let cur_ID = 0;

    // test
    sock.on('a',(n1,n2)=>{
        console.log(n1,n2);
    })
	
    // 注册接口
    sock.on('reg',(user,pass) => {
        // console.log(`注册数据${user},${pass}`);
            
        let _user = user, _pass = pass;
        // 校验数据
        if(!/^\w{6,32}$/.test(_user)){
            // 返回注册结果接口
             sock.emit('regRes',1,'用户名不符合规范');
        }else if(!/^.{6,32}$/.test(_pass)){
             sock.emit('regRes',1,'密码不符合规范');
        }else{
            // 数据库查询
            db.query(`select * from user_table where usename='${_user}'`, (err,data) =>{
                if(err){
                    sock.emit('regRes',1,'数据库err了');
                }else if(data.length > 0){
                    sock.emit('regRes',1,'用户名已经存在');
                }
                else{
                    // 数据插入
                    db.query(`insert into user_table (usename, password,online) values('${_user}','${_pass}',0)`, err => {
                        if(err){
                            sock.emit('regRes',1,'数据库插入失败');
                        }else{
                            sock.emit('regRes',0,'数据库插入成功');
                        }
                    });
                }
            })
        }
    });

    // 登陆接口
    sock.on('login',(user,pass) =>{
        console.log(`登陆数据${user},${pass}`);
        let _user = user, _pass = pass;

        // 校验数据
        if(!/^\w{6,32}$/.test(_user)){
            // 返回注册结果接口
             sock.emit('loginRes',1,'用户名不符合规范');
        }else if(!/^.{6,32}$/.test(_pass)){
             sock.emit('loginRes',1,'密码不符合规范');
        }else{
            // 数据库查询
            db.query(`select ID,password from user_table where usename='${_user}'`, (err,data) =>{
                if(err){
                    sock.emit('loginRes',1,'数据库err了');
                }else if(data.length == 0){
                    sock.emit('loginRes',1,'用户不存在');
                }
                else if(data[0].password != _pass){
                    sock.emit('loginRes',1,'密码或者账号有问题');
                }
                else{
                    // 登陆成功 更改数据对应的online

                    db.query(`update user_table set online=1 where ID=${data[0].ID}`, err => {
                        if(err) {
                            sock.emit('loginRes',1,'更改状态失败');
                        }else{
                            sock.emit('loginRes',0,'登陆成功');
                            cur_username = _user;
                            cur_ID = data[0].ID;
                        }
                    });
                }
            })
        }
    });

    // 留言 
    sock.on('msg', txt =>{
        if(!txt){
            sock.emit('msgRes',1,'留言不能为空');
        }else{
            // 广播给所有人
            aSock.forEach(item => {
                if(item == sock){
                    return ;
                }else{
                    item.emit('msg',cur_username,txt);
                }
            });
        }
        // 结束之后  给当前发送留言的用户一个反馈
        sock.emit('msgRes',0,'留言提交成功');
    })
    
    // 离线
    sock.on('disconnect',() => {
        
        db.query(`update user_table set online=0 where ID=${cur_ID}`,err =>{
            if(err){
                console.log('离线成功，更改当前用户的online失败');
            }else{
                console.log('离线成功，更改当前用户的online成功');
                cur_username = '';
                cur_ID = 0;
                
                // 将当前的socl 移除
                aSock.filter(item => item!=sock);
            }
        });
    })

});

