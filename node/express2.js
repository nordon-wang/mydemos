const express = require('express')
const static = require('express-static')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
// const ejs = require('ejs')
// const jade = require('jade')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const consolidate = require('consolidate')
// consolidate 模板整合 -- 将不同的模板引擎 进行整合

/**
 * 表单上传文件 必须设置enctype属性
 *      application/x-www-form-urlencoded -- 这个body-parser可以解析 就是普通的数据
 *      multipart/form-data -- 上传文件时 使用这个
 * body-parser  解析数据
 * multer       解析文件
 */

let server = express();

server.listen(9527);

// 1. 解析cookie
server.use(cookieParser('asdasdasda'));

// 2. 使用session
let keysArr = [];

for (let i = 0; i < 100000; i++) {
    keysArr.push('mykeys' + Math.random());
}
server.use(cookieSession({
    name: 'nordon',
    keys: keysArr,
    maxAge: 1000 * 3600 * 20
}))
// 3. post数据
server.use(bodyParser.urlencoded({
    extended: false,
    limit: 2000
}));
let objMulter = multer({
    dest: './www'
});
// server.use(objMulter.single('f1'));
server.use(objMulter.any());

/**
 * 配置模板引擎
 *  1.输出的是啥
 *  2.模板文件的路径
 *  3. 需要告诉使用那种模板引擎
 */
// 输出的是啥
server.set('view engine', 'html');
// 模板文件的路径
server.set('views', './jade');
// 需要告诉使用那种模板引擎
// server.engine('html',consolidate.jade);
server.engine('html', consolidate.ejs);

// 用户请求
server.get('/index', (req, res) => {
    if (req.session.userid) {
        // 登陆
        res.render('2.ejs', {
            name: 'nordon'
        });
    } else {
        // 未登陆
        res.render('login.ejs', {
            name: 'nordon'
        });
    }
});


// 用户请求
server.use('/', (req, res) => {
    if (req.url == '/favicon.ico') {
        return;
    }

    // 设置cookie
    res.cookie('nordon', 'sdsd', {
        path: '/',
        signed: true,
        maxAge: 1000 * 3600 * 20
    })
    // 获取加密的cookie 和 没有加密cookie
    // console.log('signedCookies',req.signedCookies);
    // console.log('cookies',req.cookies);

    // 设置session
    if (req.session['count']) {
        req.session['count']++;
    } else {
        req.session['count'] = 1;
    }
    // 获取session
    // console.log('session',req.session['count']);
    // get 数据
    // console.log('get query',req.query);
    // post 数据
    // console.log('post body',req.body);
    console.log('post body', req.files);
    // 获取原始文件扩展名
    let newName = req.files[0].path + path.parse(req.files[0].originalname).ext;
    // 重命名临时文件
    fs.rename(req.files[0].path, newName, (err) => {
        if (err)
            console.log('上传失败');
        else
            console.log('上传成功');
    })
    res.end('结束');
})

// 4. static数据
server.use(static('./www'));
