<template>
  <div @mouseover="toolHover" @mouseout="toolOut" class="my-tooltip">
      <slot>
          默认的
      </slot>
      <div class="tool-content" v-show="isShow">{{$props.content}}</div>
  </div>
</template>

<script>
export default {
    name:'public_tooltip',
    props:{
        content:{
            type:String,
            default:''
        }
    },
    data(){
        return {
            isShow:false
        };
    },
    methods:{
        toolHover(){
            this.isShow = true;
        },
        toolOut(){
            this.isShow = false;
        }
    }
}
</script>

<style>
.my-tooltip{
    position: relative;
}

div.tool-content{
    position: absolute;
    top: -48px;
    left: -20px;
    width: auto;
    border-radius: 4px;
    padding: 10px;
    z-index: 2000;
    font-size: 12px;
    line-height: 1.2;
    background: #fff;
    border: 1px solid #303133;
    white-space: nowrap;
}
div.tool-content::after{
    content: '';
    display: inline-block;
    height: 6px;
    width: 6px;
    border: 1px solid #000;
    border-top-color: transparent;
    border-left-color: transparent;
    background-color: #fff;
    transform: rotate(45deg);
    position: absolute;
    bottom: -4px;
    right: 30px;
}
</style>
