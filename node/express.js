const express = require('express');
// 操作静态文件 -- fs
const exStatic = require('express-static');

/**
 * express
 *  保留了原声的方法 新增了一些新的扩展方法
 */

// let server = express();

// server.use('/a.html',(req,res) => {
//     // res.write('aaaaaaa');
//     res.send('aaaaaaaaaa11111');
//     res.end();
// });

// server.use('/b.html',(req,res) => {
//     // res.write('bbbbbbbbb');
//     res.send('bbbbbbbbb22222');
//     res.end();
// });

// server.listen(8080);

/**
 * 三种接受的方法
 *  1. .get('/',(req,res) => {})
 * 
 *  2. .post('/',(req,res) => {})
 * 
 *  3. .use('/',(req,res) => {})
 */

// let server = express();

// server.get('/',(req,res)=>{
//     console.log('get methods');
//     res.send('get methods');
//     res.end();
// });

// server.post('/', (req,res) => {
//     console.log('post method');
//     res.send('post methods');
//     res.end();
// });

// 不是get post 就使用 use -- use 也可以接受 get post 请求
// server.use('/', (req,res) => {
//     console.log('use method');
//     res.send('use methods');
//     res.end();
// });

// server.listen(8080);

/**
 * express只有最基本的功能 需要的可以自行下载 中间件(插件)
 * 在express中使用中间件(插件) exStatic
 */
let user ={
    'nordon':'111111'
}

let server = express();
server.listen(8080);

// 登陆
server.get('/login',(req,res) => {
    // http://localhost:8080/login?user=nordon&ps=111111
    // query ===> { user: 'nordon', ps: '111111' }
    const {user,ps} = req.query;
    console.log(user,ps);
    res.end();
});
// 注册
server.get('/reg',(req,res) => {
    // http://localhost:8080/login?user=nordon&ps=111111
    // query ===> { user: 'nordon', ps: '111111' }
    const {user,ps} = req.query;
    console.log(user,ps);
    res.end();
});

// 中间件用法
server.use(exStatic('./www'));