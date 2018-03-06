<template>
  <div>
    <p class="myInput">
        <strong v-text="title" ></strong>
        <el-input  :placeholder="placeholder" 
        v-model="Result"
        :style="my_style" ></el-input>
    </p>
  </div>
</template>

<script>
export default {
    name:'public_input',
    props:{
      value:{
        type:String,
        default:0,
      },
      title:{
        type:String,
        default:'',
      },
      placeholder:{
        type:String,
        default:'请输入内容'
      },
      my_style:{
        type:Object,
        default:function () {
          return {
            width: '155px',
            marginTop: '0px',
            textAlign:'center'
          }
        }
      }
    },
    data(){
        return {
            Result:this.value
        }
    },
    watch:{
      Result(val,oldVal){
        this.$emit('input',val);//双向数据绑定
      }
    }
}
</script>

<style>

</style>
