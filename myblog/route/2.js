const express = require('express');

module.exports =  () => {
    // route2 /article/
    let routerArt = express.Router();

    // http://localhost:8080/art/1.html
    routerArt.get('/1.html', (req, res) => {
        res.send('art111111');
    });

    // http://localhost:8080/art/2.html
    routerArt.get('/2.html', (req, res) => {
        res.send('art2222222');
    });
    return routerArt;
}