<template>
	  <h1  :style="{
		backgroundImage:`url(${datas.imgs2})`,
		backgroundSize:`100% 100%`,
		width:'200px',
		height:'60px',
		lineHeight:'60px',
	  }" >在script中通过require引入使用</h1>
	  <h1 class="myhh">在style样式中使用</h1>
	  <!--
		正确 
		<img src="../../assets/logo.png" alt="">
	  <img src="@/assets/logo.png" alt=""> -->
</template>

<script>
export default {
	name: "basic_nleavemessage",
  data() {
    return {
      datas:{
        imgs:require('../../assets/logo.png'),
        imgs2:require('@/assets/logo.png'),
      }
    };
  }
}
</script>

<style>
.myhh{
  background-image:url(~@/assets/logo.png);
  background-size:100% 100%;
  width:200px;
  height:60px;
  line-height:60px;
}
</style>
