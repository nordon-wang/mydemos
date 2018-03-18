const fs = require('fs');
const path = require('path');
const net = require('net');


let server = net.createServer(socketConnect);



function socketConnect(socket){
    console.log(socket.address());
    console.log(socket.address().address);
    socket.on('data',(chunk) => {
        console.log(chunk);
    })
}

server.listen(8888,(err) =>{
    if(err){
        console.log(err);
    }
    console.log('success');
});