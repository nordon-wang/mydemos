/**
 * 模拟实现require()
 */

function $require(dir){

    const fs = require('fs');
    const path = require('path');

    // 获取文件的路径
    const  filename = path.join(__dirname,dir);
    const dirname = path.dirname(filename);

    // 获取代码
    let code = fs.readFileSync(filename,'utf8');

    // 模拟 module.exports -- exports
    let module = {
        exports:{}
    };
    let exports = module.exports;

    // 自执行函数 封装一个自己的作用域
    code  = `(function($require,module,exports,dirname,filename){
        ${code}
    })($require,module,exports,dirname,filename);`;

    eval(code);

    return module.exports;
}

