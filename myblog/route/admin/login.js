const express = require('express');
const common = require('../../libs/common');
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'learn',
    port: 3306
});


module.exports = () => {
    let router = express.Router();
    router.get('/', (req, res) => {
        res.render('admin/login.ejs')
    });

    router.post('/', (req, res) => {
        let { username, password } = req.body;
        console.log(typeof username, password);

        db.query(`select * from admin_table where username = '${username}'`, (err, data) => {
            if (err) {
                res.status(500).send('server err').end();
                console.log('err');
            } else {
                if (data.length > 0) {
                    if (common.md5(password + common.MD5_SUFFIX) == data[0].password) {
                        console.log('success');
                        req.session['admin_id'] = data[0].ID;
                        res.redirect('/admin/');
                    } else {
                        res.status(404).send('密码错了').end();
                    }
                } else {
                    res.status(400).send('no this admin').end();
                }
            }
        })
    });

    return router;
}