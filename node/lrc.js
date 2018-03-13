/**
 * 歌词显示
 *  由于node不支持bgk的转码
 *  使用iconv lite 扩展包进行转码
 */
const fs  = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

fs.readFile(path.join(__dirname,'lrc/传奇.lrc'),(err,data) => {
    // console.log(iconv.decode(data,'gbk'));
    let lrcs = iconv.decode(data,'gbk');

    // 换行 可能是 \r\n 或者 \n
    let myLrcs = lrcs.split('\n');
    // [00:23.27]短暂的狂欢以为一生绵延
    let reg = /\[(\d{2})\:(\d{2})\.(\d{2})\](.+)/;

    let beginTime = Date.now();

    myLrcs.forEach((item,index) => {
        let matches = reg.exec(item);
        // console.log(matches)
        // 歌词主体判断
        if(matches){
            // 获取 分 秒 毫秒
            let m = parseInt(matches[1]);
            let s = parseInt(matches[2]);
            let ms = parseInt(matches[3]);
            let lyric = matches[4];

            // 当前行歌词 需要在特定时间显示
            // 由于下达输出的任务的时刻不同 可能会导致误差
            // 在定时器中 将误差的时间去除 就是正常时间
            let currentTime = Date.now() - beginTime;
            setTimeout(()=>{
                console.log(lyric)
            }, m * 60 * 1000 + s * 1000 + ms - currentTime);
        }else{
            console.log(item)
        }

    });

    console.log(myLrcs.length);


});


