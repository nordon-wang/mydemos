<template id="color">
  <p class="myCloor">
    <strong v-text="title"></strong>
    <el-color-picker
      v-model="Result"
      show-alpha
      @active-change="changeColor"
    ></el-color-picker>
  </p>
</template>

<script>

  /*
   <my-color v-model="test3" title="切换时间"></my-color>
   * */
  export default {
    name: 'public_color',
    props:{
      value:{
        type:String,
        default:'',
      },
      title:{
        type:String,
        default:'',
      },
      my_style:{
        type:Object,
        default:function () {
          return {
            width: '105px',
            marginTop: '0px',
            textAlign:'center'
          }
        }
      }
    },
    data () {
      return {
        Result:this.value,
      }
    },
    watch:{
      Result(val,oldVal){
        this.$emit('input',val);//双向数据绑定
      },
      value(val){
        this.Result = val;
      }

    },
    methods:{
      changeColor(val){
        this.Result = val;
      }

    },
    components:{

    },

    mounted(){


    }
  }
</script>
