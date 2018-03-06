<template id="icon">
  <div class="row_back_frame">
    <div class="row_back" style="text-align: center;line-height: 38px;">
      <b :class="Result" style="font-family:FontAwesome;"></b>
    </div>
    <div class="seleImg">
      <el-button type="primary" size="mini" @click="select_img">{{title}}</el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini" @click="Result = ''"></el-button>
    </div>

  </div>
</template>

<script>

  /*
   <my-img v-model="infor.w_bg_src"></my-img>
   * */
  export default {
    name: 'public_icon',
    props:{
      value:{
        type:String,
        default:'',
      },
      title:{
        type:String,
        default:'图标选择'
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
      select_img(){
        const that = this;
        this.$store.state.icon_IsOpen = true;//打开蒙层
        this.$store.state.icon_select_now = this.Result;//给弹框赋值
        this.$store.state.icon_Callback = function (icon) {
          that.Result = icon;
        }
      },
      handleClose(){
        this.dialogVisible = false;
      }

    },
    components:{

    },

    mounted(){


    }
  }
</script>
