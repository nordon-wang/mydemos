const express = require('express');
// 操作静态文件 -- fs
const exStatic = require('express-static');
const bodyParser = require('body-parser');
const querystring = require('querystring')
// 引入自己的my-body-parser
const bodyParser2 = require('./libs/my-body-parser')
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
// let user ={
//     'nordon':'111111'
// }

// let server = express();
// server.listen(8080);

// // 登陆
// server.get('/login',(req,res) => {
//     // http://localhost:8080/login?user=nordon&ps=111111
//     // query ===> { user: 'nordon', ps: '111111' }
//     const {user,ps} = req.query;
//     console.log(user,ps);
//     res.end();
// });
// // 注册
// server.get('/reg',(req,res) => {
//     // http://localhost:8080/login?user=nordon&ps=111111
//     // query ===> { user: 'nordon', ps: '111111' }
//     const {user,ps} = req.query;
//     console.log(user,ps);
//     res.end();
// });

// // 中间件用法
// server.use(exStatic('./www'));

/**
 * 使用 body-parser 进行接受post数据
 */
let server = express();
server.listen(9527);

// server.use(bodyParser.urlencoded({
//     extended:false, //是否开启扩展
//     limit:200 //显示post请求的数据大小
// }));

// server.use('/',(req,res) =>{
//     console.log(req.body);
// });

// server.use('/',(req,res,next) =>{
//     console.log('a');
//     // 如果不next 则下面的b是不会进行的 控制权自己控制
//     // 即 链式操作自己控制
//     next();
// });

// server.use('/',(req,res,next) =>{
//     console.log('b');
// });

/**
 * 自己实现 body-parser 中间件
 */
// 所有路径都会进来 
// server.use((req,res,next) => {
//     // req.a = 12;//在此处为req增加一个属性a 下面的req也可以拿到这个属性a
//     let str = '';
//     req.on('data',(chunk) =>{
//         str += chunk;
//     });
//     req.on('end',()=>{
//         req.body = querystring.parse(str);
//         next();
//     });
// });

// 自己的bodyParser2
function myb(req, res, next) {
    let str = '';
    req.on('data', (chunk) => {
        str += chunk;
    });
    req.on('end', () => {
        req.body = querystring.parse(str);
        next();
    });
}
// server.use(myb);
server.use(bodyParser2);

server.use('/', (req, res, next) => {
    // console.log(req.a); 拿到上面增加的a
    console.log(req.body);
    res.end('123');
});

function comp(n1, n2) {
    return n1.age - n2.age;
}

function comp2(item){
    return (n1,n2) =>{
        return n1[item] - n2[item];
    }
}

let myarr = [{
    name: 'name1',
    age: 12
},{
    name:'name2',
    age:122
},{
    name:'name3',
    age:1
},{
    name:'name4',
    age:62
}];
myarr.sort(comp2('age'));
// console.log(myarr);
var by = function(name,minor){
    return function(o,p){
        var a,b;
        if(o && p && typeof o === 'object' && typeof p ==='object'){
            a = o[name];
            b = p[name];
            if(a === b){
                return typeof minor === 'function' ? minor(o,p):0;
            }
            if(typeof a === typeof b){
                return a <b ? -1:1;
            }
            return typeof a < typeof b ? -1 : 1;
        }else{
            thro("error");
        }
    }
}
// myarr.sort(by('age',by('name')));