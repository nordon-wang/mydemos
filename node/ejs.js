const ejs = require('ejs')
const fs = require('fs')

ejs.renderFile('./jade/1.ejs',{
    name:'nordon',
     names: ['foo', 'bar', 'baz'],
    josns:{arr:[{
        name:'w1',
        age:1
    },{
        name:'w2',
        age:2
    },{
        name:'w3',
        age:3
    }]}
},(err,data) => {
    fs.writeFile('./jade/ejs.html',data,(err) =>{
        if(err)
            console.log(err);
        else
            console.log('success');
    })
})