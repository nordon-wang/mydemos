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

    console.log(`Welcome ${name} to 2080 chatroom`);

    // 监听服务端发过来的数据
    server.on('data', (chunk) => {
      try {
        var signal = JSON.parse(chunk.toString().trim());
        var procotol = signal.procotol;
        switch (procotol) {
          case 'boardcast':
            console.log('\nboardcast[' + signal.from + ']> ' + signal.message + '\n');
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

      // {"procotol":"boardcast","from":"张三","message":"弄啥咧！"}
      var send = {
        procotol: 'boardcast',
        from: name,
        message: line.toString().trim()
      };

      server.write(JSON.stringify(send));

      rl.prompt();

    });

    rl.on('close', () => {
      // console.log('Have a great day!');
      // process.exit(0);
    });

  });
});

