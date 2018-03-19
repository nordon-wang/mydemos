const querystring = require('querystring')

module.exports = function(req,res,next) {
    // req.a = 12;//在此处为req增加一个属性a 下面的req也可以拿到这个属性a
    let str = '';
    req.on('data',(chunk) =>{
        str += chunk;
    });
    req.on('end',()=>{
        req.body = querystring.parse(str);
        next();
    });
}