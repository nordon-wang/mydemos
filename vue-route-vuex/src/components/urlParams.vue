<template>
    <div class=""> <i class='icon iconfont icon-guanbi'></i>
        <i class='icon iconfont icon-set'></i>
        <h1>通过url传递参数</h1>
        <p>userId--{{$route.params.userId}}</p>
        <p>userName--{{$route.params.userName}}</p>
    </div>
</template>

<script>
    export default{
        name:'url-params',
        data(){
            return{

            };
        },
        methods:{
        },
        mounted(){
        },
        beforeRouteEnter: (to, from, next) => {
            console.log(to);
            next();
        },
        beforeRouteLeave: (to, from, next) => {
            next();
        }
    }
</script>

<style>
</style>