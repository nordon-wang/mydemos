const fs = require('fs');
// 判断文件是否存在
fs.stat('www/a.html', (err, data) => {
    if (err) {
        console.log(err);
        fs.writeFile('www/a.html', new Date(), (err) => {
            if (err) {
                console.log(err);
            }
            console.log('成功创建');
        });
    } else {
        // 存在就将其删除
        fs.unlink('www/a.html', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('删除成功');
                fs.writeFile('www/a.html', new Date(), (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('成功创建');
                });
            }
        })
    }
});

// fs.rename('www/a.html', 'www/ba.html', (err) => {
//     if (err) {
//         console.log('修改名字失败');
//     }
//     console.log('修改名字成功');
// });


// console.log(__dirname); -- D:\git\mydemos\node
// console.log(__filename); --  D:\git\mydemos\node\fs.js

