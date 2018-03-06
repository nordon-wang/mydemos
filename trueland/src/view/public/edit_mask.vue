<template>
    <!-- 遮罩 -->
    <div class="pic-mask" v-show='showPicCon'></div>
</template>

<script>
export default {
    name:'edit_mask',
    computed:{
        showPicCon(){
            return this.$store.state.showPicCon;
        }
    }
}
</script>

<style>

    .pic-mask{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: 101;
    }
</style>
