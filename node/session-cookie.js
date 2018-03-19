const express = require('express')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')


let server = express();
server.listen(9527);

/**
 * cookie 
 *  1. 在浏览器保存一些数据 每次请求都会带过来
 *  2. cookie空间非常小--要省着用
 *  3. 安全性非常差
 *      3.1  校验cookie是否被篡改-- 使用签名
 * 
 * cookie读取
 *      -- cookie-parse
 *          --- server.use(cookieParser('qweqwsaddfgldksfg'));
 *          --- req.cookies
 *          --- req.signedCookies
 *  
 * cookie发送
 *      res.cookie(key,value,options)
 * 
 * cookie删除
 *      -- res.clearCookie(key)
 * 
 * cookie加密 -- 没啥用， 解密就是点时间问题而已
 *  -- cookie-encrypter
 */

// 需要和 res.secret的值对应 才能进行解读签名
// server.use(cookieParser('qweqwsaddfgldksfg'));

// server.use('/',(req,res) => {
//     req.secret = 'qweqwsaddfgldksfg'; //签名 可以不加，因为cookieParser()加了签名之后 内部会自动为secret增加
//     res.cookie('name','nordon',{
//         path:'/aaa',
//         maxAge:1000 * 60 * 60,
//         signed:true //签名 -- 防止cookie被篡改 需要提供secret
//     });
//     // 有的cookie需要进行签名 有的不需要 读取的时候需要特殊处理
//     // 由于cookie的大小是受限制的 不可能全部都使用签名处理, 签名之后的cookie会增加所占的空间
//     console.log('没有签名cookie',req.cookies);
//     console.log('签名cookie',req.signedCookies);
//     res.end('end');
// })


/**
 * session -- 安全 无限(限制于数据库大小)
 *  1. 保存数据，保存在服务端，
 *  2.session基于cookie实现的
 *  3.隐患--session劫持 
 *  4. cookie中会有一个session的ID，服务器利用sessionID找到session文件、读取、写入
 * cookieSession
 */

server.use(cookieParser());
// keys 必须要 越多越安全 签名会循环使用数组中的项进行签名加密 所以每次都不一样
// 需要放在cookieParser之后，因为session需要拿到cookie里面的sessionID
server.use(cookieSession({
    name:'nordon',
    keys: ['aaa','bb','cccc'],
    maxAge:1000 * 60 * 60
}));

server.use('/',(req,res) => {
    if(req.session['count']){
        req.session['count']++;
    }else{
        req.session['count'] = 1;
    }
    /**
     * 浏览器cookie中的signed是不变的
     * 浏览器cookie中的signed.sig是变的 --签名一直变
     */
    console.log(req.session['count']);
    // delete req.session; 删除session
    res.end('cookieSession')
});