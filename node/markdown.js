const fs = require('fs');
const path = require('path');

// makdown 转为 html 需要一个库 -- marked
const marked = require('marked');

// 安装 browsersync 同步浏览器
// browsersync 需要用到python环境
const browserSync = require('browser-sync');

// 接受需要转换的文件路径
const target = path.join(__dirname, process.argv[2] || '../README.md');
// 转换为html后保存的位置
let filename = target.replace(path.extname(target), '.html');
// 获取html的文件名
let indexPath = path.basename(filename);

// 起一个文件服务器
browserSync({ 
    notify:false,
    server: path.dirname(target), //根目录
    index:indexPath //默认文档
 });

// 监视文件的变化
fs.watchFile(target, { interval: 200 }, (curr, prev) => {
    // console.log(`curr -- ${curr.size}; prev -- ${prev.size}`);
    // 根据时间 判断文件是否变化
    if (curr.mtime === prev.mtime) {
        return false;
    }

    // 读取文件 转换为新的html
    fs.readFile(target, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        let html = marked(data);

        fs.readFile(path.join(__dirname, 'github.css'), 'utf8', (err, css) => {
            if (err) {
                console.log(err);
            }
            html = templates.replace('{{{content}}}', html).replace('{{{styles}}}', css);
            fs.writeFile(target.replace(path.extname(target), '.html'), html, 'utf8', err => {
                browserSync.reload(indexPath);
                console.log('html');
            });
        })


    });
});

let templates = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>{{{styles}}}</style>
</head>

<body>
    <div class="wy">{{{content}}}</div>
</body>

</html>`;