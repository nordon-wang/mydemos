const express = require('express');
const common = require('../../libs/common');
const mysql = require('mysql');

module.exports = () => {
    let router = express.Router();

    /**
     * 检查登陆状态
     */
    // 拦截所有的请求
    // 所有的admin进入 检查session 判断是否登陆
    router.use((req, res, next) => {
        if (!req.session['admin_id'] && req.url != '/login') {
            // 没有登陆 重定向至登陆界面
            res.redirect('/admin/login');
        } else {
            // 登陆
            next();
        }
    });

    router.get('/', (req, res) => {
        // res.send('login 成功').end();
        res.render('admin/admin.ejs')
    });
   
    /**
     * login 处理
     */
    router.use('/login',require('./login.js')());

    /**
     * banner处理
     */
    router.use('/banner',require('./banners.js')());

    /**
     * custom 处理
     */
    router.use('/custom',require('./custom.js')());

    return router;

}