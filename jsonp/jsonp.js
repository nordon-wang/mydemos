let http = require('http');
let url = require('url');

http.createServer( (req,res) => {

    let {pathnamem,query} = url.parse(req.url,true);
    let {a,b,cb} = query;
    console.log(`${a}--${b}--${cb}`);
    res.write(`${cb}(${parseInt(a)+parseInt(b)})`);
    res.end();

}).listen(8080);