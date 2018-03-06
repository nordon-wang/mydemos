<template>
    <div class="pic-select" v-show='showPicCon'>
        <div class="pic-top">
            <div class="pic-top-l">编辑图片 ( 只能添加jpg,jpeg,gif,png, 免费版大小不超过1MB )</div>
            <div class="pic-top-r" @click='btnCancel'>X</div>
        </div>

        <div class="pic-content">
            <div class="pic-content-l">
                <p>我的文件</p>
            </div>

            <div class="pic-content-r">
                <div class="pic-content-r-t">
                    <p>直接上传</p>
                    <p>新建文件夹</p>
                </div>

                <div class="pic-list">
                    <div class="pic-list-items" v-for="(item, index) in imgArr"
                     :class="{checksimg:imgIdx===index}"
                     @click='selectImg(item,index)' :key='index'>
                        <img :src="item" alt="" class="">
                    </div>
                </div>
            </div>
        </div>

        <div class="pic-btn">
            <button class="pic-btn-ok" @click='btnOk'>确定</button>
            <button class="pic-btn-cancel" @click='btnCancel'>取消</button>
        </div>

    </div>
</template>

<script>
    export default{
        name:'pic_select',
        data(){
            return {
                imgArr:["/static/image/1.jpg","/static/image/2.jpg","/static/image/3.jpg","/static/image/4.jpg"],
                imgIdx:0,
                imgUrls:''
            }
        },
        computed:{
            showPicCon(){
                return this.$store.state.showPicCon;
            }
        },
        methods:{
            selectImg(val,index){
                this.$data.imgUrls = val;
                this.$data.imgIdx = index;
                this.$store.state.imgUrls(this.$data.imgUrls,true);
            },
            btnOk(){
                this.$store.state.showPicCon = false;
                this.$store.state.imgUrls(this.$data.imgUrls,true);
            },
            btnCancel(){
                this.$store.state.showPicCon = false;
                this.$store.state.imgUrls(this.$data.imgUrls,false);
            }
        },
        mounted(){
            $('.pic-select').draggable({ handle: "div.pic-top", containment: "document" });
        }
    }
</script>

<style>
    div{
        box-sizing: border-box;
    }
    .pic-select{
        position: fixed;
        z-index: 3002;
        width: 700px;
        height: 600px;
        border: 1px solid #e3e2e8;
        left: 30%;
        top: 10%;
        background-color: #fff;
        /* display: none; */
    }

    .pic-top{
        box-sizing: border-box;
        padding: 12px 30px;
        width: 100%;
        height: 60px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        cursor: move;
        border-bottom: 1px solid #e3e2e8;
    }
    .pic-top-r{cursor: pointer;}


    .pic-content {
        height: 480px;
        box-sizing: border-box;
        border-bottom: 1px solid #e3e2e8;
    }

    .pic-content .pic-content-l{
        width: 130px;
        height: 100%;
        float: left;
        font-size: 14px;
        color: #557ce1;
        border-right: 1px solid #e3e2e8;
    }

    .pic-content .pic-content-l p{
        height: 60px;
        line-height: 60px;
        padding-left: 12px;
        border-left: 2px solid #557ce1;
        cursor: pointer;
        border-bottom: 1px solid #e3e2e8;
        width: 131px;
        background-color: #fff;
    }

    .pic-content .pic-content-r{
        width: 100%;
        padding-left: 140px;
        height: 100%;
    }

    .pic-content-r-t{
        height: 70px;
        display: flex;
        align-items: center;
    }

    .pic-content-r-t p{
        display: inline-block;
        padding: 6px 12px;
        border: 1px solid #e3e2e8;
        margin: 0 12px;
        cursor: pointer;
        padding-left: 30px;
        background-image: url('/static/image/pic-up.png');
        background-repeat: no-repeat;
        background-size: 20px 20px;
        background-position: 6px;
    }

    .pic-content-r-t p:last-child{
        background-image: url('/static/image/pic-wen.png');
        background-repeat: no-repeat;
        background-size: 20px 20px;
        background-position: 6px;
    }

    .pic-content-r-t p:hover{
        background-color: #557ce1;
        color: #fff;
        background-image: url('/static/image/pic-up-hover.png');
    }


    .pic-content-r-t p:last-child:hover{
        background-image: url('/static/image/pic-wen-hover.png');
    }

    .pic-list .pic-list-items{
        display: inline-block;
        height: 70px;
        padding: 12px 0;
        margin-right: 6px;
        border: 1px solid #e3e2e8;
        margin-bottom: 12px;
        cursor: pointer;

    }
    .pic-list .pic-list-items:hover{
        border-color: #557ce1;
    }

    .pic-list div.checksimg{
        border-color: #557ce1;
    }

    .pic-list img{
        width: 80px;
        height: 40px;
    }

    .pic-btn{
        height: 60px;
        line-height: 60px;
        text-align: center;
    }

    .pic-btn button{
        padding: 8px 37px;
        border-radius: 2px;
        cursor: pointer;
    }
    .pic-btn button.pic-btn-ok{
        border-color: #5874d8;
        background-color: #5874d8;
        color: #FFF;
    }
    .pic-btn button.pic-btn-cancel{
        border: 1px solid #e3e2e8;
    }

    .pic-btn button.pic-btn-cancel:hover{
        border-color: #5874d8;
        background-color: #5874d8;
        color: #FFF;
    }
</style>
