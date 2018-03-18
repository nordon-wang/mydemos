// 客户端

const net = require('net');

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.question('What is your name? ', (name) => {
  name = name.trim();
  if (!name) {
    throw new Error('没名字还出来混。。');
  }
  // 创建于服务端的连接
  var server = net.connect({ port: 2080, host: '192.168.1.4' }, () => {

    // 登入操作
    var user = {
      procotol: 'signin',
      username: name
    }
    server.write(JSON.stringify(user));

    console.log(`Welcome ${name} to 2080 chatroom`);

    // 监听服务端发过来的数据
    server.on('data', (chunk) => {
      try {
        // {"procotol":"p2p","from":"张三","to":"李四","message":"弄啥咧！"}
        var signal = JSON.parse(chunk.toString().trim());
        var procotol = signal.procotol;
        switch (procotol) {
          case 'boardcast':
            console.log('\nboardcast[' + signal.from + ']> ' + signal.message + '\n');
            rl.prompt();
            break;
          case 'p2p':
            console.log('\np2p[' + signal.from + ']> ' + signal.message + '\n');
            rl.prompt();
            break;
          default:
            server.write('弄啥咧！你要干的我干不了');
            break;
        }
      } catch (error) {
        server.write('弄啥咧！');
      }
    });

    rl.setPrompt(name + '> '); // 此时没有写到控制台

    rl.prompt(); // 写入控制台

    // 输入一行内容敲回车    
    rl.on('line', (line) => {
      // line user2:sjkdasdkasjkd
      line = line.toString().trim();
      var temp = line.split(':');
      var send;
      if (temp.length === 2) {
        // 点对点
        send = {
          procotol: 'p2p',
          from: name,
          to: temp[0],
          message: temp[1]
        };
      } else {
        // 广播消息
        send = {
          procotol: 'boardcast',
          from: name,
          message: line
        };
      }
      // chunk：{"procotol":"p2p","from":"张三","to":"李四","message":"弄啥咧！"}
      server.write(JSON.stringify(send));
      rl.prompt();

    });

    rl.on('close', () => {
      // console.log('Have a great day!');
      // process.exit(0);
    });

  });
});

