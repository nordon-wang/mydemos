const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const ejs = require('ejs');
const jade = require('jade');
const consolidate = require('consolidate');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

let server = express();
server.listen(8080);

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'blog',
    port:3306
});

/**
 * cookie session
 */
server.use(cookieParser('qwesd[ojsdfisdfk'));

let keysArr =  [];
for (let i = 0; i < 100000; i++) {
    keysArr.push('mykeys' + Math.random());
}
server.use(cookieSession({
    name:'nordon',
    keys:keysArr,
    maxAge:1000 * 3600 * 24
}));

/**
 * post数据
 *  body-parser -- 处理数据
 *  multer -- 处理文件
 * get已经自带
 */
server.use(bodyParser.urlencoded({
    extended:false,
    limit:2000
}));

let multerObj = multer({
    dest:'./static/upload'
});
server.use(multerObj.any());


/**
 * 模板引擎配置 兼容处理多种模板语言
 */
server.set('view engine','html') //输出的是啥
server.set('views','./template') //模板文件路径
server.engine('html',consolidate.ejs) //使用那种模板


/**
 * 路由配置
 */
// server.use('/user',require('./route/1.js')());
// server.use('/art',require('./route/2.js')());
server.use('/',require('./route/web/index.js')());
server.use('/admin',require('./route/admin/index.js')());


/**
 * 静态文件配置
 */
server.use(static('./static'));