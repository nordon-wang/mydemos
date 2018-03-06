var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userList = []; //所有用户对象集合
var PrivateChatList = {}; //用于私聊的对象
var fs = require('fs');
var path = require("path");

var ueditor = require("ueditor");
//用来解析上传图片
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());




//user 集合存储所有用户信息
//list 存储所有文章信息
app.use(express.static(__dirname + '/blog'));

//指向静态资源目录，注意访问的路径
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'blog'), function(req, res, next) {
	// ueditor 客户发起上传图片请求
	if(req.query.action === 'uploadimage'){
		var foo = req.ueditor;
		var date = new Date();
		var imgname = req.ueditor.filename;

		var img_url = '/images/ueditor/';
		res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
	}
	//  客户端发起图片列表请求
	else if (req.query.action === 'listimage'){
		var dir_url = '/images/ueditor/';
		res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
	}
	// 客户端发起其它请求
	else {

		res.setHeader('Content-Type', 'application/json');
		res.redirect('/ueditor/ueditor.config.json')
	}}));

io.on("connection", function(socket) {
	//监听群体聊天
	socket.on("chat", function(msg, callback) {
		console.log(1);
		var time = new Date().getTime();
		msg.time = time;
		
		//把接收到的msg原样广播
		io.emit("radio", msg);
		//接收前台发送来的回调，并执行
		callback(msg); //表示发送成功

	});


	//监听用户登陆
	socket.on('login', function(data) {
        //加入一个socketId，用来表示用户
		data.socketId = socket.id;
		userList.push(data);
		PrivateChatList[data.username] = socket;

		//将用户信息返回
		io.emit("user", userList);
	});

	//监听用户离开
	socket.on('disconnect', function() {
		var id = socket.id;
		for (var i = 0; i < userList.length; i++) {
			if (userList[i].socketId == id) {
				userList.splice(i, 1);
			}
		}
		//将用户信息返回
		io.emit("logOut", userList);
	});
});
//http.listen(3000, 'www.blog.com');
http.listen(8080, 'www.blog.com');