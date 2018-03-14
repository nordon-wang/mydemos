/**
 * 歌词显示
 *  由于node不支持bgk的转码
 *  使用iconv lite 扩展包进行转码 -- 转buffer
 */
const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

// 一行一行读
const readline = require('readline');

// [00:23.27]短暂的狂欢以为一生绵延
let reg = /\[(\d{2})\:(\d{2})\.(\d{2})\](.+)/;

function readLrc(item, beginTime) {
    let matches = reg.exec(item);
    // console.log(matches)
    // 歌词主体判断
    if (matches) {
        // 获取 分 秒 毫秒
        let m = parseInt(matches[1]);
        let s = parseInt(matches[2]);
        let ms = parseInt(matches[3]);
        let lyric = matches[4];

        // 当前行歌词 需要在特定时间显示
        // 由于下达输出的任务的时刻不同 可能会导致误差
        // 在定时器中 将误差的时间去除 就是正常时间
        let currentTime = Date.now() - beginTime;
        setTimeout(() => {
            console.log(lyric)
        }, m * 60 * 1000 + s * 1000 + ms - currentTime);
    } else {
        console.log(item)
    }
}

// fs.readFile(path.join(__dirname, 'lrc/传奇.lrc'), (err, data) => {
//     // console.log(iconv.decode(data,'gbk'));
//     let lrcs = iconv.decode(data, 'gbk');
//     // 换行 可能是 \r\n 或者 \n
//     let myLrcs = lrcs.split('\n');

//     let beginTime = Date.now();

//     myLrcs.forEach((item, index) => {
//         readLrc(item, beginTime);
//     });

// });

// 通过readline读取歌词
let filename = path.join(__dirname,'lrc/传奇.lrc');
// -- 利用iconv-lite进行转码
let streamRead = fs.createReadStream(filename)
    .pipe(iconv.decodeStream('gbk'));

// 利用readline读取 
let rl = readline.createInterface({
    input:streamRead
});


let beginTime2 = Date.now();
rl.on('line', item => {
    readLrc(item,beginTime2)
});


// 流的读取方式
let mydatas = '';
streamRead.on('data',chunk => {
    // chunk只是文档的一个不完整的片段
    // mydatas += chunk.toString();
    mydatas += iconv.decode(chunk,'gbk');
});

streamRead.on('end',() =>{
    // 文档读取结束 此时的mydatas是完整的
    // console.log(mydatas);
});


