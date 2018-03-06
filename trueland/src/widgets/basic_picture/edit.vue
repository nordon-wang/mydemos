<template>
  <div class="videoEdit">
    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">
        <span @click="templet.p_select_parts('select_img')"
          @mouseover="templet.p_index_hover_parts('select_img')"
          @mouseout="templet.p_index_out_parts()">图片管理</span>
        <span
          @click="templet.p_select_parts('pic_links')"
          @mouseover="templet.p_index_hover_parts('pic_links')"
          @mouseout="templet.p_index_out_parts()"
        >图片链接</span>
    </div>

    <!--图片管理-->
    <div class="Routine_setting" v-show="$store.state.parts == 'select_img'">
      <div class="setOne">
        <my-number v-model="infor.picture_width" title="图片宽"></my-number>
        <my-number v-model="infor.picture_height" title="图片高"></my-number>
        <my-number v-model="infor.picture_border_radius" title="圆角半径"></my-number>
        <el-button type="primary" @click='selectPic("imgUrl",infor.imgUrl)'>选择图片</el-button>
      </div>
    </div>

    <!--链接 linksStyle-->
    <div class="page_setting" v-show="$store.state.parts == 'pic_links'">
      <div class="setOne">
        <strong style="width:100px;height:40px;line-height: 40px;display:inline-block;text-align:center;">跳转方式</strong>
        <el-radio-group v-model="infor.linksStyle" @change="changeLinksStyle">
          <el-radio :label="'none'">不跳转</el-radio>
          <el-radio :label="'self'">自定义</el-radio>
        </el-radio-group>
      </div>

      <div class="setOne" v-if="infor.linksStyle == 'self'">
        <my-input v-model="infor.linksUrl" title="链接地址" placeholder="请输入链接地址"></my-input>
        <strong style="width:100px;height:40px;line-height: 40px;display:inline-block;text-align:center;">打开方式</strong>
        <el-radio-group v-model="infor.openStyle">
          <el-radio :label="'_self'">当前页面</el-radio>
          <el-radio :label="'_blank'">新页面</el-radio>
        </el-radio-group>
      </div>
    </div>

  </div>
</template>

<script>
  import style from './style';
  export default {
    name: 'basic_picture_edit',
    props:{},
    data () {
      return {
        infor:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.infor)),
        listArr:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.listArr)),
        animateObj:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.animateObj)),
      }
    },
    watch:{
      infor:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'infor',
            val:JSON.parse(JSON.stringify(val))
          });
        },
        deep: true
      },
      animateObj:{
        handler: function (val, oldVal) {

          this.templet.p_editModule({
            key:'animateObj',
            val:JSON.parse(JSON.stringify(val))
          });
        },
        deep: true
      }

    },
    created(){

    },
    methods:{
      changeLinksStyle(val){
      },
      selectPic(item,urls){
        var that = this;
        let myurls = urls;
        this.$store.state.showPicCon = true;
        this.$store.state.imgUrls = function (val,bol) {
          // 图片选择 最终是否点击确定按钮
          if(bol){
            that.infor[item] = val;
          }else{
            that.infor[item] = myurls;
          }
          
        }
      },
      selectTe(val){
        this.infor.effectNum = val;
      }
    },
    components:{
    },

    mounted(){
    }
  }
</script>
<style >
</style>

