let http = require('http');

let httpServer = http.createServer((req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.write('111111');
    res.end();
});

httpServer.listen(8080);