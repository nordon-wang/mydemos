const express = require('express');

let server = express();
// route1 /user/
let routeUser = express.Router();
// http://localhost:8080/user/1.html
routeUser.get('/1.html',(req,res) =>{
    res.send('user1');
});
// http://localhost:8080/user/2.html
routeUser.get('/2.html',(req,res) => {
    res.send('user2');
});
server.use('/user',routeUser);

// route2 /article/
let routerArt = express.Router();

// http://localhost:8080/art/1.html
routerArt.get('/1.html',(req,res) =>{
    res.send('art111111');
});

// http://localhost:8080/art/2.html
routerArt.get('/2.html',(req,res) =>{
    res.send('art2222222');
});
server.use('/art',routerArt);

server.listen(8080);