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
        if (req.url == '/favicon.ico') {
            return;
        }
        switch (req.query.act) {
            case 'mod':
                console.log('11111111', req.query.id);
                db.query(`select * from banner_table where id = ${req.query.id}`, (err, mod_data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('数据库错误').end();
                    } else if (mod_data.length == 0) {
                        console.error(err);
                        res.status(500).send('id有问题').end();
                    }
                    else {
                        db.query(`select * from banner_table`, (err, banners) => {
                            if (err) {
                                console.error(err);
                                res.status(500).send('数据库错误').end();
                            } else {
                                res.render('admin/banner.ejs', { banners, mod_data });
                            }
                        });
                    }
                });

                break;
            case 'del':
                db.query(`delete from banner_table where id = ${req.query.id}`, (err, date) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('数据库错误').end();
                    } else {
                        res.redirect('/admin/banner');
                    }
                })
                break;
            default:
                db.query(`select * from banner_table`, (err, banners) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('数据库错误').end();
                    } else {
                        res.render('admin/banner.ejs', { banners });
                    }
                });
                break;
        }

    });
    router.post('/', (req, res, next) => {
        let { title, description, href } = req.body;
        // banner 插入数据
        if (req.body.mod_id) {
            console.log('修改');
            db.query(`update banner_table set title='${req.body.title}',description='${req.body.description}',href='${req.body.href}' where id = ${req.body.mod_id}`, (err, data) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('数据库修改错误').end();
                } else {
                    console.log('修改成功');
                    res.redirect('/admin/banner');
                }
            })
        } else {
            console.log('新增');
            db.query(`insert into banner_table (title,description,href) value('${title}','${description}','${href}')`, (err, data) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('数据库错误').end();
                } else {
                    console.log('插入成功');
                    res.redirect('/admin/banner');
                }
            })
        }
    });

    return router;
}