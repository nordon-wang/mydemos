let http = require('http');
let fs = require('fs');
let url = require('url');
let querystring = require('querystring');

// <script src="https://cdn.bootcss.com/jquery/3.3.0/jquery.js"></script>

http.createServer((req, res) => {

    // get
    // let {pathname,query} = url.parse(erq.url,true);

    // post
    let str = '';

    req.on('data', datas => {
        str += datas;
    });
    req.on('end', () => {

        const { pathname, query } = url.parse(req.url, true);
        const postData = querystring.parse(str);

        // 区分是读取文件还是接口
        if (pathname == '/user') {
            // 接口访问
            switch (query.act) {
                case 'reg':
                    // 1.检查用户名是否存在
                    // 2.插入
                    break;
                case 'login':
                    // 1.检查用户名是否存在
                    // 2.检查用户密码
                    break;
                default:
                    res.write('{"ok":false,"msg":"act类型错误"}');
                    res.end();
            }

        } else {
            // 文件访问 直接访问对应的文件
            fs.readFile(`./www${pathname}`, (err, data) => {
                if (err) {
                    res.write('404');
                } else {
                    res.write(data);
                }
                res.end();
            });

        }

    });


}).listen(8080);

/**
 * 访问类型
 *  文件的访问
 *  接口的访问
 */

/**
 * 接口
 *  注册
 *      /user?act=reg&user=xxx&password=xxxx
 *  登陆
 *      /user?act=login&user=xxx&passwoed=xxx
 */