(function () {

    var socket = io();
    var domain = 'http://www.blog.com/';
    var ue = UE.getEditor('container',{
        toolbars: [
            ['bold','italic','underline','emotion','fontborder','forecolor','justifyleft','justifycenter','justifyright','justifyjustify','paragraph','fontfamily']
        ],
    });

    ue.addListener("keydown", function (type, event) {

        //在源码里面 搜索autosubmit 屏蔽掉了原来的提交事件
        if (event.ctrlKey && event.keyCode == 13) {
            //回车发送消息
            vm.emit();
        }
    });


    var vm = new Vue({
        el:'#app',
        data:{
            username:'',//iframe的name属性，往下传递用户名
            img:'',//用户头像
            chat_id:0,
            img:'',
            num:0,//在线人数
            userList:[],
            listHeight:500,
            contentHeight:500,
            content:'',//群聊的内容
            contentList:[],

        },
        methods:{
            emit:function () {
                var that = this;
                this.chat_id ++;//唯一自增id
                var num = parseInt(Math.random()*10000).toString();
                var id = new Date().getTime() + num + this.chat_id;
                var that = this;
                var time = new Date().toLocaleString();
                //发送给服务器的对象
                var obj = {
                    time:time,
                    id:parseInt(id),
                    username:this.username,
                    src:this.img,
                    content:ue.getContent(),
                    loading:true
                };
                this.contentList.push(obj);
                ue.setContent('');
                this.$nextTick(function () {
                    that.srcollBtoom();
                });


                socket.emit('chat',obj,function (msg) {
                    for(var i = 0;i<that.contentList.length;i++){
                        if(that.contentList[i].id == msg.id){
                            that.contentList[i].loading = false;
                        }
                    }
                });

            },
            srcollBtoom:function(){
                //内容滚动到底
                var contentHeight = $('.showChild').height();
                if( contentHeight > this.contentHeight){
                    $('.show').scrollTop(contentHeight-this.contentHeight)
                }
            },

            //获取角色名
            get_username:function () {
                var user_str = window.name;
                //未登录
                if(user_str == '|'){
                    this.username = '用户' + new Date().getTime();
                    this.img = 'image/user.jpg';
                }
                else{
                    this.username = user_str.split('|')[0];
                    this.img = user_str.split('|')[1] ? domain + user_str.split('|')[1] : 'image/user.jpg';
                }

            },



        },
        watch:{

        },
        filters:{
            mytime:function (val) {
                console.log(val)
                var str = new Date(parseInt(val)).toLocaleString();
                return str
            }
        },
        created:function(){

        },
        mounted:function(){
            var that = this;
            console.log(window);
            this.get_username();

            //建立群体聊天监听
            socket.on('radio',function (msg) {
                //自己发的不在监听里面插入
                if(msg.username === that.username){
                    return;
                }
                var time = new Date(msg.time).toLocaleString();
                msg.time = time;//重置时间
                msg.loading = false;
                that.contentList.push(msg);
            });

            //建立登陆监听
            socket.on('user',function (msg) {
                that.userList = msg;
            });

            //用户登录
            var user = {
                username:this.username,
                src:this.img,
            };
            socket.emit('login',user);

            //建立用户离开监听
            socket.on('logOut',function (msg) {
                that.userList = msg;
            });
        }

    })

})();