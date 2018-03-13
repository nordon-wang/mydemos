const path = require('path');

// console.log(__dirname);


// 合成路径
let dir = path.join(__dirname,'./www/ba.html');

// 文件夹路径
let paths = path.dirname(dir);

// 获得文件扩展名  
let fName = path.basename(dir);
// 获得文件扩展名 不带后缀 
let fName2 = path.basename(dir,'.html');

// 分隔符
let limit = path.delimiter;

// 扩展名
let extname = path.extname(dir);

// 将路径字符串解析成一个对象
let parse = path.parse(dir);

// 将一个路径的对象 合成一个路径字符串
let format = path.format(parse);

// 是否是 绝对路径
let isabsolute = path.isAbsolute(dir);

// 常规化一个路径  根据操作系统 来解析斜线
let normalize = path.normalize(dir);

// to 相对于 from 的相对路径
let relative = path.relative(dir,__dirname);

// path.win32 指 windows操作系统
// path == path.win32 ===> true
// var p = {
//     win32:p
// };
// p.win32 = p;
// console.log(p === p.win32) ===> true