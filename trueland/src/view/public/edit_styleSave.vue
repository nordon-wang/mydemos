<template id="DefaultStyleSave">
  <div class="DefaultStyleComponent">

    <div class="addStyle">
      <el-dialog
        title="样式保存"
        :modal-append-to-body="false"
        :before-close="handleClose"
        :visible="true">
        <div>
          <div class="addStyle_imgFrame" @click="selePic">
            <p v-if="styleSaveObj.img == ''">点击选择图片</p>
            <img :src="styleSaveObj.img" v-else>
          </div>

          <el-input v-model="styleSaveObj.name" placeholder="请输入样式名称"></el-input>
          <p style="height: 10px;"></p>
          <el-radio-group v-model="styleSaveObj.public">
            <el-radio label="false">样式不共享</el-radio>
            <el-radio label="true">样式共享</el-radio>
          </el-radio-group>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="$store.state.styleSave_IsOpen = false">取 消</el-button>
          <el-button type="primary" @click="addStyleSure">确 定</el-button>
        </div>
      </el-dialog>
    </div>


  </div>
</template>

<script>

  export default {
    name: 'DefaultStyleSave',
    props:{},
    data () {
      return {
        styleSaveObj:{
          name:'',
          widget_name:this.$store.state.module_Data.name ,
          style:'',
          img:'',
          public:'false'
        },

      }
    },
    watch:{


    },

    methods:{
      handleClose(){
        this.$store.state.styleSave_IsOpen = false;
      },
      //确认选择
      addStyleSure(){
        if(this.styleSaveObj.name == ''){
          this.$message.error('请填写样式名称！');
          return false;
        }
        else if(this.styleSaveObj.img == ''){
          this.$message.error('请选择样式图片！');
          return false;
        }
        const that = this;
        const widget_name = this.$store.state.module_Data.name;
        const type = this.$store.state.module_Data.rowType;
        const IndexObj = this.templet.p_find_moduleIndex({
          pid:this.$store.state.module_Data.pid,
          type,
          id:this.$store.state.module_Data.widgets_id
        });
        const rowIndex = IndexObj.row;
        const moduleIndex = IndexObj.module;
        const style = JSON.stringify(this.$store.state[type][rowIndex].children[moduleIndex].data.infor);
        let styleObj = {
          id:'',
          name:this.styleSaveObj.name,
          widget_name,
          style,
          img:this.styleSaveObj.img,
          del:'true',
          public:this.styleSaveObj.public
        };

        this.templet.p_ajax({
          type:'post',
          url:'/index.php?app=site&m=desktop_theme_widgetstyle&a=add',
          data:styleObj
        }).then(function (data) {
          if(data){
            if(data != 'null'){
              that.$message.success('样式保存成功!');
              that.$store.state.styleSave_IsOpen = false;
            }
            else{
              that.$message.error('网络异常，请稍后尝试！');
            }
          }
          else{
            that.$message.error('网络异常，请稍后尝试！');
          }
        }).catch(function (e) {
          that.$message.error('网络异常，请稍后尝试！');
        })




      },
      //图片选择
      selePic(){
        const that = this;
        this.$store.state.showPicCon = true;
        this.$store.state.imgUrls = function (src) {
          that.styleSaveObj.img = src;
        }
      },


    },
    components:{

    },

    mounted(){




    }
  }
</script>
