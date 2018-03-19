// const jade = require('jade');

// // let str = jade.render('html');

// let  str = jade.renderFile('./jade/1.jade',{
//     pretty:true
// });

// console.log(str);

const ejs = require('ejs');

ejs.renderFile('./jade/1.ejs',{
    name:'nordon'
},(err,data) =>{
    if(err){
        console.log(err);
    }
    console.log(data);
})