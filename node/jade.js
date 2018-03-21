const jade = require('jade');
const fs = require('fs');

let str = jade.renderFile('./jade/1.jade',{
    pretty:true,
    styles:{width:'200px',height:'100px',background:'#f00'},
    classArr:['aaa','bbb'],
    htmls:"<h1>页面输出标签</h1>"
});

fs.writeFile('./jade/jade.html',str,(err) => {
    if(err)
        console.log('err');
    else
        console.log('success');
})

