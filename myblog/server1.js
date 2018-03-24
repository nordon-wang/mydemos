const express = require('express')
const static = require('express-static')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const jade = require('jade')
const mysql = require('mysql')
const multer = require('multer')
const  fs = require('fs')
const path = require('path')
const consolidate = require('consolidate')


let server = express();

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'blog',
    post:3306
});


// cookie
server.use(cookieParser('asdsadfplskjdfl'))

// session
let keysArr =  [];
for (let i = 0; i < 100000; i++) {
    keysArr.push('mykeys' + Math.random());
}

server.use(cookieSession({
    name:'nordon',
    keys:keysArr,
    maxAge:1000 * 3600 * 24
}))

// post数据 body-parser接收处理
server.use(bodyParser({
    extended:false,
    limit:2000
}))

// post数据 multter接收处理
let objMulter = multer({
    dest:'./imgs'
})
server.use(objMulter.any())

// 模板引擎配置 使用consolidate
server.set('view engine','html') //输出的是啥
server.set('views','./template') //模板文件路径
server.engine('html',consolidate.ejs) //使用那种模板


/**
 * 因为会多次调用数据库进行数据的读取 采用链式调用
 */
server.get('/',(req,res,next) => {
    if(req.url == '/favicon.ico'){
        return ;
    }

    // set cookie
    res.cookie('nordon','sdadkljsdf',{
        path:'/',
        signed:true,
        maxAge:1000 * 3600 * 24
    })

    // console.log(req.cookies);
    // console.log(req.signedCookies);

    db.query(`select * from banner_table`,(err,data) => {
        if(err){
            res.status(500).send('sever err').end()
        }else{
            // console.log(data);
            /**
             * ./template/index.ejs这是错误的
             *  因为前面的views 已经设置了模板文件的路径
             */
            res.banners = data;
            next();
        }
    })
});

server.get('/',(req,res,next) => {

    db.query(`select title,content from article_table`,(err,data) => {
        if(err){
            res.status(500).send('server err article').end()
        }else{
            res.articles = data;
            next();
        }
    })
});

server.get('/',(req,res,next) => {

    res.render('index.ejs',{
        banners:res.banners,
        articles:res.articles
    })
})

server.listen(8080);
// 4. static数据 就是将所有需要的css js img 放在这个里面
server.use(static('./www'));