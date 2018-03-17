const fs = require('fs');
const path = require('path');

function mikdirs(pathname,cb) {
    // 谁require此模块 并且调用 module.parent就是谁的信息
    let root = path.dirname(module.parent.filename);
    // 是否是绝对路径 
    pathname = path.isAbsolute(pathname)?pathname : path.join(root,pathname);
    // 获取 当前路径和需要创建的文件夹路径的 相对路径
    let relativePath = path.relative(root,pathname);
    // 将需要创建的文件夹分割
    let folders = relativePath.split(path.sep);

    try{
        let pre =  '';
        // 循环创建文件夹
        folders.forEach(folder => {
            try{
                // 根据fs.statSync 获取文件夹的信息
                // 如果文件不存在 fs.statSync将会报错 就会走catch 创建文件
                let stats = fs.statSync(path.join(root,pre,folder));
            }catch(err){
                fs.mkdirSync(path.join(root,pre,folder));
            }
            pre = path.join(pre,folder);
        });

        cb && cb(null);

    }catch(err){
        cb && cb(err);
    }

}

module.exports = mikdirs;