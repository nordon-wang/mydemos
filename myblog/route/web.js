const express = require('express');


module.exports = () => {
    let router = express.Router();

    router.get('/',(req,res) => {
        res.send('我的web')
    });

    return router;

}