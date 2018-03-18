/**
 * fs
 *  同步的错误才可以使用 try catch捕获异常
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

// require('./proto.js');

/**
 *  意外错误(磁盘空间不足等...)
 *  文件权限问题
 *  文件夹找不到
 */

// 文件写入
// let filename = path.join(__dirname, 'www/b.txt');
// fs.writeFile(path.join(__dirname,'www/b.txt'),JSON.stringify({"ID":123}),(err) => {
//     console.log(err)
// });

// fs.writeFileSync(path.join(__dirname,'www/b.txt'),JSON.stringify({"ID":123}));

// let streamWrite = fs.createWriteStream(path.join(__dirname,'www/b.txt'));
// setInterval(() => {
//     streamWrite.write('hello streamWrite',err => {
//         console.log(`+1`);
//     });
// },500);

// fs.appendFile(filename,'appendFile', err =>{
// })

// fs.appendFileSync(filename,'appendFileSync');

// 打印当前目录下所有文件

// fs.readdir(__dirname,(err,files) => {
//     files.forEach( file => {
//         // console.log(__dirname,file);
//         fs.stat(path.join(__dirname,files[0]),(err,stats) => {
//             console.log(`${stats.size}--${stats.mtime.format('yyyy-MM-dd HH:mm:s')}--${file}`);
//         })
//     });
// })

// 递归打印目录树

// let target = path.join(__dirname, process.argv[2] || './');
// function load(target, depth) {
//     let prefix = new Array(depth + 1).join('│ ');
//     let dirinfos = fs.readdirSync(target);
//     let dirs = [];
//     let files = [];

//     dirinfos.forEach(info => {
//         let stats = fs.statSync(path.join(target, info));

//         if (stats.isFile()) {
//             files.push(info);
//         } else {
//             dirs.push(info);
//         }
//     });

//     dirs.forEach(dir => {
//         console.log(`${prefix}├─${dir}`);
//         load(path.join(target, dir), depth + 1);
//     });

//     var count = files.length - 1;
//     files.forEach(file => {
//         var temp = count-- ? '├' : '└';
//         console.log(`${prefix}${temp}─${file}`);
//     });

// }

// load(target, 0);

// 创建文件夹
// fs.mkdir(path.join(__dirname,'heh'));

// const mikdirs = require('./mikdirs');

// mikdirs('./demo1/demo2', err =>{
//     console.log(err);
// });

// mikdirs(path.join(__dirname,'./demo1/demo2'), err =>{
//     console.log(err);
// });

/**
 * 文件复制
 */
// fs.readFile(path.join(__dirname,'API.js'),(err,data)=>{
//     if(err){
//         console.log(err);
//     }
//     fs.writeFile('E:\\api.js',data)
// });

// 大文件 使用数据流
// 此时只是创建文件的读取流，并没有真的读出正式的数据，只是开始了读取文件的任务
// let reader = fs.createReadStream('E:\\m\\h.mp4');
// let write = fs.createWriteStream('E:\\m\\h22.mp4');
// let total = 0;
// fs.stat('E:\\m\\h.mp4', (err, stats) => {
//     // stats存在则存在
//     if(stats){
//         reader.on('data', (chunk) => {
//             // chunk 是一个buffer(字符数组)
//             write.write(chunk,err=>{
//                 console.log('write', ((total += chunk.length) / stats.size) * 100);
//             })
//         });
//         reader.on('end',()=>{
//             console.log('结束');
//         })
//     }
// });
// 使用pipe写
// reader.pipe(write);

/**
 * 读取所有文件夹
 */

http.createServer((req, res) => {

    if (req.url == 'favicon.ico') {
        return;
    }

    fs.readdir(__dirname, (err, files) => {
        // console.log(files);

        let myFiles = [];

        files.forEach((file, index) => {
            let myStat = fs.statSync(path.join(__dirname, file), (err) => {
            });
            if (myStat.isDirectory()) {
                myFiles.push(file);
            }
        });
        // console.log(myFiles);


        res.end('222');
    })

}).listen(8989);

