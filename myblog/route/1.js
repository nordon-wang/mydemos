const express = require('express');

module.exports = () => {
    let userRouter = express.Router();

    userRouter.get('/1.html',(req,res) => {
        res.send('user1111111');
    });
    userRouter.get('/2.html',(req,res) => {
        res.send('user2222222');
    });

    return userRouter;
}