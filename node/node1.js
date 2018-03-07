let http = require('http');
let fs = require('fs');
let url = require('url'); //适合解析get请求 (表单)
let querystring = require('querystring'); //适合解析post请求 (表单)

// querystring 专门解析参数的 querystring.parse(url)

// supervisor 全局安装下 避免修改代码 重启服务

http.createServer((req, res) => {
    // req.url 请求地址
    // url.parse() 用来解析url地址 true代表解析参数

    // get请求方式获取数据 直接可以通过请求的rl拿到
    // let { pathname, query } = url.parse(req.url, true);

    // post请求方式获取数据
    /**
     * 由于post请求最大可以又1G,比get的多的太多了 -- 需要分段发送处理 不能一次性发完
     *      需要用data的end两个事件处理
     *      data会发生多次，当有一段数据到达就会触发data事件
     *          args参数是每次传输的数据
     *      end事件只会在数据传输完成的时候触发一次
     */
    //接受数据不能全部使用字符串 否则图片、视频等会错误,文本信息可以使用字符串
    let postStr = ''; 
    let postData;
    req.on('data', (datas) => {
        postStr += datas;
    });
    req.on('end', () => {
        postData = querystring.parse(postStr);
        // console.log('postData',postData)
    });



    // fs.readFile(`www${req.url}`, (err, data) => {
    //     if (err) {
    //         res.write('error');
    //         res.end();
    //     } else {
    //         res.write(data);
    //         res.end();
    //     }
    // });

    res.write('data');
    res.end();


}).listen(9527);


// fs.writeFile(文件名,内容,回调)
// fs.writeFile('www/a.html','asdaasd',err=>{
//     console.log('文件已经存在');
// });