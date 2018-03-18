// 建立一个Socket服务端

const net = require('net');


var clients = {}; // 键值对集合 (用用户名去索引客户端socket)

var server = net.createServer((socket) => {

  // 客户端登入（此时客户端早已连接过来）
  function signin(signal) {
    var username = signal.username;
    // 登记一下
    clients[username] = socket;
    console.log(`Welcome ${username} to 2080 chatroom 当前在线${Object.keys(clients).length}`);
  }

  // 广播消息
  function boardcast(signal) {
    // console.log(signal);
    // 肯定有用户名和消息
    var username = signal.from;
    var message = signal.message;
    // 我们要发给客户端的东西
    var send = {
      procotol: signal.procotol,
      from: username,
      message: message
    };
    // 广播消息
    for (var username in clients) {
      if (clients.hasOwnProperty(username)) {
        var client = clients[username];
        client.write(JSON.stringify(send));
      }
    }
  }

  // 点对点
  function p2p(signal) {
    // 肯定有用户名和消息
    var username = signal.from;
    var target = signal.to;
    var message = signal.message;
    // 我们要发给客户端的东西
    var send = {
      procotol: signal.procotol,
      from: username,
      message: message
    };
    // 发送消息
    clients[target].write(JSON.stringify(send));
  }

  // 有任何客户端发消息都会触发
  function receiveClientData(chunk) {
    try {
      var signal = JSON.parse(chunk.toString().trim());
      var procotol = signal.procotol;
      switch (procotol) {
        case 'signin':
          signin(signal);
          break;
        case 'boardcast':
          boardcast(signal);
          break;
        case 'p2p':
          p2p(signal);
          break;
        // case 'shake':
        //   shake(signal);
        //   break;
        default:
          socket.write('弄啥咧！你要干的我干不了');
          break;
      }
    } catch (error) {
      socket.write('弄啥咧！');
    }
  }

  socket
    .on('data', receiveClientData)
    .on('error', (err) => {
      var deleteKey;
      for (var username in clients) {
        if (clients.hasOwnProperty(username)) {
          var client = clients[username];
          if (socket === client) {
            deleteKey = username;
          }
        }
      }
      delete clients[deleteKey];
      // clients.splice(clients.indexOf(socket), 1);
      console.log(`${socket.remoteAddress}下线了 当前在线${clients.length}`);
    });

});



var port = 2080;
server.listen(port, (err) => {
  if (err) {
    console.log('端口被占用');
    return false;
  }
  console.log(`服务端正常启动监听【${port}】端口`);
});