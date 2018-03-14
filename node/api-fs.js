/**
 * fs
 *  同步的错误才可以使用 try catch捕获异常
 */

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

let target = path.join(__dirname, process.argv[2] || './');

function load(target, depth) {

    let prefix = new Array(depth + 1).join('│ ');

    let dirinfos = fs.readdirSync(target);

    let dirs = [];
    let files = [];

    dirinfos.forEach(info => {
        let stats = fs.statSync(path.join(target, info));

        if (stats.isFile()) {
            files.push(info);
        } else {
            dirs.push(info);
        }
    });

    dirs.forEach(dir => {
        console.log(`${prefix}├─${dir}`);
        load(path.join(target, dir), depth + 1);
    });

    var count = files.length - 1;
    files.forEach(file => {
        var temp = count-- ? '├' : '└';
        console.log(`${prefix}${temp}─${file}`);
    });

}

load(target, 0);