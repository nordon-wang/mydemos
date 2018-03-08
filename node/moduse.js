/**
 * require()
 *  可以引入自己的自定义模块 也可以引入系统模块
 *  引入系统模块 直接写 require('http')
 *  引入自己的模块 需要增加 ./ 告诉系统是当前目录 require('./mod.js') 
 *      .js 可以省略 require('./mod') 
 *      
 */

/**
 * 若是想将自己的模块像系统模块那样引入，
 * 可以直接将文件放到node_modules目录下
 * 这样就可以直接像引入系统模块那样引入自己的模块
 */

const mods = require('./mod.js');

console.log(mods);