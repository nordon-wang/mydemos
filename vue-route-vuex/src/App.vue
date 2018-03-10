<template>
  <div id="app">
    <router-link to="/">link to index</router-link>
    <router-link to="/urlparams/12/nordon">url传递参数</router-link>
    <router-link to="/h">link to h</router-link>
    <!-- <router-link to="/h/hi1">link to h1</router-link>  -->
    <router-link :to="{name:'hi1',params:{username:'nordon',id:12}}">link to h1</router-link>
    <router-link to="/h/hi2">link to h2</router-link>
    <router-link to="/redirect">重定向回首页-无参数</router-link>
    <router-link to="/goParams/1222/nordon22">重定向回首页-有参数</router-link>
    <router-link to="/aliasindex">alias别名-返回首页</router-link>
    <p>{{$route.name}}</p>

    <!-- 单页面多路由区域操作 需要给router-view命名 和slot类似 -->
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
      <router-view name="left" />
      <router-view name="right" />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    // console.log('app mounted',this.$router);
    // console.log('app mounted',this.$route);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.fade-enter{
  opacity:0;
}
.fade-enter-active{
  transition:all 1s;
}

.fade-leave{
  opacity:1;
}

.fade-leave-active{
  opacity:0;
  transition:all 1s;
}


</style>
