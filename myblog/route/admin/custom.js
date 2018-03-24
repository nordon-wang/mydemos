const express = require('express');
const common = require('../../libs/common');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');

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

        switch (req.query.act) {
            case 'mod':
                db.query(`select * from custom_evaluation_table where id = ${req.query.id}`, (err, mod_data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('数据库错误').end();
                    } else if (mod_data.length == 0) {
                        console.error(err);
                        res.status(500).send('id有问题').end();
                    } else {
                        db.query(`select * from custom_evaluation_table`, (err, customs) => {
                            if (err) {
                                console.error(err);
                                res.status(500).send('数据库错误').end();
                            } else {
                                res.render('admin/custom.ejs', { customs, mod_data });
                            }
                        });

                    }
                });
                break;
            case 'del':
                db.query(`select * from custom_evaluation_table where id = ${req.query.id}`, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('数据库错误').end();
                    } else {
                        if (data.length == 0) {
                            console.error(err);
                            res.status(500).send('数据库错误').end();
                        } else {
                            // fs.unlink(path.join(__dirname,'../../static/upload/' + data[0].src), (err, data) => {
                            fs.unlink('static/upload/' + data[0].src, (err, data) => {
                                if (err) {
                                    console.error(err);
                                    res.status(500).send('图片删除错误').end();
                                } else {
                                    db.query(`delete from custom_evaluation_table where id = ${req.query.id}`, (err, data) => {
                                        if (err) {
                                            console.error(err);
                                            res.status(500).send('数据库错误').end();
                                        } else {
                                            res.redirect('/admin/custom');
                                        }
                                    })

                                }
                            })
                        }
                    }

                })
                break;
            default:
                db.query(`select * from custom_evaluation_table`, (err, customs) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('数据库错误').end();
                    } else {
                        res.render('admin/custom.ejs', { customs });
                    }
                });
                break;
        }


    });

    router.post('/', (req, res) => {

        let { title, description, src } = req.body;

        console.log('object--', req.files);
        // let newName = req.files[0].path + path.parse(req.files[0].originalname).ext;
        if (req.files[0]) {
            let ext = path.parse(req.files[0].originalname).ext
            let oldPath = req.files[0].path;
            let newPath = req.files[0].path + ext;// 重命名临时文件

            let newFileName = req.files[0].filename + ext;

        } else {
            let newFileName = null;
        }

        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.log('上传失败');
            }
            else {
                console.log('上传成功');
                if (req.body.mod_id) {
                    console.log('修改');
                    db.query(`update custom_evaluation_table set title='${req.body.title}',description='${req.body.description}',src='${newFileName}' where id = ${req.body.mod_id}`, (err, data) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send('数据库修改错误').end();
                        } else {
                            console.log('修改成功');
                            res.redirect('/admin/custom');
                        }
                    })
                } else {
                    db.query(`insert into custom_evaluation_table (title,description,src)  value('${title}','${description}','${newFileName}')`, (err, data) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send('数据库错误').end();
                        } else {
                            console.log('插入成功');
                            res.redirect('/admin/custom');
                        }
                    });

                }
            }
        })


    });

    return router;
}