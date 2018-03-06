<template id="img">
  <div class="row_back_frame">
    <div class="row_back" @click="dialogVisible = true">
      <i class="el-icon-view" v-if="Result" ></i>
      <img :src="Result" v-if="Result">
    </div>
    <div class="seleImg">
      <el-button type="primary" size="mini" @click="select_img">背景图片</el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini" @click="Result = ''"></el-button>
    </div>

    <div v-if="dialogVisible">
      <el-dialog
        title="图片预览"
        :modal-append-to-body="false"
        :visible="dialogVisible"
        :before-close="handleClose"
        width="60%">
        <div class="lookImg">
          <img :src="Result" v-if="Result">
        </div>

      </el-dialog>
    </div>
  </div>
</template>

<script>

  /*
   <my-img v-model="infor.w_bg_src"></my-img>
   * */
  export default {
    name: 'public_img',
    props:{
      value:{
        type:String,
        default:'',
      },


    },
    data () {
      return {
        dialogVisible:false,
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
        this.$store.state.showPicCon = true;
        this.$store.state.imgUrls = function (src) {
          that.Result = src;
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
