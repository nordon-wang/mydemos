const  express = require('express');
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

    router.get('/get_banners',(req,res) => {
        
        db.query(`select * from banner_table`,(err,data) => {
            if(err){
                console.error(err);
                res.status(500).send('数据库错误').end();
            }else{
                res.send(data).end();
            }
        })

    });

    router.get('/get_customs',(req,res) => {
        res.send('data').end();
    });
    return router;
}